"use client";


import { ShoppingCartIcon } from "lucide-react";

export default function Cart(){


return(
    <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className=" drawer-content">
    <label htmlFor="my-drawer-4" className="drawer-button">
        <ShoppingCartIcon/>
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-white text-black min-h-full w-4/12 p-4">
          <div className="p-8">
      <h1 className="text-3xl">Your Cart</h1>

        <p>No items yet.</p>
    </div>

    </ul>
  </div>
</div>
);


}