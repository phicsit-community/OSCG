"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAdminData(
  page: number = 1,
  pageSize: number = 30,
  searchTerm: string = "",
  role: string = "all"
) {
  const supabase = await createClient();

  let query = supabase.from("profiles").select("*", { count: "exact" });

  if (searchTerm) {
    query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
  }

  if (role !== "all") {
    query = query.eq("role", role);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: users, count: totalUsers, error: usersError } = await query
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (usersError) {
    console.error("Error fetching users:", usersError);
    return null;
  }

  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() - 24);
  const { count: newSignups } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", yesterday.toISOString());

  interface Profile {
    id: string;
    badges_created: number;
    full_name: string;
    email: string;
    is_admin: boolean;
    role: string;
    created_at: string;
    updated_at: string;
    score?: number;
  }


  return {
    stats: {
      totalUsers: totalUsers || 0,
      newSignups: newSignups || 0,
    },
    users: (users as Profile[]) || [],
  };
}

import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updateUserScore(userId: string, score: number) {
  const { data, error, status } = await supabaseAdmin
    .from("profiles")
    .update({ score, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Error updating user score:", error);
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    console.warn("No profile found with ID or no rows updated:", userId);
    return { success: false, error: "Profile not found or no update applied" };
  }

  console.log(`Successfully updated score for ${userId} to ${score}. Status: ${status}`);
  return { success: true };
}
