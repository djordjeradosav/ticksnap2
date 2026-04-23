import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./env";

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
}

const getSessionSecret = () => {
  const secret = ENV.cookieSecret;
  return new TextEncoder().encode(secret);
};

/**
 * Create a JWT session token for email/password auth
 */
export async function createSessionToken(payload: JWTPayload, expiresInMs: number = 7 * 24 * 60 * 60 * 1000): Promise<string> {
  const issuedAt = Date.now();
  const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
  const secretKey = getSessionSecret();

  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    username: payload.username,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

/**
 * Verify and decode a JWT token
 */
export async function verifySessionToken(token: string | undefined | null): Promise<JWTPayload | null> {
  if (!token) {
    return null;
  }

  try {
    const secretKey = getSessionSecret();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    const { userId, email, username } = payload as Record<string, unknown>;

    if (typeof userId !== "string" || typeof email !== "string" || typeof username !== "string") {
      console.warn("[JWT] Token payload missing required fields");
      return null;
    }

    return { userId, email, username };
  } catch (error) {
    console.warn("[JWT] Failed to verify token:", error instanceof Error ? error.message : error);
    return null;
  }
}
