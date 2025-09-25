"use client"

import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/constants"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Exclusive</h3>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Subscribe</h4>
              <p className="text-gray-300 text-sm">Get 10% off your first order</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-[-36px] py-2 bg-transparent border border-gray-600 rounded-l focus:outline-none focus:border-white text-white text-sm placeholder-gray-400"
                />
                <button className="px-2 py-2 border border-gray-600 border-l-0 rounded-r hover:bg-gray-800 transition-colors">
                  <Icons.send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <div className="space-y-4 text-sm text-gray-300">
              <p>
                11 Alausa, Ikeja,
                <br />
                Lagos, Nigeria.
              </p>
              <p>exclusive@gmail.com</p>
              <p>+234-903-345-5128</p>
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Account</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.account.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Link Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Link</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLink.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Download App</h4>
            <div className="space-y-4">
              <p className="text-xs text-gray-400">Save $3 with App New User Only</p>
              <div className="flex space-x-2">
                
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded px-3 py-1 text-xs flex items-center space-x-2">
                    <div>
                      <div className="text-xs">GET IT ON</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded px-3 py-1 text-xs flex items-center space-x-2">
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = Icons[social.icon as keyof typeof Icons]
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">© Copyright Exclusive 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}
