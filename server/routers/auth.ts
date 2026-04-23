import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createSessionToken } from "../_core/jwt";
import { getUserByEmail, getUserByUsername, getUserById, createUser } from "../db";
import * as bcrypt from "bcryptjs";

// Re-export from jwt module
export { createSessionToken } from "../_core/jwt";

// Validation schemas
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers, and underscores"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const authRouter = router({
  /**
   * Sign up - create new user account
   */
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input }) => {
      // Check if email already exists
      const existingEmail = await getUserByEmail(input.email);
      if (existingEmail) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already in use",
        });
      }

      // Check if username already exists
      const existingUsername = await getUserByUsername(input.username);
      if (existingUsername) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(input.password, saltRounds);

      // Create user
      try {
        await createUser({
          email: input.email,
          username: input.username,
          passwordHash,
          fullName: input.fullName,
          followersCount: 0,
          followingCount: 0,
          tradesCount: 0,
        });

        // Get the created user
        const user = await getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create user",
          });
        }

        // Generate session token
        const token = await createSessionToken({
          userId: user.id,
          email: user.email,
          username: user.username,
        });

        return {
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            avatarUrl: user.avatarUrl,
          },
        };
      } catch (error) {
        console.error("Signup error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create account",
        });
      }
    }),

  /**
   * Login - authenticate user with email and password
   */
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      // Find user by email
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Compare password
      const passwordMatch = await bcrypt.compare(input.password, user.passwordHash);
      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Generate session token
      const token = await createSessionToken({
        userId: user.id,
        email: user.email,
        username: user.username,
      });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
        },
      };
    }),

  /**
   * Get current user (protected)
   */
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    const user = await getUserById(ctx.user.id);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followersCount: user.followersCount,
      followingCount: user.followingCount,
      tradesCount: user.tradesCount,
    };
  }),

  /**
   * Logout (client-side only - just clears the token)
   */
  logout: publicProcedure.mutation(() => {
    return { success: true };
  }),
});
