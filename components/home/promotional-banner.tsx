"use client"

import Image from "next/image"
import Link from "next/link"

export default function PromotionalBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-black rounded-lg overflow-hidden relative h-96 lg:h-[500px]">
        <div className="absolute inset-0 flex items-center justify-between px-8 lg:px-16">
          <div className="text-white z-10 max-w-md">
            <p className="text-green-400 font-semibold mb-4">Categories</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Enhance Your
              <br />
              Music Experience
            </h2>
            <div className="flex space-x-4 mb-8">
              <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-sm font-bold">23</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-sm font-bold">05</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-sm font-bold">59</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                <div className="text-sm font-bold">35</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>
            <Link
              href="/products/category/headphones"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded transition-colors duration-200 inline-block"
            >
              Buy Now!
            </Link>
          </div>
          <div className="relative w-64 h-64 lg:w-96 lg:h-96">
            <Image src="/wireless-headphones.png" alt="Wireless Headphones" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
