'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/ui/Card'

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'New York, NY',
    rating: 5,
    comment: 'CatBox has been a game-changer! My cat Whiskers loves the premium litter, and I love never running out.',
    petName: 'Whiskers',
    image: 'https://placekitten.com/100/100',
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'Los Angeles, CA',
    rating: 5,
    comment: 'The convenience is unmatched. Plus, the 15% subscription discount really adds up over time!',
    petName: 'Luna & Max',
    image: 'https://placekitten.com/101/100',
  },
  {
    id: 3,
    name: 'Emily C.',
    location: 'Chicago, IL',
    rating: 5,
    comment: 'Love the variety of eco-friendly options. My cats are happy, and so is my conscience!',
    petName: 'Mochi',
    image: 'https://placekitten.com/102/100',
  },
  {
    id: 4,
    name: 'David L.',
    location: 'Austin, TX',
    rating: 5,
    comment: 'The referral program is fantastic. I\'ve saved so much by sharing with fellow cat parents!',
    petName: 'Shadow',
    image: 'https://placekitten.com/103/100',
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="section-padding bg-brand-beige-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Happy Cats, Happy Humans</h2>
          <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
            Join thousands of satisfied cat parents who trust CatBox for their feline's needs
          </p>
        </motion.div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].petName}
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  
                  <div className="flex mb-4">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  
                  <p className="text-lg mb-6 italic">
                    "{testimonials[currentIndex].comment}"
                  </p>
                  
                  <div>
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-brand-neutral-500">
                      {testimonials[currentIndex].location} • Cat parent to {testimonials[currentIndex].petName}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-brand-coral'
                    : 'bg-brand-neutral-300 hover:bg-brand-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}