"use client";

import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import Image from "next/image";

// --- Tipos y Constantes ---

const IMAGES_POOL = [
    "/images/33b1fc52945e5d3c5e22c003c2fe2a03.jpg",
    "/images/5d60fac6e2a6244b70ea34dc26ed0106.jpg",
    "/images/687AB42F84C08-Polera-Deportiva-Hombre-M-Bl-Sj-Hd.webp",
    "/images/80bd84a93883168e7ba8adaa64dbce58.jpg",
    "/images/8205969a6bc049665bd547423dddc774.jpg",
    "/images/EV54HCM123.webp",
    "/images/EV54NCM131.webp",
    "/images/HB0575_2.webp",
    "/images/HSD3824-NEGRO-web-1-irun-tienda-online-deporte-las-mejores-zapatillas-accesorios-deportivos-hombre-mujer-ninos-futbol-deporte-promocion-peru-compra-ahora.jpg",
    "/images/H_003.jpg",
    "/images/MD273799.jpg",
    "/images/Untitled_design_1-835478.jpg",
    "/images/YAM-003-GRIS-VERDE-web-0-irun-tienda-online-deporte-las-mejores-zapatillas-accesorios-deportivos-hombre-mujer-ninos-futbol-deporte-promocion-peru-compra-ahora.jpg",
    "/images/business-navy-blue-suit-and-chunky-loafers-1.jpg",
    "/images/casaca-running-icon-ls-1-2-zip-hombre-performance-black.jpg",
    "/images/foto 1.jpeg",
    "/images/foto 2.jpeg",
    "/images/foto 3.jpeg",
    "/images/foto 4.jpeg",
    "/images/foto 5.jpeg",
];

const DEFAULTS = {
    maxVerticalRotationDeg: 24,
    dragSensitivity: 20,
    enlargeTransitionMs: 600,
    segments: 25,
    dragDampening: 2
};

// --- Helpers de Cálculo ---
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function buildItems(pool: string[], seg: number) {
    const xCols = Array.from({ length: seg }, (_, i) => -Math.floor(seg / 2) + i);
    const ys = [-2, -1, 0, 1, 2]; // Filas verticales
    const coords = xCols.flatMap((x, c) => {
        const rowShift = c % 2 === 0 ? ys : ys.map(y => y + 0.5);
        return rowShift.map(y => ({ x, y, sizeX: 1.8, sizeY: 1.8 }));
    });

    return coords.map((c, i) => ({
        ...c,
        src: pool[i % pool.length],
        alt: `Geda Image ${i}`
    }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
    const unit = 360 / segments;
    const rotateY = unit * (offsetX + (sizeX - 1) / 2);
    const rotateX = unit * (offsetY - (sizeY - 1) / 2);
    return { rotateX, rotateY };
}

// --- Componente Principal ---
export default function DomeGallery() {
    const rootRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);

    const rotationRef = useRef({ x: 0, y: 0 });
    const inertiaRAF = useRef<number | null>(null);
    const openingRef = useRef(false);

    const [isMounted] = useState(true);

    const items = useMemo(() => buildItems(IMAGES_POOL, DEFAULTS.segments), []);

    const applyTransform = useCallback((xDeg: number, yDeg: number) => {
        if (sphereRef.current) {
            sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        }
    }, []);

    // Responsividad del Radio
    useEffect(() => {
        if (!isMounted || !rootRef.current) return;
        const ro = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            const isMobile = width < 640;
            const radius = isMobile
                ? Math.min(width * 0.65, height * 0.85, 420)
                : Math.min(width * 0.8, height * 1.2, 800);
            rootRef.current?.style.setProperty('--radius', `${radius}px`);
        });
        ro.observe(rootRef.current);
        return () => ro.disconnect();
    }, [isMounted]);

    // Rotación inicial para mostrar forma de planeta sin necesidad de clic
    useEffect(() => {
        rotationRef.current = { x: -6, y: 28 };
        applyTransform(rotationRef.current.x, rotationRef.current.y);
    }, [applyTransform]);

    // Lógica de Inercia
    const startInertia = useCallback((vx: number, vy: number) => {
        let vX = vx * 50;
        let vY = vy * 50;
        const step = () => {
            vX *= 0.95;
            vY *= 0.95;
            if (Math.abs(vX) < 0.01 && Math.abs(vY) < 0.01) return;
            
            const nextX = clamp(rotationRef.current.x - vY / 15, -DEFAULTS.maxVerticalRotationDeg, DEFAULTS.maxVerticalRotationDeg);
            const nextY = rotationRef.current.y + vX / 15;
            
            rotationRef.current = { x: nextX, y: nextY };
            applyTransform(nextX, nextY);
            inertiaRAF.current = requestAnimationFrame(step);
        };
        inertiaRAF.current = requestAnimationFrame(step);
    }, [applyTransform]);

    // Gestos
    useGesture(
        {
            onDrag: ({ delta: [dx, dy], velocity: [vx, vy], direction: [dirX, dirY], last }) => {
                if (openingRef.current) return;
                if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current);

                const nextX = clamp(rotationRef.current.x - dy / DEFAULTS.dragSensitivity, -DEFAULTS.maxVerticalRotationDeg, DEFAULTS.maxVerticalRotationDeg);
                const nextY = rotationRef.current.y + dx / DEFAULTS.dragSensitivity;

                rotationRef.current = { x: nextX, y: nextY };
                applyTransform(nextX, nextY);

                if (last) {
                    startInertia(vx * dirX, vy * dirY);
                }
            }
        },
        { target: mainRef, eventOptions: { passive: false } }
    );

    // Zoom deshabilitado para navegación sin clic

    if (!isMounted) return <div className="h-[500px] md:h-[800px] bg-black" />;

    return (
        <section ref={rootRef} className="sphere-root relative w-full h-[460px] md:h-[800px] bg-black overflow-hidden select-none flex flex-col">
            <style dangerouslySetInnerHTML={{ __html: `
                .sphere-root {
                    --radius: 600px;
                    --segments-x: ${DEFAULTS.segments};
                    --segments-y: ${DEFAULTS.segments};
                    --unit-y: calc(360deg / var(--segments-x));
                    --unit-x: calc(360deg / var(--segments-y));
                }
                .stage {
                    perspective: 1200px;
                    width: 100%; height: 100%;
                    display: grid; place-items: center;
                }
                .sphere {
                    position: relative;
                    transform-style: preserve-3d;
                    will-change: transform;
                }
                .sphere-item {
                    position: absolute;
                    width: 160px; height: 160px;
                    margin-left: -80px; margin-top: -80px;
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                }
                @media (max-width: 640px) {
                    .sphere-item {
                        width: 96px; height: 96px;
                        margin-left: -48px; margin-top: -48px;
                    }
                    .stage { perspective: 800px; }
                }
            `}} />

            {/* Header UI - Moved relative for mobile layout */}
            <div className="relative z-10 text-center py-4 md:py-8 bg-black/50 backdrop-blur-sm">
                <h2 className="text-2xl md:text-6xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    Explora el <span className="text-primary drop-shadow-[0_0_15px_rgba(47,255,0,0.8)]">Universo Geda</span>
                </h2>
                <p className="text-primary/70 mt-1 md:mt-2 uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-bold">
                    Arrastra para navegar
                </p>
            </div>

            <main ref={mainRef} className="stage touch-none flex-1 relative">
                <div ref={sphereRef} className="sphere">
                    {items.map((it, i) => {
                        const { rotateX, rotateY } = computeItemBaseRotation(it.x, it.y, it.sizeX, it.sizeY, DEFAULTS.segments);
                        return (
                            <div 
                                key={i}
                                className="sphere-item"
                                style={{
                                    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(var(--radius))`
                                }}
                            >
                                <div 
                                    className="w-full h-full rounded-none overflow-hidden border border-white/10 bg-white/5 hover:border-white/40 transition-colors group"
                                >
                                    <div className="relative w-full h-full">
                                        <Image 
                                            src={it.src} 
                                            alt={it.alt || `Geda Image ${i}`}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
            
            {/* Gradientes de profundidad */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />
        </section>
    );
}
