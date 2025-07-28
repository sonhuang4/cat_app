import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  count?: number
}

export default function SkeletonLoader({ 
  className, 
  variant = 'rectangular',
  count = 1 
}: SkeletonLoaderProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'h-64 rounded-2xl',
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'skeleton animate-pulse bg-brand-neutral-200',
            variants[variant],
            className
          )}
        />
      ))}
    </>
  )
}