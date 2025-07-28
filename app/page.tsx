'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=600&fit=crop',
    title: 'Premium Cat Care Delivered Monthly',
    subtitle: 'Curated litter and food boxes tailored for your feline friend',
    cta: 'Build Your Box',
    ctaLink: '/build-box',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&h=600&fit=crop',
    title: 'Save 15% on Every Delivery',
    subtitle: 'Subscribe and never run out of essentials again',
    cta: 'Shop Now',
    ctaLink: '/products',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&h=600&fit=crop',
    title: 'Refer Friends, Earn Rewards',
    subtitle: 'Get $10 off for every friend who subscribes',
    cta: 'Learn More',
    ctaLink: '/referrals',
  },
]

const featuredProducts = [
  {
    id: 1,
    category: 'Premium Litter',
    title: 'Eco-Friendly Clay Litter',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=300&fit=crop',
    features: ['99.9% Dust Free', 'Odor Control', 'Clumping'],
    badge: 'Best Seller',
  },
  {
    id: 2,
    category: 'Gourmet Food',
    title: 'Wild Salmon Recipe',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop',
    features: ['Grain Free', 'High Protein', 'Omega 3'],
    badge: 'New',
  },
  {
    id: 3,
    category: 'Natural Litter',
    title: 'Pine Wood Pellets',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=400&h=300&fit=crop',
    features: ['Biodegradable', 'Low Tracking', 'Natural'],
    badge: 'Eco Choice',
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'New York, NY',
    rating: 5,
    comment: 'CatBox has been a game-changer! My cat Whiskers loves the premium litter, and I love never running out.',
    petName: 'Whiskers',
    image: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'Los Angeles, CA',
    rating: 5,
    comment: 'The convenience is unmatched. Plus, the 15% subscription discount really adds up over time!',
    petName: 'Luna & Max',
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Emily C.',
    location: 'Chicago, IL',
    rating: 5,
    comment: 'Love the variety of eco-friendly options. My cats are happy, and so is my conscience!',
    petName: 'Mochi',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=100&h=100&fit=crop&crop=face',
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [])

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(testimonialInterval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link href={heroSlides[currentSlide].ctaLink}>
                <button className="bg-brand-coral hover:bg-brand-coral-dark text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
                  {heroSlides[currentSlide].cta}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-beige-dark">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
              Getting started with CatBox is easy. We'll help you create the perfect subscription for your feline friend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                number: 1, 
                title: 'Tell Us About Your Cat', 
                description: 'Share your cat\'s preferences, age, and dietary needs', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              },
              { 
                number: 2, 
                title: 'Choose Your Products', 
                description: 'Select from premium litters and foods curated for your cat', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              { 
                number: 3, 
                title: 'Set Your Schedule', 
                description: 'Pick delivery frequency that works for you - save up to 15%', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                number: 4, 
                title: 'Enjoy & Relax', 
                description: 'Never run out of essentials. Modify or pause anytime', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
            ].map((step, index) => (
              <div key={step.number} className="text-center relative">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-brand-coral/20 -z-10" />
                )}
                
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-coral hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                
                <div className="bg-brand-coral text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-brand-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
              Discover our most popular products loved by cats and their humans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.badge === 'Best Seller' ? 'bg-brand-coral/10 text-brand-coral' : 'bg-brand-teal/10 text-brand-teal'
                  }`}>
                    {product.badge}
                  </span>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-brand-neutral-500 mb-1">{product.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-2xl font-bold text-brand-coral mb-4">${product.price}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-neutral-100 text-brand-neutral-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                    Add to Box
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <button className="border-2 border-brand-coral text-brand-coral hover:bg-brand-coral hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-beige-dark">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Happy Cats, Happy Humans</h2>
            <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
              Join thousands of satisfied cat parents who trust CatBox for their feline's needs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].petName}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-lg mb-6 italic">
                  "{testimonials[currentTestimonial].comment}"
                </p>
                
                <div>
                  <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-brand-neutral-500">
                    {testimonials[currentTestimonial].location} • Cat parent to {testimonials[currentTestimonial].petName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'w-8 bg-brand-coral'
                      : 'w-2 bg-brand-neutral-300 hover:bg-brand-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-brand-coral to-brand-teal text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Make Your Cat Happier?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of cat parents who never worry about running out of essentials.
            Save 15% on every delivery.
          </p>
          <Link href="/build-box">
            <button className="bg-white text-brand-coral hover:bg-gray-100 font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
              Start Your Subscription
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}