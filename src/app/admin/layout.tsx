import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

    if (!profile?.is_admin) {
        redirect("/");
    }

    return (
        <div className="min-h-screen  selection:bg-[#11D392]/30">
            <AdminSidebar />
            <div className="lg:pl-[240px]">
                <main className="min-h-screen flex flex-col">
                    {children}
                </main>
            </div>
        </div>
    );
}
