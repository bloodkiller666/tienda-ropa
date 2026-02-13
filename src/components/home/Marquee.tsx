"use client";

import { motion } from "framer-motion";

const Marquee = () => {
    return (
        <div className="fixed top-0 inset-x-0 z-40 bg-primary overflow-hidden py-2 h-[30px] flex items-center shadow-[0_0_15px_rgba(47,255,0,0.5)] border-b border-black/10">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                    className="flex gap-8 items-center"
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="text-black font-black text-sm md:text-base tracking-widest uppercase flex items-center gap-8">
                            📦Nueva Colección Disponible Now📦 <span className="w-2 h-2 bg-black rounded-full" />
                            🚚Envío a Toda la Capital🚚 <span className="w-2 h-2 bg-black rounded-full" />
                            ⭐Edición Limitada⭐ <span className="w-2 h-2 bg-black rounded-full" />
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;
