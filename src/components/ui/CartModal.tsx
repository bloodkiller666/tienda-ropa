"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "./button";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

const CartModal = () => {
    const { isCartModalOpen, setIsCartModalOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsCartModalOpen(false)}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20, rotateX: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20, rotateX: 10 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="relative bg-black/90 border border-primary/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(47,255,0,0.15)] max-w-md w-full overflow-hidden"
                    >
                        {/* Decorative Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                        
                        <button
                            onClick={() => setIsCartModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white hover:rotate-90 transition-all duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center space-y-6 relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-2 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(47,255,0,0.2)]">
                                <ShoppingCart className="w-10 h-10 text-primary drop-shadow-[0_0_5px_rgba(47,255,0,0.8)]" />
                            </div>
                            
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                                    ¡Añadido al carrito!
                                </h2>
                                <div className="h-1 w-20 bg-primary/50 mx-auto rounded-full" />
                            </div>
                            
                            <p className="text-gray-400 font-medium leading-relaxed">
                                El producto se ha añadido correctamente a tu selección. <br/>
                                <span className="text-primary/80 text-sm uppercase tracking-widest">¿Qué quieres hacer ahora?</span>
                            </p>

                            <div className="flex flex-col gap-3 pt-4">
                                <Link href="/cart" onClick={() => setIsCartModalOpen(false)} className="w-full">
                                    <Button className="w-full bg-primary hover:bg-primary/80 text-black font-black py-6 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest italic shadow-[0_0_20px_rgba(47,255,0,0.4)] hover:shadow-[0_0_30px_rgba(47,255,0,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                                        Ver Carrito <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCartModalOpen(false)}
                                    className="w-full border-white/10 hover:border-white/30 text-white hover:bg-white/5 py-6 rounded-xl font-black uppercase tracking-widest italic transition-all duration-300"
                                >
                                    Seguir Comprando
                                </Button>
                            </div>
                        </div>
                        
                        {/* Background Noise/Texture */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartModal;