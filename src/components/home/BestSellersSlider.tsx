"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const products = [
    { id: 1, name: "Street Green – Medias", price: "S/30.00", image: "/images/images.jpg", badge: "3 medias x S/60" },
    { id: 2, name: "Coller – Billetera", price: "S/75.00", image: "/images/s-l1200.jpg", badge: "Protección Antirrobo" },
    { id: 3, name: "Black Cream – Billetera", price: "S/75.00", image: "/images/s-l1200.jpg", badge: "Protección Antirrobo" },
    { id: 4, name: "Cat Skull – Mochila", price: "S/115.00", image: "/images/80bd84a93883168e7ba8adaa64dbce58.jpg" },
    { id: 5, name: "Urban Tech Hoodie", price: "S/145.00", image: "/images/EV54HCM123.webp" },
];

import { RevealText } from "@/components/ui/RevealText";
import { useCart } from "@/context/CartContext";

const BestSellersSlider = () => {
    const [current, setCurrent] = useState(0);
    const { addToCart } = useCart();

    const totalProducts = products.length;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % totalProducts);
        }, 5000);
        return () => clearInterval(timer);
    }, [totalProducts]);

    const prev = () => setCurrent(curr => (curr === 0 ? totalProducts - 1 : curr - 1));
    const next = () => setCurrent(curr => (curr === totalProducts - 1 ? 0 : curr + 1));

    return (
        <section className="py-7 bg-background overflow-hidden border-t border-primary/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <RevealText
                        text="¡LOS MÁS VENDIDOS!"
                        className="text-4xl font-black italic tracking-widest text-foreground mb-4 uppercase"
                    />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        className="h-1 w-24 bg-primary mx-auto mb-6"
                    />
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto uppercase font-bold tracking-widest leading-relaxed">
                        Descubre las piezas favoritas de nuestra comunidad. Ediciones limitadas diseñadas para destacar.
                    </p>
                </div>

                <div className="relative group px-4 md:px-12">
                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: `-${current * (100 / (typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 4))}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex gap-4 md:gap-8"
                        >
                            {products.map((p) => (
                                <motion.div
                                    key={p.id}
                                    className="min-w-[100%] sm:min-w-[45%] lg:min-w-[calc(25%-1.5rem)] group/item relative bg-secondary/20 rounded-3xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all"
                                >
                                    <Link href={`/product/${p.id}`}>
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover/item:scale-110" />
                                            {p.badge && (
                                                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] px-3 py-1 font-black italic uppercase rounded-full z-10">
                                                    {p.badge}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="p-6 space-y-4 bg-background/40 backdrop-blur-sm">
                                        <div className="flex justify-between items-start gap-2">
                                            <Link href={`/product/${p.id}`} className="flex-1">
                                                <h3 className="font-bold text-sm text-foreground uppercase truncate hover:text-primary transition-colors tracking-wide">{p.name}</h3>
                                            </Link>
                                            <p className="text-lg font-black text-primary italic whitespace-nowrap">{p.price}</p>
                                        </div>
                                        <Button 
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs py-5 rounded-2xl transition-all uppercase italic tracking-widest shadow-lg shadow-primary/10 group/btn overflow-hidden relative"
                                            onClick={() => addToCart({ ...p, image: p.image || '' })}
                                        >
                                            <span className="relative z-10">AÑADIR AL CARRITO</span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {products.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={cn(
                                    "h-1.5 transition-all duration-300 rounded-full",
                                    current === i ? "w-8 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                                )}
                            />
                        ))}
                    </div>

                    <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md border border-primary/20 p-4 rounded-full shadow-lg z-10 hover:bg-primary hover:text-primary-foreground transition-all hidden md:block">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md border border-primary/20 p-4 rounded-full shadow-lg z-10 hover:bg-primary hover:text-primary-foreground transition-all hidden md:block">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BestSellersSlider;
