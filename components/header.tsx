"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X, Home, Users, Settings, Phone, FileText, Shield } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSidebarOpen, isMobile])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About us", icon: Users },
    { href: "/services", label: "Our Services", icon: Settings },
    { href: "/contact", label: "Contact us", icon: Phone },
    { href: "/terms", label: "Terms of Service", icon: FileText },
    { href: "/privacy", label: "Privacy Policy", icon: Shield },
  ]

  return (
    <>
      <header className="px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between border-b bg-white sticky top-0 z-50 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/driwe-logo.svg"
            alt="DriWE Logo"
            width={isMobile ? 100 : 120}
            height={isMobile ? 32 : 40}
            className="h-6 w-auto sm:h-8 md:h-10"
          />
        </Link>

        {/* Menu Button - Enhanced for mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 sm:p-3 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 rounded-lg border border-transparent hover:border-yellow-200 active:scale-95"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </header>

      {/* Sidebar Overlay - Enhanced for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile optimized with yellow theme */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <Image
            src="/images/driwe-logo.svg"
            alt="DriWE Logo"
            width={isMobile ? 100 : 120}
            height={isMobile ? 32 : 40}
            className="h-8 w-auto sm:h-10"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg active:scale-95"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu - Mobile optimized with yellow theme */}
        <nav className="p-3 sm:p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="space-y-1 sm:space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "text-black hover:bg-yellow-50 hover:text-yellow-600"
                  }`}
                  style={isActive ? { backgroundColor: "#fcd129", color: "#000" } : {}}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-yellow-600 rounded-full"></div>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Footer - Mobile optimized with yellow theme */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500 mb-3">Ready to ride?</p>
            <Button
              className="w-full text-white py-2.5 sm:py-3 text-sm sm:text-base active:scale-95 transition-transform"
              style={{ backgroundColor: "#fcd129", color: "#000" }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
