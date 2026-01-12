"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAdminData() {
  const supabase = await createClient();

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() - 24);
  const { count: newSignups } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", yesterday.toISOString());

  // Fetch users in batches because of Supabase's max_rows limit (usually 1000)
  interface Profile {
    id: string;
    badges_created: number;
    full_name: string;
    email: string;
    is_admin: boolean;
    role: string;
    created_at: string;
    updated_at: string;
  }
  
  let users: Profile[] = [];
  let from = 0;
  let to = 999;
  const batchSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: batch, error: batchError } = await supabase
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, to);

    if (batchError) {
      console.error("Error fetching batch:", batchError);
      hasMore = false;
      break;
    }

    if (batch && batch.length > 0) {
      users = [...users, ...(batch as Profile[])];
      if (batch.length < batchSize) {
        hasMore = false;
      } else {
        from += batchSize;
        to += batchSize;
      }
    } else {
      hasMore = false;
    }

    // Safety break if we exceed a reasonable limit for this specific admin view
    if (users.length >= 100000) break;
  }

  if (users.length === 0 && totalUsers! > 0) {
    return null;
  }

  return {
    stats: {
      totalUsers: totalUsers || 0,
      newSignups: newSignups || 0,
    },
    users: users || [],
  };
}

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

  return { success: true };
}

export async function updateUserScore(userId: string, score: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ score, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user score:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
