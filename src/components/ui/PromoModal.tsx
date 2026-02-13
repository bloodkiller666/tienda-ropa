 "use client";
 
 import { useEffect, useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { X } from "lucide-react";
 
 export default function PromoModal() {
   const [open, setOpen] = useState(false);
 
   useEffect(() => {
     const hasSeen = typeof window !== "undefined" && window.sessionStorage.getItem("promo_seen") === "1";
     if (!hasSeen) {
      setTimeout(() => setOpen(true), 0);
       window.sessionStorage.setItem("promo_seen", "1");
     }
   }, []);
 
   return (
     <AnimatePresence>
       {open && (
         <>
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.6 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black z-50"
             onClick={() => setOpen(false)}
           />
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ duration: 0.25 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4"
           >
             <div className="bg-white text-black rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
               <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
                 <span className="text-sm font-black uppercase tracking-widest">Promociones</span>
                 <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5" onClick={() => setOpen(false)}>
                   <X className="w-5 h-5" />
                 </button>
               </div>
               <div className="px-6 py-6">
                 <h3 className="text-2xl font-black italic tracking-tighter mb-2">Descuentos exclusivos</h3>
                 <p className="text-sm text-black/70 font-bold uppercase tracking-widest">
                   Aprovecha promociones de temporada en toda la tienda.
                 </p>
               </div>
               <div className="px-6 pb-6">
                 <button className="w-full bg-black text-white rounded-xl h-12 font-black uppercase tracking-widest hover:opacity-90" onClick={() => setOpen(false)}>
                   Entendido
                 </button>
               </div>
             </div>
           </motion.div>
         </>
       )}
     </AnimatePresence>
   );
 }
