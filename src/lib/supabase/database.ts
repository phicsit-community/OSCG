import { supabase } from "./client";

export interface Profile {
  id: string;
  badges_created: number;
  full_name?: string;
  email?: string;
  is_admin: boolean;
  role?: string;
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function incrementBadgeCount(userId: string) {
  try {
    const { data: profile } = await getProfile(userId);
    if (!profile) throw new Error("Profile not found");

    const { data, error } = await supabase
      .from("profiles")
      .update({ badges_created: (profile.badges_created || 0) + 1 })
      .eq("id", userId)
      .select()
      .single();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}
