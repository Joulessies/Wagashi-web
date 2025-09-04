import { hasEnvVars } from "@/lib/utils";
import Image from 'next/image';
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import Cart from "./cart";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center items-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl grid grid-cols-3 items-center px-5 text-sm">

        {/* Left - Logo */}
        <div className="flex items-center font-semibold">
          <Link href={"/"}>
            <Image src="/image/logo.png" width={60} height={60} alt="Wagashi Logo"/>
          </Link>
        </div>

        {/* Center - Menu */}
        <div className="flex justify-center items-center gap-6">
          <Link href={"/"}>HOME</Link>
          <Link href="/products">PRODUCTS</Link>
          <Link href="/about">ABOUT US</Link>
        </div>

        {/* Right - Actions */}
        <div className="flex justify-end items-center gap-4">
          <Search />
          <div className="indicator">
            <Cart />
            <span className="badge badge-sm indicator-item"></span>
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>

      </div>
    </nav>
  )
}
