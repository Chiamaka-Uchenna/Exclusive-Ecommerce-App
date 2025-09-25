"use client"

export default function TopBanner() {
  return (
    <div className="bg-black text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex-1" />
        <div className="text-center">
          <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
          <button className="underline font-semibold ml-2 hover:text-gray-300 transition-colors">ShopNow</button>
        </div>
        <div className="flex-1 flex justify-end">
          <select className="bg-transparent text-white border-none outline-none cursor-pointer">
            <option value="en" className="text-black">
              English
            </option>
            <option value="es" className="text-black">
              Español
            </option>
            <option value="fr" className="text-black">
              Français
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}
