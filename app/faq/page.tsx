'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Input from '@/components/ui/Input'
import { FAQ_CATEGORIES } from '@/lib/constants'

const faqs = [
  // Subscription FAQs
  {
    id: 1,
    category: FAQ_CATEGORIES.SUBSCRIPTION,
    question: 'How does the CatBox subscription work?',
    answer: 'CatBox is a convenient subscription service that delivers premium cat litter and food directly to your door. You choose your products, set your delivery frequency (every 2-6 weeks), and we handle the rest. You can modify, pause, or cancel your subscription anytime from your dashboard.',
  },
  {
    id: 2,
    category: FAQ_CATEGORIES.SUBSCRIPTION,
    question: 'Can I customize my box contents?',
    answer: 'Absolutely! You can mix and match any combination of our premium litters and foods. You can also adjust your selections before each delivery or swap products anytime from your dashboard.',
  },
  {
    id: 3,
    category: FAQ_CATEGORIES.SUBSCRIPTION,
    question: 'Can I pause or cancel my subscription?',
    answer: 'Yes, you have complete flexibility. You can pause your subscription for up to 3 months, skip individual deliveries, or cancel anytime with no penalties. All changes can be made easily from your dashboard.',
  },
  {
    id: 4,
    category: FAQ_CATEGORIES.SUBSCRIPTION,
    question: 'How much can I save with a subscription?',
    answer: 'Subscription customers save up to 15% on every delivery depending on their frequency. The more frequent your deliveries, the more you save. Plus, all subscription orders include free shipping.',
  },

  // Shipping FAQs
  {
    id: 5,
    category: FAQ_CATEGORIES.SHIPPING,
    question: 'Do you offer free shipping?',
    answer: 'Yes! All subscription orders include free shipping. For one-time purchases, we offer free shipping on orders over $35.',
  },
  {
    id: 6,
    category: FAQ_CATEGORIES.SHIPPING,
    question: 'Which areas do you deliver to?',
    answer: 'We currently ship to all 50 US states. Most orders arrive within 3-5 business days via our trusted shipping partners.',
  },
  {
    id: 7,
    category: FAQ_CATEGORIES.SHIPPING,
    question: 'When will my first order arrive?',
    answer: 'Your first order will typically arrive within 3-5 business days of placing your subscription. You\'ll receive tracking information via email once your order ships.',
  },
  {
    id: 8,
    category: FAQ_CATEGORIES.SHIPPING,
    question: 'Can I change my delivery address?',
    answer: 'Yes, you can update your delivery address anytime from your dashboard. Changes made before your next shipping date will apply to that delivery.',
  },

  // Product FAQs
  {
    id: 9,
    category: FAQ_CATEGORIES.PRODUCTS,
    question: 'What if my cat doesn\'t like a product?',
    answer: 'We offer a 100% satisfaction guarantee. If your cat doesn\'t love a product, contact our customer service team and we\'ll help you find a better match or provide a full refund.',
  },
  {
    id: 10,
    category: FAQ_CATEGORIES.PRODUCTS,
    question: 'Are your products safe and high-quality?',
    answer: 'Absolutely! We carefully curate all our products from trusted brands. Our litters are dust-free and our foods are made with premium ingredients. All products meet the highest safety standards.',
  },
  {
    id: 11,
    category: FAQ_CATEGORIES.PRODUCTS,
    question: 'Do you offer eco-friendly options?',
    answer: 'Yes! We have several eco-friendly options including biodegradable pine wood pellets, recycled paper litters, and sustainably sourced foods. Look for the "Eco Choice" badge on product pages.',
  },
  {
    id: 12,
    category: FAQ_CATEGORIES.PRODUCTS,
    question: 'How do I know which products are right for my cat?',
    answer: 'Our subscription wizard asks about your cat\'s age, weight, activity level, and preferences to recommend the best products. You can also contact our customer service team for personalized recommendations.',
  },

  // Account & Billing FAQs
  {
    id: 13,
    category: FAQ_CATEGORIES.ACCOUNT,
    question: 'When will I be charged?',
    answer: 'You\'ll be charged when your order ships, not when you place it. For subscriptions, billing happens automatically based on your chosen frequency. You\'ll receive an email notification before each charge.',
  },
  {
    id: 14,
    category: FAQ_CATEGORIES.ACCOUNT,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. Your payment information is securely stored and encrypted.',
  },
  {
    id: 15,
    category: FAQ_CATEGORIES.ACCOUNT,
    question: 'How do I update my payment information?',
    answer: 'You can update your payment method anytime from your account dashboard. Go to "Account Settings" and select "Payment Methods" to add, remove, or update your cards.',
  },
  {
    id: 16,
    category: FAQ_CATEGORIES.ACCOUNT,
    question: 'How does the referral program work?',
    answer: 'Share your unique referral code with friends and family. When they create their first subscription, you both get $10 off! There\'s no limit to how many friends you can refer.',
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [openId, setOpenId] = useState<number | null>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const categories = ['All', ...Object.values(FAQ_CATEGORIES)]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-brand-beige py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
              Find answers to common questions about CatBox subscriptions, shipping, products, and more.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-brand-coral text-white'
                      : 'bg-white text-brand-neutral-600 hover:text-brand-coral hover:bg-brand-coral/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div ref={ref} className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No FAQs found</h3>
                <p className="text-brand-neutral-600">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 text-left"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-grow pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-brand-coral/10 text-brand-coral rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                      </div>
                      <motion.svg
                        animate={{ rotate: openId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5 text-brand-coral flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                    
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-brand-neutral-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-brand-neutral-600 mb-6">
              Can't find what you're looking for? Our customer service team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@catbox.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-coral text-white rounded-full hover:bg-brand-coral-dark transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a
                href="tel:1-800-CATBOX"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-teal text-white rounded-full hover:bg-brand-teal-dark transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}