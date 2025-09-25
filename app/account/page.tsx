"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slices/authSlice"
import { authService } from "@/services/auth"
import Breadcrumb from "@/components/layout/breadcrumb"
import { Icons } from "@/components/ui/icons"
import toast from "react-hot-toast"

export default function AccountPage() {
  const { user, loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    const { error } = await authService.signOut()
    if (error) {
      toast.error(error)
    } else {
      dispatch(logout())
      toast.success("Signed out successfully")
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8" />
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const breadcrumbItems = [{ label: "My Account" }]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Manage My Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-red-500 hover:text-red-600 transition-colors">
                  My Profile
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                  Address Book
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                  My Payment Options
                </a>
              </li>
            </ul>

            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">My Orders</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                  My Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                  My Cancellations
                </a>
              </li>
            </ul>

            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">My WishList</h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Your Profile</h2>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Icons.user className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  value={user.displayName?.split(" ")[0] || ""}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  value={user.displayName?.split(" ").slice(1).join(" ") || ""}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Kingston, 5236, United State"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Password Changes</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors">
                Cancel
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
