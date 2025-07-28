'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useUserStore } from '@/stores/userStore'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, logout } = useUserStore()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/products', label: 'Shop', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ) },
    { href: '/build-box', label: 'Build Your Box', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ) },
    { href: '/faq', label: 'Help', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) },
  ]

  const authenticatedLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ) },
    { href: '/referrals', label: 'Referrals', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ) },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-brand-neutral-200/20' 
          : 'bg-white/80 backdrop-blur-md shadow-sm'
      }`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-coral to-brand-teal rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c1.1 0 2 .9 2 2 0 .38-.1.73-.29 1.03L17 8.5V10c0 .55-.45 1-1 1s-1-.45-1-1V9l-1.71-2.97c-.4.26-.87.47-1.29.47s-.89-.21-1.29-.47L8 9v1c0 .55-.45 1-1 1s-1-.45-1-1V8.5l3.29-3.47C9.1 4.73 9 4.38 9 4c0-1.1.9-2 2-2zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-6 6h12c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-coral rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-brand-coral to-brand-teal bg-clip-text text-transparent">
                  CatBox
                </span>
                <span className="text-xs text-brand-neutral-500 font-medium -mt-1">
                  Premium Pet Care
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-brand-coral/5"
                >
                  <div className="flex items-center space-x-2">
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-brand-neutral-700 font-medium group-hover:text-brand-coral transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-coral group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </Link>
              ))}
              
              {isAuthenticated && authenticatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-brand-teal/5"
                >
                  <div className="flex items-center space-x-2">
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-brand-neutral-700 font-medium group-hover:text-brand-teal transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-teal group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-brand-beige-dark rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-coral to-brand-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                      U
                    </div>
                    <span className="text-sm font-medium text-brand-neutral-700">Welcome back!</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout} className="border-brand-neutral-300 hover:border-brand-coral">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-brand-neutral-600 hover:text-brand-coral hover:bg-brand-coral/5">
                    Sign In
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-brand-coral to-brand-coral-dark hover:from-brand-coral-dark hover:to-brand-coral shadow-lg hover:shadow-xl">
                    Get Started Free
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 rounded-lg bg-brand-neutral-100 hover:bg-brand-neutral-200 transition-colors flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-brand-neutral-700 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-2'
                }`}></span>
                <span className={`absolute block h-0.5 w-6 bg-brand-neutral-700 transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'top-3'
                }`}></span>
                <span className={`absolute block h-0.5 w-6 bg-brand-neutral-700 transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-4'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-brand-neutral-200/20"
            >
              <div className="container mx-auto py-6 space-y-1">
                {[...navLinks, ...(isAuthenticated ? authenticatedLinks : [])].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-brand-coral/5 transition-colors group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-brand-neutral-700 font-medium group-hover:text-brand-coral transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
                
                <div className="pt-4 mt-4 border-t border-brand-neutral-200 space-y-3">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-4 py-3 bg-brand-beige-dark rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-brand-coral to-brand-teal rounded-full flex items-center justify-center text-white font-bold">
                          U
                        </div>
                        <div>
                          <p className="font-medium text-brand-neutral-800">Welcome back!</p>
                          <p className="text-sm text-brand-neutral-500">Manage your account</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={logout} className="w-full">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In to Your Account
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-brand-coral to-brand-coral-dark">
                        Get Started Free
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  )
}