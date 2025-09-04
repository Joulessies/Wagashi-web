import { Yuji_Boku } from "next/font/google";


const yuji = Yuji_Boku({
 weight: "400",
  subsets:["latin"],
});

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
    
      </div>
      <h1 className={`${yuji.className} welcome-jp p-0 text-7xl lg:text-8xl`}>ようこそ</h1>
      <h1 className="welcome-jp">welcome</h1>
      <p className=" welcome-eng text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Welcome to Wagashi
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
