"use client";
import { motion } from "motion/react";
import { Yuji_Boku } from "next/font/google";

const yuji = Yuji_Boku({
 weight: "400",
  subsets:["latin"],
});


const galleryItems = [
  {
    id: 1,
    title: "Spring Blossom",
    titleJp: "桜の花",
    image: "https://images.unsplash.com/photo-1711972379751-cdd50cb9e0b2?w=800&q=80"
  },
  {
    id: 2,
    title: "Tea Ceremony",
    titleJp: "茶道",
    image: "https://images.unsplash.com/photo-1755184108649-b2a9ea5c83ac?w=800&q=80"
  },
  {
    id: 3,
    title: "Autumn Harvest",
    titleJp: "秋の収穫",
    image: "https://images.unsplash.com/photo-1613011392704-f8da2f20794a?w=800&q=80"
  },
  {
    id: 4,
    title: "Winter Serenity",
    titleJp: "冬の静寂",
    image: "https://images.unsplash.com/photo-1643136359605-91afdf67ab1a?w=800&q=80"
  },
  {
    id: 5,
    title: "Master's Hand",
    titleJp: "職人の手",
    image: "https://images.unsplash.com/photo-1627308593413-3a3e02108920?w=800&q=80"
  },
  {
    id: 6,
    title: "Garden Path",
    titleJp: "庭の道",
    image: "https://images.unsplash.com/photo-1607270635857-5c6d5d0a76e5?w=800&q=80"
  }
];

export function Gallery() {
  return (
    <section id="gallery" className="py-10 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="text-sm text-primary tracking-[0.3em] uppercase mb-4">
            Gallery
          </div>
          <h2 className={`${yuji.className} text-4xl lg:text-5xl mb-6`}>美の瞬間</h2>
          <p className="text-muted-foreground leading-relaxed">
            Glimpses into our world of traditional Japanese confectionery and the artistry behind each creation.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-card overflow-hidden relative mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-xl mb-1">{item.titleJp}</div>
                    <div className="text-sm opacity-80">{item.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center max-w-3xl mx-auto"
        >
          <div className={`${yuji.className} text-3xl lg:text-4xl mb-6 leading-relaxed`}>
           花より団子
          </div>
          <div className="text-sm text-primary tracking-[0.3em] uppercase mb-4">
            Hana yori Dango
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Food over Flowers
          </p>
        </motion.div>
      </div>
    </section>
  );
}
