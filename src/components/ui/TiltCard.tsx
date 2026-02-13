"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export const TiltCard = ({ 
    children, 
    className = "",
    glowColor = "#2fff00" 
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const touch = e.touches[0];
        if (!touch) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const tX = touch.clientX - rect.left;
        const tY = touch.clientY - rect.top;
        const xPct = tX / width - 0.5;
        const yPct = tY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleTouchEnd = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="h-full w-full relative"
            >
                {children}
                
                {/* Holographic/Glow Effect Layer */}
                <div 
                    className="absolute inset-0 rounded-none opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-50"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${glowColor}20 0%, transparent 70%)`,
                        boxShadow: `inset 0 0 20px ${glowColor}40`,
                    }}
                />
            </div>
        </motion.div>
    );
};
