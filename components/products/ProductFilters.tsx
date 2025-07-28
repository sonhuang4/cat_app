'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  currentType: 'all' | 'litter' | 'food'
  onTypeChange: (type: 'all' | 'litter' | 'food') => void
}

interface FilterState {
  brand: string
  priceRange: string
  sortBy: string
}

export default function ProductFilters({ onFilterChange, currentType, onTypeChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    priceRange: '',
    sortBy: 'name',
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const resetFilters = { brand: '', priceRange: '', sortBy: 'name' }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
    onTypeChange('all')
  }

  const typeButtons = [
    { value: 'all', label: 'All Products' },
    { value: 'litter', label: 'Litter' },
    { value: 'food', label: 'Food' },
  ] as const

  const brandOptions = [
    { value: '', label: 'All Brands' },
    { value: 'PurrFect Choice', label: 'PurrFect Choice' },
    { value: 'EcoPaws', label: 'EcoPaws' },
    { value: 'CrystalClear', label: 'CrystalClear' },
    { value: 'Feline Feast', label: 'Feline Feast' },
    { value: 'Healthy Paws', label: 'Healthy Paws' },
    { value: 'Senior Whiskers', label: 'Senior Whiskers' },
  ]

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-20', label: 'Under $20' },
    { value: '20-30', label: '$20 - $30' },
    { value: '30-40', label: '$30 - $40' },
    { value: '40+', label: 'Over $40' },
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'brand', label: 'Brand' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {typeButtons.map((type) => (
          <Button
            key={type.value}
            variant={currentType === type.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onTypeChange(type.value)}
          >
            {type.label}
          </Button>
        ))}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto text-brand-coral hover:text-brand-coral-dark transition-colors md:hidden"
        >
          {isExpanded ? 'Less Filters' : 'More Filters'}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
        className={`${isExpanded ? 'block' : 'hidden'} md:block`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Select
            label="Brand"
            options={brandOptions}
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          />
          
          <Select
            label="Price Range"
            options={priceRangeOptions}
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          />
          
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          />
          
          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}