"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bestSellers = [
    "/images/33b1fc52945e5d3c5e22c003c2fe2a03.jpg",
    "/images/5d60fac6e2a6244b70ea34dc26ed0106.jpg",
    "/images/80bd84a93883168e7ba8adaa64dbce58.jpg",
    "/images/business-navy-blue-suit-and-chunky-loafers-1.jpg",
    "/images/vestir-bien-30-anos-01-64231e454812d.avif"
];

const HomeCategories = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
    };

    return (
        <section className="py-24 bg-background border-t border-border/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Categories Column */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">
                                EXPLORA <span className="text-primary">TU ESTILO</span>
                            </h2>

                            <div className="grid gap-6">
                                <Link href="/shop/hombre" className="group relative overflow-hidden rounded-none h-40 border border-border">
                                    <Image
                                        src="/images/s-l1200.jpg"
                                        alt="Hombre"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-between px-8">
                                        <span className="text-3xl font-bold text-white">STREET HOMBRE</span>
                                        <ArrowRight className="text-primary w-8 h-8 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                    </div>
                                </Link>

                                <Link href="/shop/mujer" className="group relative overflow-hidden rounded-none h-40 border border-border">
                                    <Image
                                        src="/images/Untitled_design_1-835478.jpg"
                                        alt="Mujer"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-between px-8">
                                        <span className="text-3xl font-bold text-white">GIRL SHOP</span>
                                        <ArrowRight className="text-primary w-8 h-8 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Best Sellers Carousel Column */}
                    <div className="lg:col-span-8">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">Lo Más Vendido</h3>
                                <div className="h-1 w-20 bg-primary"></div>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full hover:border-primary hover:text-primary transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full hover:border-primary hover:text-primary transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative overflow-hidden h-[500px] w-full rounded-none border border-border/50">
                            <div className="absolute inset-0 flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {bestSellers.map((src, index) => (
                                    <div key={index} className="min-w-full h-full relative group">
                                        <Image
                                            src={src}
                                            alt={`Best Seller ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-primary font-bold mb-1">BESTSELLER #{index + 1}</p>
                                                    <h4 className="text-2xl font-bold text-white">Urban Techwear Jacket</h4>
                                                </div>
                                                <span className="text-2xl font-mono text-primary">$120.00</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {bestSellers.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? "bg-primary w-6" : "bg-white/50"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeCategories;
