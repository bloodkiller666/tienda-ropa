 "use client";
 
 import { useState } from "react";
 import Image, { type StaticImageData } from "next/image";
import { Star, Truck, ShieldCheck, RefreshCcw, Eye, ShoppingBag } from "lucide-react";
 
 type ProductBase = {
   id: number;
   name: string;
   price: string;
   image: string | StaticImageData;
   stock?: number;
 };
 
 import { TiltCard } from "@/components/ui/TiltCard";

export default function ProductFlipCard({
  product,
  accentClass = "bg-primary",
  cardClassName = "bg-secondary",
  onAddToCart,
  onQuickView,
}: {
  product: ProductBase;
  accentClass?: string;
  cardClassName?: string;
  onAddToCart: (p: ProductBase) => void;
  onQuickView?: (p: ProductBase) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgSrc = typeof product.image === "string" ? product.image : product.image.src;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  @keyframes starRain {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
  .star-rain {
    background-image: 
      /* Estrellas pequeñas y brillantes */
      radial-gradient(2px 2px at 10% 10%, #fff, transparent),
      radial-gradient(2px 2px at 30% 20%, #fff, transparent),
      radial-gradient(2px 2px at 50% 40%, #fff, transparent),
      radial-gradient(2px 2px at 70% 10%, #fff, transparent),
      radial-gradient(2px 2px at 90% 30%, #fff, transparent),
      /* Estrellas más grandes (fuga de luz) */
      radial-gradient(3px 3px at 20% 60%, rgba(255,255,255,0.8), transparent),
      radial-gradient(3px 3px at 60% 80%, rgba(255,255,255,0.8), transparent),
      radial-gradient(3px 3px at 85% 50%, rgba(255,255,255,0.8), transparent),
      /* Estrellas extra para densidad */
      radial-gradient(4px 4px at 40% 90%, #fff, transparent),
      radial-gradient(4px 4px at 15% 75%, #fff, transparent);
    
    background-size: 50% 80px;
    animation: starRain 6s linear infinite;
    will-change: background-position;
  }
` }} />
    <TiltCard className="w-full h-full" glowColor={accentClass === "bg-primary" ? "#2fff00" : accentClass.includes("rose") ? "#f43f5e" : "#2563eb"}>
      <div
        className="relative w-full"
        style={{ perspective: "1000px" }}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          className="relative w-full transition-transform duration-500 [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("[data-card-action]")) return;
            setFlipped((v) => !v);
          }}
        >
          {/* Front of card */}
          <div className="relative [backface-visibility:hidden]">
            <div className={`relative aspect-[3/4] overflow-hidden rounded-none shadow-md border border-border ${cardClassName}`}>
              <Image src={imgSrc} alt={product.name} fill className="object-cover" onLoadingComplete={() => setImgLoaded(true)} />
              {!imgLoaded && <div className="skeleton-shimmer" />}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4">
              <h3 className={`font-bold text-sm uppercase truncate ${accentClass.includes("rose") ? "text-black" : "text-white"}`}>{product.name}</h3>
              <p className={`font-black text-sm ${accentClass.includes("rose") ? "text-rose-600" : accentClass === "bg-primary" ? "text-primary" : "text-white"} select-none`}>
                {product.price}</p>
              {typeof product.stock === "number" && (
                <div className="mt-2">
                  <div className="h-1 bg-border rounded-none overflow-hidden">
                    <div
                      className={`h-full ${accentClass}`}
                      style={{ width: `${Math.max(0, Math.min(100, product.stock))}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold mt-1 inline-block">
                    Stock {product.stock}% {product.stock < 20 ? "• Bajo" : product.stock < 50 ? "• Medio" : "• Alto"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 rounded-none [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className={`absolute inset-0 rounded-none bg-black/90 border border-white/10 shadow-2xl select-none`}>
              <div className="absolute inset-0 pointer-events-none star-rain opacity-60" />
              <div className="h-full w-full flex flex-col items-center justify-between p-4 md:p-6 overflow-y-auto">
                <div className="w-full text-center space-y-1 md:space-y-2">
                  <div className="text-[10px] font-mono text-primary tracking-[0.3em]">SYS.ID.{product.id}</div>
                  <h3 className="text-xs md:text-sm font-bold uppercase truncate">{product.name}</h3>
                  <div className="text-base md:text-lg font-black text-primary">{product.price}</div>
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < 4 ? "text-primary" : "text-white/30"}`} />
                    ))}
                    <span className="text-[9px] md:text-[10px] text-muted-foreground ml-1">4.5</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:flex md:items-center md:justify-center gap-3 md:gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs">
                    <Truck className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span>Envío rápido</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs">
                    <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span>Compra segura</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs">
                    <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span>Devolución 7d</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 w-full px-2 md:px-0">
                <button
                  className={`h-9 sm:h-10 md:h-11 rounded-none text-primary-foreground ${accentClass} font-black uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-all shadow-[0_0_16px_rgba(47,255,0,0.25)] active:scale-[0.98] text-[10px] sm:text-xs md:text-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(false);
                    onQuickView?.(product);
                  }}
                  data-card-action
                >
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-2" /> Vista rápida
                </button>
                <button
                  className={`h-9 sm:h-10 md:h-11 rounded-none text-primary-foreground ${accentClass} font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_0_16px_rgba(47,255,0,0.25)] active:scale-[0.98] text-[10px] sm:text-xs md:text-sm flex items-center justify-center`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                    setFlipped(false);
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    for (let i = 0; i < 12; i++) {
                      const p = document.createElement("div");
                      p.className = "particle";
                      const dx = (Math.random() - 0.5) * 120;
                      const dy = -40 - Math.random() * 60;
                      p.style.setProperty("--dx", `${dx}px`);
                      p.style.setProperty("--dy", `${dy}px`);
                      p.style.left = `${rect.left + rect.width / 2}px`;
                      p.style.top = `${rect.top}px`;
                      document.body.appendChild(p);
                      p.addEventListener("animationend", () => p.remove());
                    }
                  }}
                  data-card-action
                >
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-2" /> Comprar
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
    </>
  );
}
 
