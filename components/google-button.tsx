"use client";

import { createClient } from "@/lib/supabase/client";
/*import { useRouter } from "next/navigation";*/
import Image from "next/image";

export default function SignInWithGoogle() {
  const supabase = createClient();
  /*const router = useRouter();*/

  const handleGoogleSignIn = async () => {
    const { /*data*/, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // where user returns after login
      },
    });

    if (error) {
      console.error("Google Sign-in Error:", error.message);
    } else {
      console.log("Redirecting to Google...");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center bg-white border rounded-md p-2 w-full"
    >
      <Image src="/image/google.png" width={25} height={25} alt="Google logo" />
      <span className="ml-3 text-sm">Sign in with Google</span>
    </button>
  );
}
