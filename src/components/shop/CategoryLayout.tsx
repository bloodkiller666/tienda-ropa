 "use client";
 
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import ProductFlipCard from "@/components/ui/ProductFlipCard";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import h1 from "../../../Fotos/Hombre/H_003.jpg";
import h2 from "../../../Fotos/Hombre/s-l1200.jpg";
import h3 from "../../../Fotos/Hombre/casaca-running-icon-ls-1-2-zip-hombre-performance-black.jpg";
import h4 from "../../../Fotos/Hombre/80bd84a93883168e7ba8adaa64dbce58.jpg";
import h5 from "../../../Fotos/Hombre/foto 1.jpeg";
import h6 from "../../../Fotos/Hombre/foto 2.jpeg";
import m1 from "../../../Fotos/Mujer/33b1fc52945e5d3c5e22c003c2fe2a03.jpg";
import m2 from "../../../Fotos/Mujer/5d60fac6e2a6244b70ea34dc26ed0106.jpg";
import m3 from "../../../Fotos/Mujer/MD273799.jpg";
import m4 from "../../../Fotos/Mujer/shorts-deportivos-mujer-40190374-40258_1.jpg";
import m5 from "../../../Fotos/Mujer/foto 1_.jpeg";
import m6 from "../../../Fotos/Mujer/foto 2_.jpeg";
import m7 from "../../../Fotos/Mujer/foto 3_.jpeg";
import m8 from "../../../Fotos/Mujer/foto 4_.jpeg";
import m9 from "../../../Fotos/Mujer/foto 5_.jpeg";

// Default Data
const defaultProducts = [
    { id: 1, name: "Street Oversized Tee", price: "S/199.90", image: "/images/s-l1200.jpg", category: "T-Shirts" },
    { id: 2, name: "Urban Cargo Pants", price: "S/149.90", image: "/images/33b1fc52945e5d3c5e22c003c2fe2a03.jpg", category: "Pants" },
    { id: 3, name: "Tech Fleece Hoodie", price: "S/179.90", image: "/images/5d60fac6e2a6244b70ea34dc26ed0106.jpg", category: "Hoodies" },
    { id: 4, name: "Neon Runner Jacket", price: "S/249.90", image: "/images/8205969a6bc049665bd547423dddc774.jpg", category: "Jackets" },
    { id: 5, name: "Graphic Print Tee", price: "S/219.90", image: "/images/s-l1200.jpg", category: "T-Shirts" },
    { id: 6, name: "Blackout Denim", price: "S/209.90", image: "/images/business-navy-blue-suit-and-chunky-loafers-1.jpg", category: "Pants" },
];

export default function CategoryPage({ category }: { category: string }) {
    const { addToCart } = useCart();
    const baseTitle = category.charAt(0).toUpperCase() + category.slice(1);
    const title = baseTitle.toLowerCase() === "mujer" ? "GIRL SHOP" : baseTitle;
    
    // Define theme based on category (acepta variantes como 'street hombre' y 'girl shop')
    const cat = category.toLowerCase();
    const isHombre = cat.includes('hombre');
    const isMujer = cat.includes('mujer') || cat.includes('girl');
    
    let themeClass = "bg-background";
    let accentClass = "bg-primary";
    
    if (isHombre) {
        themeClass = "bg-black";
        accentClass = "bg-primary";
    } else if (isMujer) {
        themeClass = "bg-rose-50";
        accentClass = "bg-rose-500";
    } else {
        themeClass = "bg-black";
        accentClass = "bg-primary";
    }
    
    const hombreProducts = [
        { id: 101, name: "Hoodie Black Essence", price: "S/145", image: h1, category: "Hoodies" },
        { id: 102, name: "Oversized Tee", price: "S/65", image: h2, category: "T-Shirts" },
        { id: 103, name: "Runner Jacket", price: "S/180", image: h3, category: "Jackets" },
        { id: 104, name: "Urban Backpack", price: "S/115", image: h4, category: "Accessories" },
        { id: 105, name: "Street Backpack", price: "S/130", image: h5, category: "Jackets" },
        { id: 106, name: "Jeans Pants", price: "S/80", image: h6, category: "Pants" },
    ];

    const mujerProducts = [
        { id: 201, name: "Camisa Satin", price: "S/110", image: m1, category: "Tops" },
        { id: 202, name: "Pantalón Tech", price: "S/95", image: m2, category: "Pants" },
        { id: 203, name: "Jacket Void", price: "S/180", image: m3, category: "Outerwear" },
        { id: 204, name: "Short Running", price: "S/70", image: m4, category: "Shorts" },
        { id: 205, name: "Conjunto completo", price: "S/125", image: m5, category: "Tops" },
        { id: 206, name: "Polera Gris", price: "S/100", image: m6, category: "Jackets" },
        { id: 207, name: "Polera Rosa", price: "S/100", image: m7, category: "Jackets" },
        { id: 208, name: "Jeans", price: "S/90", image: m8, category: "Pants" },
        { id: 209, name: "Polera Negro", price: "S/100", image: m9, category: "Jackets" },
    ];

    const products = isHombre
        ? hombreProducts
        : isMujer
        ? mujerProducts
        : [...hombreProducts, ...mujerProducts, ...defaultProducts]; // All products for Tienda

    // State for filtering and sorting
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [sortOption, setSortOption] = useState("relevance");
    const sortBtnRef = useRef<HTMLButtonElement | null>(null);
    const [quickView, setQuickView] = useState<{
        id: number;
        name: string;
        price: string;
        image: string | StaticImageData;
        stock?: number;
    } | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortBtnRef.current && !sortBtnRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get unique categories
    const categories = ["Todos", ...Array.from(new Set(products.map(p => p.category)))];

    // Filter and Sort Logic
    const filteredProducts = products
        .filter(p => selectedCategory === "Todos" || p.category === selectedCategory)
        .sort((a, b) => {
            const getPrice = (p: string) => parseFloat(p.replace("S/", "").trim());
            const priceA = getPrice(a.price);
            const priceB = getPrice(b.price);
            
            switch (sortOption) {
                case "price-asc": return priceA - priceB;
                case "price-desc": return priceB - priceA;
                case "name-asc": return a.name.localeCompare(b.name);
                case "name-desc": return b.name.localeCompare(a.name);
                default: return 0;
            }
        });

    return (
        <div className={`relative min-h-screen ${isMujer ? "bg-white text-slate-900" : "bg-[#020202] text-white"} overflow-hidden`}>
            <style dangerouslySetInnerHTML={{ __html: `
   /* --- EFECTOS PARA HOMBRE (Circuit + Comets) --- */
   @keyframes circuitPulse {
     0%, 100% { opacity: 0.1; }
     50% { opacity: 0.3; }
   }
   .circuit-grid {
     background-image:
       linear-gradient(rgba(47, 255, 0, 0.1) 1px, transparent 1px),
       linear-gradient(90deg, rgba(47, 255, 0, 0.1) 1px, transparent 1px);
     background-size: 40px 40px;
     animation: circuitPulse 4s ease-in-out infinite;
   }
   @keyframes cometMove {
     0% { transform: translate(-100%, -100%) rotate(45deg); opacity: 0; }
     10% { opacity: 1; }
     100% { transform: translate(200%, 200%) rotate(45deg); opacity: 0; }
   }
   .comet {
     position: absolute;
     width: 2px;
     height: 100px;
     background: linear-gradient(to bottom, rgba(47, 255, 0, 0.8), transparent);
     animation: cometMove 3s linear infinite;
   }

   /* --- EFECTOS PARA MUJER (Aurora + Liquid + Hologram) --- */
   @keyframes auroraFlow {
     0% { background-position: 0% 50%; }
     50% { background-position: 100% 50%; }
     100% { background-position: 0% 50%; }
   }
   .aurora-shader {
     background: linear-gradient(-45deg, ${isMujer ? "#ffffff, #ffcce0, #ccfbf1, #f3e8ff" : "#000000, #1a0b2e, #0f2a1f, #050505"});
     background-size: 400% 400%;
     animation: auroraFlow 15s ease infinite;
   }
   .hologram-shine {
     background: linear-gradient(105deg, transparent 40%, ${isMujer ? "rgba(255, 182, 193, 0.4) 45%, rgba(255, 105, 180, 0.5)" : "rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1)"} 50%, transparent 60%);
     background-size: 200% 100%;
     animation: auroraFlow 7s linear infinite;
   }
   .liquid-distort {
     filter: url(#goo);
     backdrop-filter: blur(40px);
   }
 ` }} />

            {/* CAPA DE EFECTOS UNIFICADA */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {isHombre ? (
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 circuit-grid" />
                        <div className="comet" style={{ left: '20%', animationDelay: '0s' }} />
                        <div className="comet" style={{ left: '50%', animationDelay: '1.5s' }} />
                        <div className="comet" style={{ left: '80%', animationDelay: '0.5s' }} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(47,255,0,0.15)_100%)]" />
                    </div>
                ) : (
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 aurora-shader opacity-70" />
                        <div className="absolute inset-0 hologram-shine opacity-30" />
                        <div className="absolute inset-0 backdrop-blur-[50px] mix-blend-overlay" />
                    </div>
                )}
            </div>

            {/* CONTENIDO PRINCIPAL (Z-10 para estar sobre el fondo) */}
            <div className="relative z-10">
                <div className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                    <Image
                        src={
                            isHombre 
                                ? "/images/631cf1106153511.5f8936068499e.gif" 
                                : isMujer 
                                    ? "/images/67ab8e7176bac7bbc6c8427645f0ba1e.gif" 
                                    : "/images/e324e56f50d63422474d6fb5c0fb39ad.gif"
                        }
                        alt={title}
                        fill
                        className="object-cover opacity-60"
                        unoptimized
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isMujer ? "from-white" : "from-[#020202]"} via-transparent to-transparent`} />
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="relative text-6xl md:text-9xl font-black italic tracking-tighter"
                    >
                        {title}
                    </motion.h1>
                </div>

            {/* SVG Filter para Liquid Distortion (Opcional pero recomendado) */}
                
            <div className="container mx-auto px-4 pt-7 pb-20">
                {/* Filters & Sorting */}
                <div className="relative mt-6 mb-10 z-40">
                    <div className={`relative z-50 flex flex-col md:flex-row justify-between items-center gap-4 ${isHombre ? 'bg-slate-900/80 border-slate-800' : isMujer ? 'bg-white/80 border-rose-100' : 'bg-background/80 border-border/50'} backdrop-blur-md p-4 rounded-xl border`}>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className={`gap-2 ${isHombre ? 'text-white border-slate-700 hover:bg-slate-800' : isMujer ? 'text-stone-800 border-rose-200 hover:bg-rose-50 hover:text-rose-600' : ''}`}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter className="w-4 h-4" /> Filtros
                            </Button>
                            <span className={`text-sm ${isHombre ? 'text-slate-400' : isMujer ? 'text-stone-500' : 'text-muted-foreground'}`}>{filteredProducts.length} Productos</span>
                            
                            {/* Selected Category Badge (Mobile/Desktop) */}
                            {selectedCategory !== "Todos" && (
                                <span className={`text-xs px-2 py-1 rounded-full border ${isHombre ? 'border-primary text-primary' : isMujer ? 'border-rose-400 text-rose-500' : 'border-primary text-primary'}`}>
                                    {selectedCategory}
                                </span>
                            )}
                        </div>
                        
                        <div className={`relative flex items-center gap-2 ${isHombre ? 'text-slate-300' : isMujer ? 'text-stone-600' : ''}`}>
                            <span className="text-sm">Ordenar por:</span>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`gap-2 ${isHombre ? 'text-white hover:bg-slate-800' : isMujer ? 'text-stone-800 hover:bg-rose-50 hover:text-rose-600' : ''}`}
                                ref={sortBtnRef}
                                onClick={() => setIsSortOpen((v) => !v)}
                            >
                                {sortOption === "relevance" && "Relevancia"}
                                {sortOption === "price-asc" && "Precio: Menor a Mayor"}
                                {sortOption === "price-desc" && "Precio: Mayor a Menor"}
                                {sortOption === "name-asc" && "A - Z"}
                                {sortOption === "name-desc" && "Z - A"}
                                <ChevronDown className="w-4 h-4" />
                            </Button>

                            {/* Sort Dropdown */}
                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className={`absolute right-0 top-full mt-3 z-[60] w-64 p-2 rounded-2xl border shadow-2xl backdrop-blur-xl
                                            ${isHombre ?
                                                'bg-slate-900/95 border-slate-700 text-white' 
                                                : isMujer 
                                                ? 'bg-white/95 border-rose-100 text-rose-800' 
                                                : 'bg-background/95 border-border'}`}
                                    >
                                        <div className="py-1 px-2 mb-2 border-b border-white/10">
                                                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Opciones de orden</p>
                                        </div>
                                        {[
                                            { label: "Relevancia", value: "relevance" },
                                            { label: "Precio: Menor a Mayor", value: "price-asc" },
                                            { label: "Precio: Mayor a Menor", value: "price-desc" },
                                            { label: "A - Z", value: "name-asc" },
                                            { label: "Z - A", value: "name-desc" },
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setSortOption(opt.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between group ${
                                                    sortOption === opt.value
                                                        ? (isHombre ? 'bg-slate-800 text-white' : isMujer ? 'bg-rose-50 text-rose-600' : 'bg-primary/10 text-primary')
                                                        : (isHombre ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : isMujer ? 'text-stone-600 hover:bg-rose-50 hover:text-rose-600' : 'text-muted-foreground hover:bg-secondary')
                                                }`}
                                            >
                                                {opt.label}
                                                {sortOption === opt.value && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Filter Panel (Categories) */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="relative z-30 overflow-hidden"
                            >
                                <div className={`mt-2 p-4 rounded-xl border ${isHombre ? 'bg-slate-900/50 border-slate-800' : isMujer ? 'bg-white/50 border-rose-100' : 'bg-background/50 border-border/50'} backdrop-blur-md`}>
                                    <h4 className={`text-sm font-bold mb-3 uppercase tracking-wider ${isHombre ? 'text-slate-400' : isMujer ? 'text-stone-500' : 'text-muted-foreground'}`}>Categorías</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                    selectedCategory === cat
                                                        ? (isHombre ? 'bg-primary text-black shadow-lg shadow-primary/30' : isMujer ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-primary text-primary-foreground')
                                                        : (isHombre ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : isMujer ? 'bg-white border border-rose-100 text-stone-600 hover:border-rose-300' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: index * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                            viewport={{ once: true }}
                            className={`relative hover:drop-shadow-[0_0_12px_rgba(47,255,0,0.2)] ${isMujer ? "liquid-hover" : ""}`}
                        >
                            <ProductFlipCard
                                product={product as { id: number; name: string; price: string; image: string | StaticImageData }}
                                accentClass={accentClass}
                                cardClassName={isMujer ? "bg-rose-50 border-rose-100" : undefined}
                                onAddToCart={(p) =>
                                    addToCart({
                                        id: p.id,
                                        name: p.name,
                                        price: p.price,
                                        image: typeof p.image === "string" ? p.image : p.image.src,
                                    })
                                }
                                onQuickView={(p) => setQuickView(p)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            </div>
            {/* Quick View Drawer */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: quickView ? 0 : "100%" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className={`fixed top-0 right-0 h-screen w-[90vw] sm:w-[420px] z-[80] border-l shadow-[0_0_40px_rgba(47,255,0,0.25)] ${
                    isHombre ? "bg-slate-900 text-white border-slate-800" : isMujer ? "bg-white text-stone-800 border-rose-100" : "bg-black/90 text-white border-primary/30"
                }`}
            >
                {quickView && (
                    <div className="flex flex-col h-full">
                        <div className={`flex items-center justify-between p-4 border-b ${isHombre ? "border-slate-800" : isMujer ? "border-rose-100" : "border-primary/20"}`}>
                            <h3 className="font-black uppercase tracking-widest">{quickView.name}</h3>
                            <Button variant="ghost" size="icon" onClick={() => setQuickView(null)}>
                                ✕
                            </Button>
                        </div>
                        <div className="p-4 flex-1 overflow-auto space-y-4">
                            <div className={`relative aspect-square overflow-hidden border rounded-none ${isHombre ? "border-slate-800" : isMujer ? "border-rose-100" : "border-border"}`}>
                                <Image src={typeof quickView.image === "string" ? quickView.image : quickView.image} alt={quickView.name} fill className="object-cover" />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className={`${isMujer ? "text-stone-500" : "text-muted-foreground"} uppercase text-xs`}>Precio</span>
                                <span className={`${isHombre ? "text-primary" : isMujer ? "text-rose-600" : "text-primary"} font-black`}>{quickView.price}</span>
                            </div>
                            {typeof quickView.stock === "number" && (
                                <div>
                                    <div className={`h-2 ${isMujer ? "bg-rose-100" : isHombre ? "bg-slate-800" : "bg-border"}`}>
                                        <div
                                            className={`h-full ${isHombre ? "bg-primary" : isMujer ? "bg-rose-500" : "bg-primary"}`}
                                            style={{ width: `${Math.max(0, Math.min(100, quickView.stock))}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-bold mt-1 inline-block">
                                        Stock {quickView.stock}% {quickView.stock < 20 ? "• Bajo" : quickView.stock < 50 ? "• Medio" : "• Alto"}
                                    </span>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                <Button className={`${accentClass} text-white`} onClick={() => addToCart({
                                    id: quickView.id,
                                    name: quickView.name,
                                    price: quickView.price,
                                    image: typeof quickView.image === "string" ? quickView.image : quickView.image.src,
                                })}>Añadir al carrito</Button>
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
        </div>
    );
}
