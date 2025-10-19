
import { hasEnvVars } from "@/lib/utils";
import Image from 'next/image';
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Search } from "lucide-react";
import Cart from "./cart-modal";





export default function Navbar() {

     
  return (
     <nav className="top-0 w-full backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-3">
            <Image src="/image/logo.png" width={60} height={60} alt="Wagashi Logo"/>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
               <Link href={"/"}>Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About Us</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
             <Search />
              <Cart/>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </div>
      </div>
    </nav>
    
    
  )
}
