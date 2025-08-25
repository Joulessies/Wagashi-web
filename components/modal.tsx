"use client";

export default function Modal(){
    return (
        <>{/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement).showModal() }>open modal</button>
<dialog id="my_modal_3" className="modal">
  <div className="bg-white text-black modal-box h-2/4 w-11/12 max-w-5xl">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Product Details</h3>
    <div className="grid grid-row-4 grid-cols-2 gap-4">

        <div className="bg-gray-200 skeleton h-100 w-full"></div>
       
        <div className="grid grid-rows-5 py-6 gap-2">
        <div className="bg-gray-200 skeleton h-4 w-28"></div>
        <div className="bg-gray-200 skeleton h-4 w-full"></div>
        <div className="bg-gray-200 skeleton h-4 w-full"></div>
        </div>
        
         <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-200 skeleton h-10 w-10 "></div>
            <div className="bg-gray-200 skeleton h-10 w-10 "></div>
            <div className="bg-gray-200 skeleton h-10 w-10 "></div>
            <div className="bg-gray-200 skeleton h-10 w-10 "></div>
        </div>
        
    </div>
  </div>
</dialog></>
    )
}
