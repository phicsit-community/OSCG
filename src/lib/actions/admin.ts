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
    .gte("updated_at", yesterday.toISOString());

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(5000); 

  if (error) {
    console.error("Error fetching admin data:", error);
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
