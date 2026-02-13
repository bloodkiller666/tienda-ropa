"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const RevealText = ({ text, className, delay = 0 }: RevealTextProps) => {
    return (
        <div className={cn("relative overflow-hidden inline-block", className)}>
            <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                    delay: delay
                }}
                viewport={{ once: true }}
                className="block"
            >
                {text}
            </motion.span>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 0 }}
                animate={{
                    scaleX: [0, 1, 0],
                    originX: [0, 0, 1]
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: delay
                }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-primary z-10"
            />
        </div>
    );
};
