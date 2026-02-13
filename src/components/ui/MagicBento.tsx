 "use client";
 
 import React, { useEffect, useRef } from "react";
 import { gsap } from "gsap";
 
 type MagicBentoProps = {
   className?: string;
   children: React.ReactNode;
   textAutoHide?: boolean;
   enableStars?: boolean;
   enableSpotlight?: boolean;
   enableBorderGlow?: boolean;
   disableAnimations?: boolean;
   spotlightRadius?: number;
   particleCount?: number;
   enableTilt?: boolean;
   glowColor?: string; // "r, g, b"
   clickEffect?: boolean;
   enableMagnetism?: boolean;
 };
 
 export function MagicBento({
   className,
   children,
   textAutoHide = true,
   enableStars = true,
   enableSpotlight = true,
   enableBorderGlow = true,
   disableAnimations = false,
   spotlightRadius = 300,
   particleCount = 10,
   enableTilt = true,
   glowColor = "47, 255, 0",
   clickEffect = true,
   enableMagnetism = true,
 }: MagicBentoProps) {
   const ref = useRef<HTMLDivElement | null>(null);
   const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
   const shouldDisable = disableAnimations || isMobile;
 
   useEffect(() => {
     const el = ref.current;
     if (!el) return;
 
     const onMouseMove = (e: MouseEvent) => {
       const rect = el.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
 
       if (enableSpotlight && !shouldDisable) {
         el.style.setProperty("--mx", `${x}px`);
         el.style.setProperty("--my", `${y}px`);
       }
 
       if (enableTilt && !shouldDisable) {
         const cx = rect.width / 2;
         const cy = rect.height / 2;
         const dx = (x - cx) / cx;
         const dy = (y - cy) / cy;
         gsap.to(el, { rotateX: dy * -6, rotateY: dx * 6, transformPerspective: 600, ease: "power2.out", duration: 0.2 });
       }
 
       if (enableBorderGlow && !shouldDisable) {
         const glow = `0 0 24px rgba(${glowColor}, 0.2)`;
         el.style.boxShadow = glow;
       }
     };
 
     const onMouseLeave = () => {
       if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
       if (enableBorderGlow) el.style.boxShadow = "none";
     };
 
     const onMouseEnter = () => {
       if (enableMagnetism && !shouldDisable) {
         gsap.fromTo(el, { y: 0 }, { y: -2, duration: 0.2, ease: "power1.out" });
       }
     };
 
     const onClick = (e: MouseEvent) => {
       if (!clickEffect || shouldDisable) return;
       const rect = el.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
 
       const ripple = document.createElement("span");
       ripple.className = "absolute rounded-full pointer-events-none";
       ripple.style.left = `${x}px`;
       ripple.style.top = `${y}px`;
       ripple.style.width = "12px";
       ripple.style.height = "12px";
       ripple.style.background = `rgba(${glowColor}, 0.35)`;
       el.appendChild(ripple);
       gsap.to(ripple, { scale: spotlightRadius / 12, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
 
       if (enableStars) {
         for (let i = 0; i < particleCount; i++) {
           const p = document.createElement("span");
           p.className = "absolute rounded-full pointer-events-none";
           p.style.left = `${x}px`;
           p.style.top = `${y}px`;
           p.style.width = "3px";
           p.style.height = "3px";
           p.style.background = `rgba(${glowColor}, 0.8)`;
           el.appendChild(p);
           const angle = Math.random() * Math.PI * 2;
           const dist = 40 + Math.random() * 60;
           gsap.to(p, {
             x: Math.cos(angle) * dist,
             y: Math.sin(angle) * dist,
             opacity: 0,
             duration: 0.8,
             ease: "power2.out",
             onComplete: () => p.remove(),
           });
         }
       }
     };
 
     el.addEventListener("mousemove", onMouseMove);
     el.addEventListener("mouseleave", onMouseLeave);
     el.addEventListener("mouseenter", onMouseEnter);
     el.addEventListener("click", onClick);
 
     return () => {
       el.removeEventListener("mousemove", onMouseMove);
       el.removeEventListener("mouseleave", onMouseLeave);
       el.removeEventListener("mouseenter", onMouseEnter);
       el.removeEventListener("click", onClick);
     };
   }, [enableSpotlight, enableTilt, enableBorderGlow, enableMagnetism, clickEffect, enableStars, particleCount, glowColor, spotlightRadius, shouldDisable]);
 
   return (
     <div
       ref={ref}
       className={`relative overflow-hidden rounded-none border border-white/10 bg-white/5 ${textAutoHide ? "group" : ""} ${className ?? ""}`}
       style={
         enableSpotlight && !shouldDisable
           ? ({
               backgroundImage: `radial-gradient(${spotlightRadius}px circle at var(--mx, 50%) var(--my, 50%), rgba(${glowColor}, 0.08), transparent 65%)`,
             } as React.CSSProperties)
           : undefined
       }
     >
       {children}
     </div>
   );
 }
