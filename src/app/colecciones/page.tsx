"use client";

import ProductFlipCard from "@/components/ui/ProductFlipCard";
import { useCart } from "@/context/CartContext";

// Products copied from BestSellersSlider for grid view
const products = [
    { id: 1, name: "Street Green – Medias", price: "S/30.00", image: "/images/images.jpg", badge: "3 medias x S/60" },
    { id: 2, name: "Coller – Billetera", price: "S/75.00", image: "/images/s-l1200.jpg", badge: "Protección Antirrobo" },
    { id: 3, name: "Black Cream – Billetera", price: "S/75.00", image: "/images/s-l1200.jpg", badge: "Protección Antirrobo" },
    { id: 4, name: "Cat Skull – Mochila", price: "S/115.00", image: "/images/80bd84a93883168e7ba8adaa64dbce58.jpg" },
    { id: 5, name: "Urban Tech Hoodie", price: "S/145.00", image: "/images/EV54HCM123.webp" },
];

export default function CollectionsPage() {
    const { addToCart } = useCart();

    return (
        <div className="pt-24 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-black italic tracking-tighter mb-8 text-center">COLECCIONES</h1>
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">GEDA UNLIMITED 2024</h2>
                    <p className="max-w-2xl text-muted-foreground mb-8">
                        Nuestra colección más ambiciosa hasta la fecha. Fusionando tecnología y estilo urbano.
                    </p>
                    
                    {/* Grid Layout */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((p) => (
                            <div key={p.id} className="relative">
                                <ProductFlipCard
                                    product={p}
                                    accentClass="bg-primary"
                                    onAddToCart={(prod) => addToCart({ ...prod, image: typeof prod.image === 'string' ? prod.image : prod.image.src })}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
