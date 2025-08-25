import { hasEnvVars } from "@/lib/utils";
import Image from 'next/image';
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import Cart from "./cart";
import Link from "next/link";



export default function Navbar(){
return(
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full gap-4 max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-4 items-center font-semibold">
                  <Link href={"/"}><Image src="/image/logo.png" width={60}height={60} alt="Wagashi Logo"/></Link>
                </div>
                <div className="flex justify-between items-center gap-4">
                 <Link href={"/"} className="px-2">HOME</Link> 


                 <Link href="/products" className="px-2"> PRODUCTS</Link>


                   <Link href="/products" className="px-2"> ABOUT US</Link>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="indicator">
                  <Cart/>
                   <span className="badge badge-sm indicator-item"></span>
                  </div>
                 
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                </div>
              </div>
            </nav>

            
)
}