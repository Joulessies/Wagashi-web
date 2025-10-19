"use client";
import { motion } from "motion/react";
import { Yuji_Boku } from "next/font/google";

const yuji = Yuji_Boku({
 weight: "400",
  subsets:["latin"],
});

const products = [
  {
    id: 1,
    name: "Namagashi",
    nameJp: "生菓子",
    season: "Spring",
    seasonJp: "春",
    description: "Delicate pink mochi wrapped in cherry blossom leaf",
    image: "https://images.unsplash.com/photo-1643136359605-91afdf67ab1a?w=600&q=80"
  },
  {
    id: 2,
    name: "Higashi",
    nameJp: "干菓子",
    season: "Summer",
    seasonJp: "夏",
    description: "Soft mochi filled with matcha and red bean paste",
    image: "https://images.unsplash.com/photo-1755184108649-b2a9ea5c83ac?w=600&q=80"
  },
  {
    id: 3,
    name: "Han-Namagashi",
    nameJp: "半生菓子",
    season: "Autumn",
    seasonJp: "秋",
    description: "Sweet chestnut filling in a tender pastry",
    image: "https://images.unsplash.com/photo-1613011392704-f8da2f20794a?w=600&q=80"
  },
];

export function Category() {
  return (
    <section id="products" className="py-8 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="text-sm text-primary tracking-[0.3em] uppercase mb-4">
            Selection
          </div>
          <h1 className={`${yuji.className} text-4xl lg:text-5xl mb-6`}>しゅるい</h1>
          <p className="text-muted-foreground leading-relaxed">
            Our confections change with the seasons, reflecting the natural beauty 
            and traditions of Japan throughout the year.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="aspect-square bg-card mb-6 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Season Badge */}
                <div className="absolute top-4 left-4 bg-white px-4 py-2 shadow-sm">
                  <div className="text-sm text-black">{product.seasonJp}</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={`${yuji.className} text-xl`}>{product.nameJp}</h3>
                <div className="text-sm text-muted-foreground">{product.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
