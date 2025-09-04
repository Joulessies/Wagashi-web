export default function Category() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-10 px-2 mx-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        

        <div className=" card bg-white text-black shadow-lg gap-4">
          <figure className="px-5 pt-5">
            <div className="bg-gray-200 skeleton h-44 w-56 rounded-xl"></div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Namagashi</h2>
            <h1>生菓子</h1>
            <div className="card-actions">
              <button className="btn btn-neutral m-2">Shop Now</button>
            </div>
          </div>
        </div>

        <div className="card bg-white text-black shadow-lg gap-4">
          <figure className="px-5 pt-5">
            <div className="bg-gray-200 skeleton h-44 w-56 rounded-xl"></div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Higashi </h2>
            <h1>干菓子</h1>
            <div className="card-actions">
              <button className="btn btn-neutral m-2">Shop Now</button>
            </div>
          </div>
        </div>

        <div className="card bg-white text-black shadow-lg gap-4">
          <figure className="px-5 pt-5">
           <div className="bg-gray-200 skeleton h-44 w-56 rounded-xl"></div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Han-namagashi</h2>
            <h1>半生菓子</h1>
            <div className="card-actions">
              <button className="btn btn-neutral m-2">Shop Now</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
