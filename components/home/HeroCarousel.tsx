'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    image: 'https://placekitten.com/1200/600',
    title: 'Premium Cat Care Delivered Monthly',
    subtitle: 'Curated litter and food boxes tailored for your feline friend',
    cta: 'Build Your Box',
    ctaLink: '/build-box',
  },
  {
    id: 2,
    image: 'https://placekitten.com/1201/600',
    title: 'Save 15% on Every Delivery',
    subtitle: 'Subscribe and never run out of essentials again',
    cta: 'Shop Now',
    ctaLink: '/products',
  },
  {
    id: 3,
    image: 'https://placekitten.com/1202/600',
    title: 'Refer Friends, Earn Rewards',
    subtitle: 'Get $10 off for every friend who subscribes',
    cta: 'Learn More',
    ctaLink: '/referrals',
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  return (
    <div 
      className="relative h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl text-white"
              >
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-white/90">
                  {slides[currentSlide].subtitle}
                </p>
                <Link href={slides[currentSlide].ctaLink}>
                  <Button size="lg" className="shadow-xl">
                    {slides[currentSlide].cta}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}