"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Galaxy from "@/components/effects/Galaxy";

const slides = [
    {
        id: 1,
        image: "/images/8205969a6bc049665bd547423dddc774.jpg",
        title: "GEDA UNLIMITED",
        subtitle: "Redefiniendo la moda urbana con cortes atrevidos y materiales de primera calidad."
    },
    {
        id: 2,
        image: "/images/business-navy-blue-suit-and-chunky-loafers-1.jpg",
        title: "ELEGANCIA MODERNA",
        subtitle: "Estilo sofisticado para el hombre contemporáneo."
    },
    {
        id: 3,
        image: "/images/vestir-bien-30-anos-01-64231e454812d.avif",
        title: "NUEVA COLECCIÓN",
        subtitle: "Descubre las últimas tendencias de esta temporada."
    },
    {
        id: 4,
        image: "/images/s-l1200.jpg",
        title: "ESTILO CASUAL",
        subtitle: "Comodidad y diseño en cada prenda."
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [current]);

    return (
        <div className="relative md:h-screen h-[70vh] w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Galaxy */}
            <div className="absolute inset-0 z-0">
                <Galaxy />
            </div>

            {/* Content Overlay */}
            <div
                className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full"
            >
                
                {/* Text Section */}
                <div className="order-2 md:order-1 flex flex-col items-start space-y-6">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-left space-y-4"
                        >
                            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-2 leading-tight">
                                {slides[current].title}
                            </h1>
                            <p className="text-base md:text-xl text-gray-300 max-w-lg leading-relaxed border-l-4 border-primary pl-4">
                                {slides[current].subtitle}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
                                <Button size="lg" className="flex-1 md:flex-none bg-primary text-black hover:bg-primary/80 font-bold tracking-widest px-8 rounded-none skew-x-[-10deg]">
                                    COMPRAR AHORA
                                </Button>
                                <Button size="lg" variant="outline" className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10 font-bold tracking-widest px-8 rounded-none skew-x-[-10deg]">
                                    VER COLECCIÓN
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Image Section */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.7 }}
                            className="relative w-[240px] h-[320px] md:w-[380px] md:h-[520px]"
                        >
                            {/* Futuristic Frame */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-30 blur-xl rounded-[2rem]" />
                            <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
                                <div className="absolute inset-0">
                                    <Image
                                        src={slides[current].image}
                                        alt={slides[current].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                
                                {/* Glitch/Tech Elements */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-primary font-mono mb-1">SYS.ID.{slides[current].id}045</span>
                                            <span className="text-white font-bold uppercase tracking-widest text-sm">{slides[current].title}</span>
                                        </div>
                                        <div className="h-1 w-12 bg-primary animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Buttons */}
            {/* Navigation Buttons */}
<div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between px-2 md:px-10 pointer-events-none">
    <button 
        onClick={prevSlide}
        className="p-3 text-white/70 hover:text-primary transition-colors border border-white/10 hover:border-primary bg-black/40 backdrop-blur-md rounded-full pointer-events-auto active:scale-90"
    >
        <ChevronLeft size={24} />
    </button>
    
    {/* Los puntitos indicadores los mantenemos abajo, pero más discretos */}
    <div className="absolute -bottom-[180px] md:-bottom-[350px] left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
        {slides.map((_, idx) => (
            <div 
                key={idx} 
                className={`h-1 transition-all duration-300 ${idx === current ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`} 
            />
        ))}
    </div>

    <button 
        onClick={nextSlide}
        className="p-3 text-white/70 hover:text-primary transition-colors border border-white/10 hover:border-primary bg-black/40 backdrop-blur-md rounded-full pointer-events-auto active:scale-90"
    >
        <ChevronRight size={24} />
    </button>
</div>
        </div>
    );
};

export default Hero;
