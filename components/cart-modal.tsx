"use client";
import { ShoppingBagIcon, Trash2 } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";
import Image from "next/image";
import { Yuji_Boku } from "next/font/google";

 const yuji = Yuji_Boku({
    weight: "400",
    subsets: ["latin"],
  });

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const totalqty = cart.reduce(
    (sum,item) => sum + item.quantity, 0
  );

 
  return (
    <>
    <div className="indicator">
      <ShoppingBagIcon
        className="cursor-pointer"
        onClick={() =>
          (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()
        }
      />
      {totalqty > 0 &&(<span className="badge badge-sm indicator-item" >{totalqty}</span>)}
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-10/12 max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex grid grid-cols-3 items-center justify-between"
                >
                  <div className="flex items-center col-span-2 gap-2">
                    {item.product_img && (
                      <Image
                        src={`/prod/${item.product_img}`}
                        alt={item.product_name}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                    )}
                    <div>
                      <h1 className="text-lg">{item.product_name}
                        <p className={`${yuji.className} pb-1 text-sm`}>
                      {item.product_jp}
                    </p>
                      </h1>
                      <p className="text-xl">₱{item.product_price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 grid grid-cols-2">
                    <div className="flex gap-2 justify-end">
                      <span className="px-2 pt-4">{item.quantity}</span>
                      <div className="join-vertical join">
                    <button
                      className="btn join-item btn-xs gap-2"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                     <button
                      className="btn join-item btn-xs gap-2"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    </div>
                    </div>
                    <div className="flex justify-end">
                    <Trash2
                    className="cursor-pointer text-red-500"
                    onClick={() => removeFromCart(item.product_id)}
                  />
                  </div>
                  </div>

                  
                  
                </div>
              ))}

              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span>₱{total}</span>
              </div>
              <div className="justify-end">
              <button
                className="btn btn-primary w-48 justify-center mt-2"
                onClick={clearCart}
              >
                Checkout
              </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
