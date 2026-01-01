import { supabase } from "./client";

export interface Profile {
  id: string;
  badges_created: number;
  full_name?: string;
  email?: string;
  is_admin: boolean;
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code === "PGRST116") {
      // Profile doesn't exist, create one
      const { data: userData } = await supabase.auth.getUser();
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            badges_created: 0,
            full_name: userData.user?.user_metadata?.full_name || "",
            email: userData.user?.email || "",
            is_admin: false,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;
      return { data: newProfile, error: null };
    }

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
