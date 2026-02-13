"use client";

import { motion } from "framer-motion";
import ProductFlipCard from "@/components/ui/ProductFlipCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    stock?: number;
};

type QuickViewProduct = {
    id: number;
    name: string;
    price: string;
    image: string | StaticImageData;
    stock?: number;
};

const products: Product[] = [
    {
        id: 1,
        name: "Neon Tech Hoodie",
        price: "S/199.90",
        image: "/images/EV54HCM123.webp",
        category: "Hoodies",
        stock: 65
    },
    {
        id: 2,
        name: "Cyber Punk Joggers",
        price: "S/149.90",
        image: "/images/HB0575_2.webp",
        category: "Pants",
        stock: 40
    },
    {
        id: 3,
        name: "Glitch Tee",
        price: "S/209.90",
        image: "/images/EV54NCM131.webp",
        category: "T-Shirts",
        stock: 18
    },
    {
        id: 4,
        name: "Void Jacket",
        price: "S/249.90",
        image: "/images/MD273799.jpg",
        category: "Outerwear",
        stock: 82
    }
];

const ProductCard = ({ product, index, onQuickView }: { product: Product; index: number; onQuickView: (p: QuickViewProduct) => void }) => {
    const { addToCart } = useCart();
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
        >
            <ProductFlipCard
                product={product}
                accentClass="bg-primary hover:bg-primary/80 text-black"
                onAddToCart={(p) => addToCart({ ...p, image: typeof p.image === 'string' ? p.image : p.image.src })}
                onQuickView={(p) => onQuickView({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    stock: p.stock
                })}
            />
        </motion.div>
    );
};

const FeaturedProducts = () => {
    const { addToCart } = useCart();
    const [quickView, setQuickView] = useState<QuickViewProduct | null>(null);
    return (
        <section className="py-24 bg-background relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black tracking-tighter text-white"
                        >
                            NUESTROS <span className="text-primary drop-shadow-[0_0_8px_rgba(47,255,0,0.6)]">PRODUCTOS</span>
                        </motion.h2>
                        <p className="text-gray-400 mt-2 max-w-md border-l-2 border-primary/50 pl-4">
                            Diseñado para las calles del futuro.
                        </p>
                    </div>
                    <Button 
                        variant="outline" 
                        className="rounded-none skew-x-[-10deg] border-primary text-white hover:bg-primary hover:text-black font-bold tracking-widest px-8 transition-all duration-300"
                    >
                        VER TODO
                    </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} onQuickView={(p) => setQuickView(p)} />
                    ))}
                </div>
            </div>

            {/* Quick View Drawer */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: quickView ? 0 : "100%" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className="fixed top-0 right-0 h-screen w-[90vw] sm:w-[420px] z-[80] bg-black/90 backdrop-blur-md border-l border-primary/30 shadow-[0_0_40px_rgba(47,255,0,0.25)]"
            >
                {quickView && (
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-primary/20">
                            <h3 className="text-white font-black uppercase tracking-widest">{quickView.name}</h3>
                            <Button variant="ghost" size="icon" onClick={() => setQuickView(null)}>
                                ✕
                            </Button>
                        </div>
                        <div className="p-4 flex-1 overflow-auto space-y-4">
                            <div className="relative aspect-square overflow-hidden border border-border rounded-none">
                                <Image src={quickView.image} alt={quickView.name} fill className="object-cover" />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className="text-muted-foreground uppercase text-xs">Precio</span>
                                <span className="text-primary font-black">{quickView.price}</span>
                            </div>
                            {typeof quickView.stock === "number" && (
                                <div>
                                    <div className="h-2 bg-border">
                                        <div className="h-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, quickView.stock))}%` }} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-bold mt-1 inline-block">
                                        Stock {quickView.stock}% {quickView.stock < 20 ? "• Bajo" : quickView.stock < 50 ? "• Medio" : "• Alto"}
                                    </span>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    className="bg-primary text-black"
                                    onClick={() => quickView && addToCart({
                                        id: quickView.id,
                                        name: quickView.name,
                                        price: quickView.price,
                                        image: typeof quickView.image === "string" ? quickView.image : quickView.image.src,
                                    })}
                                >
                                    Añadir al carrito
                                </Button>
                                <Button asChild variant="outline">
                                    <a href={`/product/${quickView.id}`}>Ver producto</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
            {/* Scrim */}
            <div
                className={`fixed inset-0 z-[70] bg-black/60 transition-opacity ${quickView ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setQuickView(null)}
            />
        </section>
    );
};

export default FeaturedProducts;
