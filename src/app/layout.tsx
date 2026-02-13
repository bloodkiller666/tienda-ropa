import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/home/Marquee";
import "./globals.css";
import { cn } from "@/lib/utils";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import PromoModal from "@/components/ui/PromoModal";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GEDA UNLIMITED | Exclusive Streetwear",
  description: "Premium streetwear with striking effects.",
};

import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/ui/CartModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground",
          outfit.variable
        )}
      >
        <CartProvider>
          <div
            className="pointer-events-none fixed inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1200px 600px at 50% -200px, rgba(30,30,30,0.6), transparent 70%), radial-gradient(900px 400px at 10% 10%, rgba(60,60,60,0.35), transparent 60%), radial-gradient(1200px 600px at 90% 20%, rgba(40,40,40,0.4), transparent 65%)",
            }}
          />
          <Marquee />
          <Navbar />
          <PromoModal />
          <CartModal />
          <main className="flex-grow min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
