"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type MenuCategory = {
    title: string;
    link?: string;
    items: { label: string; link: string }[];
};

const categories: MenuCategory[] = [
    { 
        title: "PRINCIPAL",
        link: "/shop",
        items: [
            { label: "Principal", link: "/shop" },
        ]
    },
    { 
        title: "HOMBRE", 
        link: "/shop/hombre",
        items: [
            { label: "Camisetas", link: "/shop/hombre?cat=t-shirts" },
            { label: "Pantalones", link: "/shop/hombre?cat=pants" },
            { label: "Hoodies", link: "/shop/hombre?cat=hoodies" },
            { label: "Chaquetas", link: "/shop/hombre?cat=jackets" },
        ] 
    },
    { 
        title: "GIRL SHOP", 
        link: "/shop/mujer",
        items: [
            { label: "Tops", link: "/shop/mujer?cat=tops" },
            { label: "Vestidos", link: "/shop/mujer?cat=dresses" },
            { label: "Pantalones", link: "/shop/mujer?cat=pants" },
            { label: "Accesorios", link: "/shop/mujer?cat=accessories" },
        ] 
    },
    { 
        title: "ACCESORIOS", 
        link: "/shop/accesorios",
        items: [
            { label: "Gorras", link: "/shop/accesorios?cat=caps" },
            { label: "Mochilas", link: "/shop/accesorios?cat=backpacks" },
            { label: "Joyería", link: "/shop/accesorios?cat=jewelry" },
        ] 
    },
    { 
        title: "COLECCIONES", 
        link: "/colecciones",
        items: [
            { label: "Cyberpunk 2077", link: "/colecciones/cyberpunk" },
            { label: "Neon Lights", link: "/colecciones/neon" },
            { label: "Urban Tech", link: "/colecciones/urban-tech" },
        ] 
    },
    {
        title: "SOBRE NOSOTROS",
        link: "/sobre",
        items: [
            { label: "Conócenos", link: "/sobre" },
        ]
    },
];

const MegaMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm" 
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl text-white z-40 border-t border-white/10 shadow-2xl"
                        onMouseLeave={onClose}
                    >
                        <div className="container mx-auto px-4 py-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                                {categories.map((cat, i) => (
                                    <motion.div
                                        key={cat.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-xs font-black tracking-widest text-primary border-b border-primary/20 pb-3 drop-shadow-[0_0_5px_rgba(47,255,0,0.5)]">
                                            {cat.title}
                                        </h3>
                                        {cat.items.length > 0 ? (
                                            <ul className="space-y-3">
                                                {cat.items.map((item) => (
                                                    <li key={item.label}>
                                                        {cat.title === "SOBRE NOSOTROS" ? (
                                                            <Link
                                                                href={item.link}
                                                                className="inline-flex items-center justify-center px-3 py-2 text-[11px] font-black tracking-widest uppercase rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 hover:text-white transition-colors"
                                                                onClick={onClose}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={item.link}
                                                                className="text-[11px] text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 font-medium tracking-wide uppercase block"
                                                                onClick={onClose}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Link
                                                href={`/category/${cat.title.toLowerCase().replace(/ /g, "-")}`}
                                                className="text-[11px] text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 font-medium tracking-wide uppercase inline-block pt-2"
                                                onClick={onClose}
                                            >
                                                Ver todo
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;
