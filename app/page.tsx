import HeroSection from "@/components/home/hero-section"
import FlashSales from "@/components/home/flash-sales"
import CategoriesSection from "@/components/home/categories-section"
import BestSelling from "@/components/home/best-selling"
import PromotionalBanner from "@/components/home/promotional-banner"
import ExploreProducts from "@/components/home/explore-products"
import NewArrival from "@/components/home/new-arrival"
import FeaturesSection from "@/components/home/features-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection />
      <FlashSales />
      <CategoriesSection />
      <BestSelling />
      <PromotionalBanner />
      <ExploreProducts />
      <NewArrival />
      <FeaturesSection />
    </div>
  )
}
