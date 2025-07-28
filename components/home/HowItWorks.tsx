'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: 1,
    title: 'Tell Us About Your Cat',
    description: 'Share your cat\'s preferences, age, and dietary needs',
    icon: '📝',
  },
  {
    number: 2,
    title: 'Choose Your Products',
    description: 'Select from premium litters and foods curated for your cat',
    icon: '📦',
  },
  {
    number: 3,
    title: 'Set Your Schedule',
    description: 'Pick delivery frequency that works for you - save up to 15%',
    icon: '📅',
  },
  {
    number: 4,
    title: 'Enjoy & Relax',
    description: 'Never run out of essentials. Modify or pause anytime',
    icon: '😻',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="section-padding bg-brand-beige-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
            Getting started with CatBox is easy. We'll help you create the perfect subscription for your feline friend.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="text-center relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-brand-coral/20 -z-10" />
              )}
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg text-4xl"
              >
                {step.icon}
              </motion.div>
              
              <div className="bg-brand-coral text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                {step.number}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-brand-neutral-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}