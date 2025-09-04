"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error.message);
        router.push("/login");
        return;
      }

      if (data?.session) {
        console.log("✅ Logged in!", data.session);
        router.push("/");
      } else {
        // If no session yet, let Supabase handle PKCE exchange
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);

        if (error) {
          console.error("Auth error:", error.message);
          router.push("/login");
          return;
        }

        router.push("/");
      }
    };

    handleAuth();
  }, [router, supabase]);

  return <p>Finishing login, please wait...</p>;
}
