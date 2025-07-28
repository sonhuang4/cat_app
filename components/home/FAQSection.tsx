'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const faqs = [
  {
    id: 1,
    question: 'How does the subscription work?',
    answer: 'Choose your products, set your delivery frequency, and we\'ll automatically ship your order. You can modify, pause, or cancel anytime from your dashboard.',
  },
  {
    id: 2,
    question: 'Can I mix and match products?',
    answer: 'Absolutely! Build your custom box with any combination of litters and foods. You can also adjust your selections before each delivery.',
  },
  {
    id: 3,
    question: 'What if my cat doesn\'t like a product?',
    answer: 'We offer a 100% satisfaction guarantee. If your cat isn\'t happy, we\'ll help you find a better match or provide a refund.',
  },
  {
    id: 4,
    question: 'When will I be charged?',
    answer: 'You\'ll be charged when your order ships. For subscriptions, this happens automatically based on your chosen frequency.',
  },
  {
    id: 5,
    question: 'Do you ship everywhere?',
    answer: 'We currently ship to all 50 US states. Shipping is always free on subscription orders over $35.',
  },
]

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-brand-neutral-600">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <motion.svg
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-brand-coral flex-shrink-0"
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
                      <p className="mt-4 text-brand-neutral-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}