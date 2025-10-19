import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { User } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();

  // Fetch full user instead of claims
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return user ? (
    <div className="dropdown z-50 dropdown-center items-center gap-4">
  <div tabIndex={0} role="button"><User/></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><span className="text-sm text-center">Hey, {user.email}</span></li>
    <li><Link href={"/profile"} className="text-sm text-center">User Profile</Link> </li>
    <li><LogoutButton/></li>
  </ul>
</div>
    
  ) : (
    
      <div className="dropdown dropdown-center gap-2 items-center">
  <div tabIndex={0} role="button"><User/></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm">
    <li>
        <Link
        href="/auth/login"
        className=" flex items-center uppercaseflex items-center uppercase"
      >
        Login
      </Link>
      </li>
      <li>
        <Link
        href="/auth/sign-up"
        className=" flex items-center uppercaseflex items-center uppercase"
      >
        sign up
      </Link>
      </li>
  </ul>
</div>
  );
}
