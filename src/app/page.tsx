import Hero from "@/components/home/Hero";
import HomeGridCategories from "@/components/home/HomeGridCategories";
import DomeGallery from "@/components/home/DomeGallery";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Hero />
      <HomeGridCategories />
      <DomeGallery />
      <FeaturedProducts />
    </div>
  );
}
