"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowLeft, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { cart, itemCount, removeFromCart, addToCart } = useCart();
    const [confirmDeleteId, setConfirmDeleteId] = React.useState<number | null>(null);

    const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("S/", ""));
        return acc + price * item.quantity;
    }, 0);

    const handleDelete = (id: number) => {
        removeFromCart(id);
        setConfirmDeleteId(null);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 px-4">
                <div className="w-24 h-24 bg-secondary/20 rounded-none flex items-center justify-center border border-white/10">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter">Tu carrito está vacío</h1>
                <p className="text-muted-foreground text-center max-w-md">Parece que aún no has añadido nada a tu selección. ¡Explora nuestras colecciones!</p>
                <Link href="/shop">
                    <Button className="bg-primary text-primary-foreground font-black px-8 py-6 rounded-none uppercase italic tracking-widest">
                        Ir a la tienda
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Product List */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-center justify-between border-b pb-6">
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Tu Carrito ({itemCount})</h1>
                        <Link href="/shop" className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
                            <ArrowLeft className="w-4 h-4" /> CONTINUAR COMPRANDO
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                className="flex gap-6 p-4 bg-black/50 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(47,255,0,0.08)]"
                            >
                                <div className="relative w-24 h-32 md:w-32 md:h-40 bg-white rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-primary/20">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-black uppercase italic tracking-tight">{item.name}</h3>
                                            <p className="text-primary font-black mt-1">{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-background rounded-xl px-3 py-2 border border-primary/10">
                                            <span className="text-sm font-bold">Cantidad: {item.quantity}</span>
                                            <button
                                                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }, false)}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
                                                aria-label="Incrementar cantidad"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => setConfirmDeleteId(item.id)}
                                            className="text-red-500 hover:text-red-600 transition-all p-2 hover:scale-110"
                                            aria-label="Eliminar artículo"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="w-full lg:w-[400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black text-white p-8 rounded-2xl border border-white/10 sticky top-32 shadow-[0_0_40px_rgba(47,255,0,0.12)]"
                    >
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Resumen</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm uppercase tracking-widest text-gray-400">
                                <span>Subtotal</span>
                                <motion.span key={total} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>S/{total.toFixed(2)}</motion.span>
                            </div>
                            <div className="flex justify-between text-sm uppercase tracking-widest text-gray-400">
                                <span>Envío</span>
                                <span className="text-primary font-bold">Gratis</span>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between text-xl font-black uppercase tracking-tighter italic">
                                <span>Total</span>
                                <motion.span key={`t-${total}`} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-primary">S/{total.toFixed(2)}</motion.span>
                            </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-6 rounded-xl uppercase italic tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            Finalizar Compra
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <AnimatePresence>
                {confirmDeleteId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 10, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 10, opacity: 0 }}
                            className="bg-background border border-primary/20 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center"
                        >
                            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">¿Eliminar producto?</h3>
                            <p className="text-muted-foreground mb-6">Desea borrar este artículo de su carrito</p>
                            <div className="flex gap-4 justify-center">
                                <Button 
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="w-full rounded-xl font-bold uppercase bg-red-500 hover:bg-red-600 text-white"
                                >
                                    No
                                </Button>
                                <Button 
                                    onClick={() => handleDelete(confirmDeleteId)}
                                    className="w-full rounded-xl font-bold uppercase"
                                >
                                    Sí
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
