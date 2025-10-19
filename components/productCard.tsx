"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Yuji_Boku } from "next/font/google";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";

// --- Types for database ---
type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_img: string | null;
  product_desc: string | null;
  product_category: string | null;
  product_subcategory: string | null;
  product_jp: string;
};

type SubCategory = {
  subc_id: string;
  subc_name: string;
  subc_jp: string | null;
};

const yuji = Yuji_Boku({
  weight: "400",
  subsets: ["latin"],
});

export default function ProductCard() {
  const supabase = createClient();
  const { addToCart } = useCart();

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [subcategory, setSubcategory] = useState("all");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [totalCount, setTotalCount] = useState(0);

  // Load categories + subcategories
  useEffect(() => {
    const fetchFilters = async () => {
      const { data: subs } = await supabase.from("sub_category").select("*");
      setSubcategories(subs ?? []);
    };
    fetchFilters();
  }, [supabase]);

  // Fetch products with filters + pagination
  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (search) {
        query = query.ilike("product_name", `%${search}%`);
      }
      if (subcategory !== "all") {
        query = query.eq("product_subcategory", subcategory);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error(error);
      } else {
        setProducts((data as Product[]) ?? []);
        setTotalCount(count ?? 0);
      }
    };

    fetchProducts();
  }, [page, search, subcategory, pageSize, supabase]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6 w-full overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <aside className="md:col-span-1 shadow-sm rounded-lg p-4 h-fit">
          <h2 className="font-bold text-lg mb-4">Filters</h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input input-bordered w-full mb-4"
          />

          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={subcategory}
            onChange={(e) => {
              setSubcategory(e.target.value);
              setPage(1);
            }}
            className="select select-bordered w-full"
          >
            <option value="all">All Categories</option>
            {subcategories.map((sub) => (
              <option key={sub.subc_id} value={sub.subc_id}>
                {sub.subc_name}
              </option>
            ))}
          </select>
        </aside>

        
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full overflow-x-hidden">
            {products.map((product) => (
              <div
                key={product.product_id}
                className="card rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <figure className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={`/prod/${product.product_img}`}
                    alt={product.product_name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </figure>

                <div className="card-body pt-4 px-4 flex flex-col flex-1">
                  <h2 className="card-title mb-2 text-lg font-semibold">
                    {product.product_name}
                    <p className={`${yuji.className} pb-1 text-sm`}>
                      {product.product_jp}
                    </p>
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                    {product.product_desc}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <h1 className="text-2xl">₱ {product.product_price}</h1>
                    <button
                      className="btn btn-black"
                      onClick={() =>
                        addToCart({
                          product_id: product.product_id,
                          product_name: product.product_name,
                          product_price: product.product_price,
                          product_img: product.product_img,
                          product_jp: product.product_jp
                        })
                      }
                    >
                      <ShoppingBag />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                className="btn btn-outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`btn ${
                      page === pageNum ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="btn btn-outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
