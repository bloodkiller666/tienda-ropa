 import FeaturedProducts from "@/components/home/FeaturedProducts";
 
 export default function TiendaPage() {
   return (
     <div className="pt-24 min-h-screen">
       <div className="container mx-auto px-4 py-8">
         <h1 className="text-4xl font-black italic tracking-tighter mb-8 text-center">TIENDA</h1> 
         <FeaturedProducts />
       </div>
     </div>
   );
 }
