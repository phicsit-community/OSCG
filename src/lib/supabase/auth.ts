
import { supabase } from "./client";
import type { AuthError, User } from "@supabase/supabase-js";

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export async function signUpWithEmail({
  name,
  email,
  password,
}: SignUpInput): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (err) {
    const error = err instanceof Error ? new Error(err.message) : err;
    return { user: null, error: error as AuthError };
  }
}

export async function signInWithEmail({
  email,
  password,
}: SignInInput): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (err) {
    const error = err instanceof Error ? new Error(err.message) : err;
    return { user: null, error: error as AuthError };
  }
}

export interface OAuthResponse {
  data: {
    url: string | null;
  } | null;
  error: AuthError | null;
}


const getRedirectUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback`;
  }
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`;
};

export async function signInWithGoogle(): Promise<OAuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getRedirectUrl(),
      },
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? new Error(err.message) : err;
    return { data: null, error: error as AuthError };
  }
}


export async function signInWithGitHub(): Promise<OAuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getRedirectUrl(),
      },
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? new Error(err.message) : err;
    return { data: null, error: error as AuthError };
  }
}