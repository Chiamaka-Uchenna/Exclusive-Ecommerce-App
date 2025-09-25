import { Icons } from "@/components/ui/icons"

const features = [
  {
    icon: "truck",
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: "headphones",
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: "shield",
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
]

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
                <Icons.headphones className="w-6 h-6 text-white dark:text-black" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
