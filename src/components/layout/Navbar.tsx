"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import Image from "next/image";
import Logo from "../../../Fotos/PNG/Recurso 10@10x.png";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [mobileShopOpen, setMobileShopOpen] = useState(false);
    const pathname = usePathname();
    const { itemCount } = useCart();

    const isMujerSection = pathname?.includes('/shop/mujer');

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const textColorClass = "text-foreground";
    const hoverColorClass = "hover:text-primary";

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-[30px] inset-x-0 z-40 transition-all duration-300 bg-black/60 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/10"
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`md:hidden ${textColorClass}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>

                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src={Logo} alt="GEDA" className="h-10 w-20" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-2" onMouseLeave={() => setHoveredTab(null)}>
                        <Link
                            href="/"
                            onMouseEnter={() => setHoveredTab("INICIO")}
                            className="relative px-4 py-2 z-10"
                        >
                            {hoveredTab === "INICIO" && (
                                <motion.span
                                    layoutId="pill-nav"
                                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_10px_rgba(47,255,0,0.5)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={cn(
                                "text-sm font-bold tracking-widest transition-colors uppercase",
                                hoveredTab === "INICIO" ? "text-black" : textColorClass
                            )}>
                                INICIO
                            </span>
                        </Link>

                        

                        <div
                            onClick={() => {
                                setIsMegaMenuOpen((v) => !v);
                                setHoveredTab((v) => (v === "TIENDA" ? null : "TIENDA"));
                            }}
                            className="relative px-4 py-2 cursor-pointer group z-10"
                        >
                            {hoveredTab === "TIENDA" && (
                                <motion.span
                                    layoutId="pill-nav"
                                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_10px_rgba(47,255,0,0.5)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={cn(
                                "text-sm font-bold tracking-widest flex items-center gap-1 transition-colors uppercase",
                                hoveredTab === "TIENDA" ? "text-black" : textColorClass,
                                isMegaMenuOpen && !hoveredTab && "text-primary"
                            )}>
                                TIENDA
                                <ChevronDown className={cn("w-4 h-4 transition-transform", isMegaMenuOpen && "rotate-180")} />
                            </span>
                        </div>

                        <Link
                            href="/shop/hombre"
                            onMouseEnter={() => setHoveredTab("HOMBRE")}
                            className="relative px-4 py-2 z-10"
                        >
                            {hoveredTab === "HOMBRE" && (
                                <motion.span
                                    layoutId="pill-nav"
                                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_10px_rgba(47,255,0,0.5)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={cn(
                                "text-sm font-bold tracking-widest transition-colors uppercase",
                                hoveredTab === "HOMBRE" ? "text-black" : textColorClass
                            )}>
                                STREET HOMBRE
                            </span>
                        </Link>

                        <Link
                            href="/shop/mujer"
                            onMouseEnter={() => setHoveredTab("MUJER")}
                            className="relative px-4 py-2 z-10"
                        >
                            {hoveredTab === "MUJER" && (
                                <motion.span
                                    layoutId="pill-nav"
                                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_10px_rgba(47,255,0,0.5)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={cn(
                                "text-sm font-bold tracking-widest transition-colors uppercase",
                                hoveredTab === "MUJER" ? "text-black" : textColorClass
                            )}>
                                GIRL SHOP
                            </span>
                        </Link>

                        <Link
                            href="/colecciones"
                            onMouseEnter={() => setHoveredTab("COLECCIONES")}
                            className="relative px-4 py-2 z-10"
                        >
                            {hoveredTab === "COLECCIONES" && (
                                <motion.span
                                    layoutId="pill-nav"
                                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_10px_rgba(47,255,0,0.5)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={cn(
                                "text-sm font-bold tracking-widest transition-colors uppercase",
                                hoveredTab === "COLECCIONES" ? "text-black" : textColorClass
                            )}>
                                COLECCIONES
                            </span>
                        </Link>
                    </div>

                    <div className={`flex items-center gap-4 ${textColorClass}`}>
                        <Button variant="ghost" size="icon" className={`${hoverColorClass} transition-colors hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(47,255,0,0.8)]`}>
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className={`hidden sm:flex ${hoverColorClass} transition-colors hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(47,255,0,0.8)]`}>
                            <User className="w-5 h-5" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`relative ${hoverColorClass} transition-colors hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(47,255,0,0.8)]`}
                            asChild
                        >
                            <Link href="/cart" aria-label="Abrir carrito">
                                <ShoppingBag className="w-5 h-5" />
                                {itemCount > 0 && (
                                    <span className={`absolute -top-1 -right-1 w-4 h-4 ${isMujerSection && !scrolled && !isMegaMenuOpen ? "bg-rose-500 text-white" : "bg-primary text-primary-foreground"} text-[10px] flex items-center justify-center rounded-full font-bold`}>
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                        </Button>
                    </div>
                </div>

                <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60]"
                    >
                        {/* Scrim */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "-100%", scale: 0.98 }}
                            animate={{ x: 0, scale: 1 }}
                            exit={{ x: "-100%", scale: 0.98 }}
                            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                            className="absolute top-0 left-0 h-screen w-[85vw] sm:w-[420px] bg-background border-r border-primary/20 shadow-[0_0_40px_rgba(47,255,0,0.25)]"
                        >
                        <div className="relative h-full w-full flex flex-col p-8 pt-24">
                            {/* Glow edge */}
                            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 blur-2xl pointer-events-none" />

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-0 right-4 text-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Cerrar menú"
                            >
                                <X className="w-8 h-8 text-primary" />
                            </Button>

                            <div className="space-y-8">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-3xl md:text-4xl font-black tracking-tighter text-foreground group">
                                    GEDA <span className="text-primary italic group-hover:pl-4 transition-all">UNLIMITED</span>
                                </Link>
                                <div className="h-px w-20 bg-primary" />
                                <nav className="space-y-6">
                                    <div className="space-y-3">
                                        <button
                                            className="w-full text-left text-2xl md:text-3xl font-bold tracking-widest uppercase hover:text-primary transition-colors flex items-center justify-between"
                                            onClick={() => setMobileShopOpen((v) => !v)}
                                        >
                                            <span>TIENDA</span>
                                            <ChevronDown className={`w-6 h-6 transition-transform ${mobileShopOpen ? "rotate-180 text-primary" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {mobileShopOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden pl-2"
                                                >
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Link href="/shop" onClick={() => { setMobileMenuOpen(false); }} className="text-sm font-bold uppercase px-3 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                                                            Principal
                                                        </Link>
                                                        <Link href="/shop/hombre" onClick={() => { setMobileMenuOpen(false); }} className="text-sm font-bold uppercase px-3 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                                                            Hombre
                                                        </Link>
                                                        <Link href="/shop/mujer" onClick={() => { setMobileMenuOpen(false); }} className="text-sm font-bold uppercase px-3 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                                                            GIRL SHOP
                                                        </Link>
                                                        <Link href="/shop/accesorios" onClick={() => { setMobileMenuOpen(false); }} className="text-sm font-bold uppercase px-3 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                                                            Accesorios
                                                        </Link>
                                                        <Link href="/colecciones" onClick={() => { setMobileMenuOpen(false); }} className="text-sm font-bold uppercase px-3 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                                                            Colecciones
                                                        </Link>
                                                        <Link href="/sobre" onClick={() => { setMobileMenuOpen(false); }} className="text-sm font-bold uppercase px-3 py-2 rounded-lg border border-primary hover:bg-primary/10 hover:text-primary transition-colors">
                                                            Sobre Nosotros
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
                                        <Link href="/shop/hombre" onClick={() => setMobileMenuOpen(false)} className="block text-2xl md:text-3xl font-bold tracking-widest uppercase hover:text-primary transition-colors">STREET HOMBRE</Link>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.19 }}>
                                        <Link href="/shop/mujer" onClick={() => setMobileMenuOpen(false)} className="block text-2xl md:text-3xl font-bold tracking-widest uppercase hover:text-primary transition-colors">GIRL SHOP</Link>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }}>
                                        <Link href="/colecciones" onClick={() => setMobileMenuOpen(false)} className="block text-2xl md:text-3xl font-bold tracking-widest uppercase hover:text-primary transition-colors">COLECCIONES</Link>
                                    </motion.div>
                                </nav>
                            </div>

                            <div className="mt-auto pt-12 border-t border-primary/10">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Síguenos</p>
                                <div className="flex gap-6">
                                    <span className="text-xs font-bold hover:text-primary cursor-pointer">INSTAGRAM</span>
                                    <span className="text-xs font-bold hover:text-primary cursor-pointer">TIKTOK</span>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
