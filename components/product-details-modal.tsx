"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Yuji_Boku } from "next/font/google";
import { ShoppingBag, Star, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/app/context/cartcontext";

const yuji = Yuji_Boku({
  weight: "400",
  subsets: ["latin"],
});

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

type ProductDetailsModalProps = {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductDetailsModal({
  productId,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const supabase = createClient();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock additional images for gallery (in real app, these would come from database)
  const additionalImages = product?.product_img
    ? [
        product.product_img,
        product.product_img, // In real app, you'd have multiple images
        product.product_img,
        product.product_img,
      ]
    : [];

  useEffect(() => {
    if (productId && isOpen) {
      fetchProduct();
    }
  }, [productId, isOpen]);

  const fetchProduct = async () => {
    if (!productId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Add items one by one based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          product_img: product.product_img,
          product_jp: product.product_jp,
        });
      }
      // Reset quantity after adding
      setQuantity(1);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <dialog className="modal modal-open" open={isOpen}>
      <div className="modal-box w-11/12 max-w-6xl h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </form>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={`/prod/${additionalImages[selectedImage]}`}
                  alt={product.product_name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {additionalImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-full h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={`/prod/${image}`}
                      alt={`${product.product_name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {product.product_name}
                </h1>
                <p className={`${yuji.className} text-xl text-gray-600 mb-4`}>
                  {product.product_jp}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) • 127 reviews
                  </span>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-primary mb-6">
                  ₱{product.product_price.toLocaleString()}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.product_desc ||
                    "A delicious traditional Japanese confectionery that brings authentic flavors to your table. Made with premium ingredients and traditional techniques."}
                </p>
              </div>

              {/* Category Info */}
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  {product.product_category}
                </div>
                <div>
                  <span className="font-semibold">Type:</span>{" "}
                  {product.product_subcategory}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="p-2 hover:bg-gray-100 transition-colors"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      className="p-2 hover:bg-gray-100 transition-colors"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Max 10 per order
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  className="btn btn-primary w-full text-lg py-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={20} />
                  Add to Cart - ₱
                  {(product.product_price * quantity).toLocaleString()}
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Availability:</span>
                    <span className="text-green-600 ml-2">In Stock</span>
                  </div>
                  <div>
                    <span className="font-semibold">SKU:</span>
                    <span className="ml-2">
                      WAG-{product.product_id.toString().padStart(3, "0")}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="font-semibold">Shipping:</span>
                  <span className="ml-2">
                    Free shipping on orders over ₱500
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
