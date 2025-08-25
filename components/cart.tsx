import Image from "next/image";

export default function Cart(){
return(
    <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className=" drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button">
        <Image className="drawer-button " src={"/image/cart.png"} width={25} height={25} alt="cart"/>
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-white text-black min-h-full w-4/12 p-4">
      {/* Sidebar content here */}

    </ul>
  </div>
</div>
);


}