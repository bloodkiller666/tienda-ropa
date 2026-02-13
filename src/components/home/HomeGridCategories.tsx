"use client";

import Image from "next/image";
import Link from "next/link";
import hombreImg from "../../../Fotos/Hombre/H_003.jpg";
import mujerImg from "../../../Fotos/Mujer/Untitled_design_1-835478.jpg";
import fraganciaImg from "../../../Fotos/Mujer/MD273799.jpg";
import navesImg from "../../../Fotos/Mujer/business-navy-blue-suit-and-chunky-loafers-1.jpg";

const categories = [
  { id: 1, title: "STREET HOMBRE", image: hombreImg, link: "/shop/hombre" },
  { id: 2, title: "GIRL SHOP", image: mujerImg, link: "/shop/mujer" },
  { id: 3, title: "FRAGANCIAS", image: fraganciaImg, link: "/category/fragancias" },
  { id: 4, title: "ZONA NAVES", image: navesImg, link: "/category/zona-naves" },
];

import { TiltCard } from "@/components/ui/TiltCard";

const HomeGridCategories = () => {
  return (
    <section className="py-20 bg-background relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          EXPLORA <span className="text-primary drop-shadow-[0_0_10px_rgba(47,255,0,0.5)]">CATEGORÍAS</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
           <Link
              key={cat.id}
              href={cat.link}
              className="group block"
            >
              <TiltCard className="h-full rounded-none border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(47,255,0,0.2)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Floating Text */}
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="h-0.5 w-12 bg-primary mb-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100" />
                    <span className="text-lg md:text-xl font-black uppercase tracking-widest text-white block leading-tight">
                        {cat.title}
                    </span>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Ver Colección</span>
                        <div className="h-[1px] w-4 bg-primary" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGridCategories;
