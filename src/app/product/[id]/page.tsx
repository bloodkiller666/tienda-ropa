"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, Truck, ShieldCheck, RefreshCcw, ShoppingBag, ZoomIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("M");
    const [activeImage, setActiveImage] = useState(0);
    const [zoomOpen, setZoomOpen] = useState(false);
    
    // Zoom state
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const product = {
        id: id,
        name: "Street Oversized Hoodie – Black Essence",
        price: "S/145.00",
        description: "Nuestra polera 'Black Essence' redefine el streetwear con un corte oversized premium y materiales de alta densidad. Diseñada para durar y destacar en cualquier entorno urbano. Confeccionada con 100% algodón Terry para máxima suavidad y confort.",
        images: [
            "/images/H_003.jpg",
            "/images/5d60fac6e2a6244b70ea34dc26ed0106.jpg",
            "/images/80bd84a93883168e7ba8adaa64dbce58.jpg"
        ]
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase mb-12">
                    <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <ChevronRight className="w-3 h-3 text-primary" />
                    <Link href="/tienda" className="hover:text-primary transition-colors">Tienda</Link>
                    <ChevronRight className="w-3 h-3 text-primary" />
                    <span className="text-foreground">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    {/* Image Gallery */}
                    <div className="space-y-4 max-w-[420px] mx-auto w-full">
                        <motion.div
                            layoutId={`image-${product.id}`}
                            className="group relative aspect-[4/5] overflow-hidden bg-secondary/30 rounded-3xl border border-primary/10 shadow-xl cursor-crosshair"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onClick={() => setZoomOpen(true)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={product.images[activeImage]}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500"
                                    />
                                </motion.div>
                            </AnimatePresence>
                            
                            {/* Hover Zoom Overlay */}
                            {isHovering && (
                                <div
                                    className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
                                    style={{
                                        backgroundImage: `url(${product.images[activeImage]})`,
                                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                        backgroundSize: '200%',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                            )}

                            <button
                                onClick={(e) => { e.stopPropagation(); setZoomOpen(true); }}
                                className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:opacity-90 z-20"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                        </motion.div>
                        <div className="grid grid-cols-3 gap-2">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={cn(
                                        "relative aspect-square rounded-lg border overflow-hidden transition-all",
                                        activeImage === i
                                            ? "border-primary scale-95 shadow-md shadow-primary/20"
                                            : "border-black/10 opacity-60 hover:opacity-100 hover:scale-105"
                                    )}
                                >
                                    <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <AnimatePresence>
                        {zoomOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black z-50"
                                    onClick={() => setZoomOpen(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                >
                                    <div className="relative w-full max-w-3xl aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-2xl">
                                        <button
                                            onClick={() => setZoomOpen(false)}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 z-10"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="relative w-full h-full group">
                                            <Image
                                                src={product.images[activeImage]}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>



                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl lg:text-5xl font-black italic tracking-tighter uppercase mb-4 leading-none text-foreground">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-6 mb-8">
                                <span className="text-4xl font-black text-primary italic tracking-tight">{product.price}</span>
                                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-xs font-black italic text-primary">
                                    <Star className="w-4 h-4 fill-primary" />
                                    4.9 (120 REVIEWS)
                                </div>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-10 uppercase font-bold tracking-widest max-w-xl">
                                {product.description}
                            </p>

                            {/* Size Selection */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-foreground">Seleccionar Talla:</span>
                                    <button className="text-[10px] font-bold underline hover:text-primary uppercase tracking-widest transition-colors">Guía de Tallas</button>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "w-14 h-14 flex items-center justify-center font-black transition-all border-2 rounded-2xl text-sm",
                                                selectedSize === size
                                                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                                    : "bg-secondary/50 text-foreground border-primary/10 hover:border-primary hover:text-primary"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                                <Button 
                                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg h-20 rounded-2xl uppercase italic tracking-tighter transition-all shadow-xl shadow-primary/20 hover:scale-[1.02]"
                                    onClick={() => addToCart({
                                        id: parseInt(id),
                                        name: product.name,
                                        price: product.price,
                                        image: product.images[0]
                                    })}
                                >
                                    <ShoppingBag className="w-6 h-6 mr-2" />
                                    Añadir al Carrito
                                </Button>
                                <Button variant="outline" className="sm:w-20 h-20 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all">
                                    <Star className="w-6 h-6" />
                                </Button>
                            </div>

                            {/* Value Props */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-primary/10">
                                <div className="flex items-center gap-4">
                                    <Truck className="w-6 h-6 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight text-foreground">Envío Rápido<br /><span className="text-muted-foreground font-bold">Todo Lima</span></span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight text-foreground">Garantía<br /><span className="text-muted-foreground font-bold">30 días</span></span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <RefreshCcw className="w-6 h-6 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight text-foreground">Devoluciones<br /><span className="text-muted-foreground font-bold">Gratis</span></span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
