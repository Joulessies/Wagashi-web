import { hasEnvVars } from "@/lib/utils";
import Image from 'next/image';
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";



export default function Navbar(){
return(
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Image src="/image/logo.png" width={60}height={60} alt="Wagashi Logo"/>
                </div>
                <div className="flex items-center gap-2">
                  HOME
                  </div>
                  <div className="flex items-center gap-2">
                  PRODUCTS
                  </div>
                  <div className="flex items-center gap-2">
                  ABOUT US
                  </div>
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              </div>
            </nav>
)
}