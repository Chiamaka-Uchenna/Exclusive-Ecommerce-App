"use client"

import Image from "next/image"
import Link from "next/link"

const newArrivals = [
  {
    id: 1,
    title: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    image: "/playstation-5-console.png",
    href: "/products/1",
    featured: true,
  },
  {
    id: 2,
    title: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    image: "/fashionable-woman.png",
    href: "/products/category/clothes",
    featured: false,
  },
  {
    id: 3,
    title: "Speakers",
    description: "Amazon wireless speakers",
    image: "/wireless-speakers.jpg",
    href: "/products/category/electronics",
    featured: false,
  },
  {
    id: 4,
    title: "Perfume",
    description: "GUCCI INTENSE OUD EDP",
    image: "/luxury-perfume-bottle.png",
    href: "/products/category/beauty",
    featured: false,
  },
]

export default function NewArrival() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-5 h-10 bg-red-500 rounded" />
        <span className="text-red-500 font-semibold">Featured</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12">New Arrival</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        {/* PlayStation 5 - Large Featured */}
        <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer">
          <Link href={newArrivals[0].href}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image
              src={newArrivals[0].image || "/placeholder.svg"}
              alt={newArrivals[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-8 left-8 text-white z-20">
              <h3 className="text-2xl font-bold mb-2">{newArrivals[0].title}</h3>
              <p className="text-gray-200 mb-4 max-w-xs">{newArrivals[0].description}</p>
              <span className="text-white border-b border-white pb-1 hover:border-gray-300 transition-colors">
                Shop Now
              </span>
            </div>
          </Link>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-rows-2 gap-8">
          {/* Women's Collections */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
            <Link href={newArrivals[1].href}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
              <Image
                src={newArrivals[1].image || "/placeholder.svg"}
                alt={newArrivals[1].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-6 left-6 text-white z-20">
                <h3 className="text-xl font-bold mb-2">{newArrivals[1].title}</h3>
                <p className="text-gray-200 mb-3 text-sm max-w-xs">{newArrivals[1].description}</p>
                <span className="text-white border-b border-white pb-1 hover:border-gray-300 transition-colors text-sm">
                  Shop Now
                </span>
              </div>
            </Link>
          </div>

          {/* Bottom Row - Speakers and Perfume */}
          <div className="grid grid-cols-2 gap-8">
            <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer">
              <Link href={newArrivals[2].href}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={newArrivals[2].image || "/placeholder.svg"}
                  alt={newArrivals[2].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 text-white z-20">
                  <h3 className="font-bold mb-1">{newArrivals[2].title}</h3>
                  <p className="text-gray-200 mb-2 text-xs">{newArrivals[2].description}</p>
                  <span className="text-white border-b border-white pb-1 hover:border-gray-300 transition-colors text-xs">
                    Shop Now
                  </span>
                </div>
              </Link>
            </div>

            <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer">
              <Link href={newArrivals[3].href}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={newArrivals[3].image || "/placeholder.svg"}
                  alt={newArrivals[3].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 text-white z-20">
                  <h3 className="font-bold mb-1">{newArrivals[3].title}</h3>
                  <p className="text-gray-200 mb-2 text-xs">{newArrivals[3].description}</p>
                  <span className="text-white border-b border-white pb-1 hover:border-gray-300 transition-colors text-xs">
                    Shop Now
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
