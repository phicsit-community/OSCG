"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const process = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        router.push("/sign-in");
        return;
      }

      if (data?.session) {
        router.push("/");
      } else {
        router.push("/sign-in");
      }
    };

    process();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 px-10 py-8 rounded-2xl border border-border bg-card shadow-xl">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-muted animate-spin border-t-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-foreground animate-pulse">
            Finalizing login
          </p>
          <p className="text-sm text-muted-foreground">Securing your session</p>
        </div>
      </div>
    </div>
  );
}
