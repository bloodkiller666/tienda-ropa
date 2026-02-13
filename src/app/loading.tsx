 export default function Loading() {
   return (
     <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[1000]">
       <div className="flex flex-col items-center gap-3">
         <div className="w-10 h-10 border-2 border-black border-t-primary rounded-full animate-spin" />
         <span className="text-xs font-black uppercase tracking-widest text-black/70">Cargando...</span>
       </div>
     </div>
   );
 }
