import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

describe('Supabase Configuration', () => {
  it('should connect to Supabase with valid credentials', async () => {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Test connection by fetching profiles table (should be empty or have data)
    const { data, error } = await supabase.from('profiles').select('count').limit(1);

    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  it('should have valid Supabase URL format', () => {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    expect(supabaseUrl).toMatch(/^https:\/\/.*\.supabase\.co$/);
  });

  it('should have valid JWT token format', () => {
    const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    // JWT tokens have 3 parts separated by dots
    expect(supabaseAnonKey).toMatch(/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
  });
});
