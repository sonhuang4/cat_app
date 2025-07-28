# CatBox - Premium Cat Subscription E-Commerce Platform

A full-featured cat subscription e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, React Query, Zustand, React Hook Form, and Framer Motion.

## 🎯 Features

### 🏠 Home Page
- **Hero Carousel**: Auto-rotating slides with smooth animations
- **How It Works**: 4-step process explanation with scroll animations
- **Product Highlights**: Featured products with hover effects
- **Testimonial Carousel**: Customer reviews with auto-rotation
- **FAQ Section**: Expandable questions with smooth animations
- **CTA Section**: Gradient background with conversion-focused messaging

### 🛍️ Product Catalog (`/products`)
- **Product Grid**: Responsive grid with skeleton loading
- **Advanced Filtering**: By type, brand, price range, and sorting
- **Product Cards**: Hover animations, badges, and "Add to Box" functionality
- **Search & Filter**: Real-time filtering with animated results

### 📦 Subscription Builder (`/build-box`)
- **Multi-Step Wizard**: 5-step process with progress bar
- **Pet Profile**: Form with validation, activity levels, health concerns
- **Product Selection**: Litter and food selection with product details
- **Frequency Options**: Different delivery schedules with discount tiers
- **Order Review**: Complete summary with pricing breakdown
- **Animations**: Smooth step transitions with Framer Motion

### 🎛️ User Dashboard (`/dashboard`)
- **Welcome Flow**: Congratulations message for new subscribers
- **Subscription Management**: View, edit, pause, resume, cancel subscriptions
- **Quick Stats**: Active subscriptions, savings, referral code
- **Recent Activity**: Timeline of subscription events
- **Edit Modal**: In-place editing with form validation

### 💰 Referral System (`/referrals`)
- **Referral Overview**: Code display, sharing options, how-it-works
- **Invite Friends**: Email invitation form with templates
- **Stats & Rewards**: Performance tracking, earnings history
- **Social Sharing**: Facebook, Twitter, email, and link copying
- **Success Tips**: Best practices for referral success

### ❓ FAQ Page (`/faq`)
- **Searchable FAQs**: Real-time search across questions and answers
- **Category Filtering**: Organized by subscription, shipping, products, billing
- **Expandable Answers**: Smooth accordion animations
- **Contact Section**: Support options and contact methods

## 🎨 Design System

### Color Palette
- **Primary Coral**: `#FF6B6B` (buttons, accents)
- **Secondary Teal**: `#4ECDC4` (secondary actions)
- **Background Beige**: `#FFF9F5` (main background)
- **Neutral Grays**: Complete scale for text and UI elements

### Typography
- **Headings**: Poppins (400, 500, 600, 700)
- **Body Text**: Inter (300, 400, 500, 600)

### Components
- **Buttons**: 4 variants (primary, secondary, outline, ghost) with 3 sizes
- **Cards**: Hover animations, rounded corners, soft shadows
- **Forms**: Comprehensive validation, error states, accessibility
- **Badges**: Status indicators with contextual colors
- **Skeletons**: Loading states for better UX

## 🔧 Technical Architecture

### Frontend Stack
- **Next.js 14**: App Router, TypeScript, SSR/SSG
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + CSS keyframes
- **State Management**: Zustand for subscription state
- **Data Fetching**: React Query with optimistic updates
- **Forms**: React Hook Form + Zod validation
- **Scroll Animations**: Intersection Observer API

### Mock API Layer
- **Products API**: CRUD operations with filtering
- **User API**: Profile management and authentication
- **Subscription API**: Subscription lifecycle management
- **Referrals API**: Referral tracking and rewards

### Data Models
- **Product**: Litter/food with pricing, features, frequency options
- **PetProfile**: Age, weight, activity level, preferences, health concerns
- **Subscription**: Complete subscription with pet profile, products, frequency
- **User**: Profile with subscriptions and referral code
- **Referral**: Tracking code, invites, signups, rewards

## 🚀 Key Features Implemented

### Performance Optimizations
- **Image Optimization**: Next.js Image component with placekitten.com
- **Code Splitting**: Component-level lazy loading
- **Caching**: React Query with stale-while-revalidate
- **Skeleton Loading**: Smooth loading states throughout

### User Experience
- **Responsive Design**: Mobile-first approach, works on all devices
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Micro-Interactions**: Hover effects, button animations, form feedback
- **Progressive Enhancement**: Works without JavaScript for core features

### Business Logic
- **Subscription Pricing**: Dynamic pricing with frequency discounts
- **Product Recommendations**: Based on pet profile and preferences
- **Referral Rewards**: Automatic $10 credits for successful referrals
- **Flexible Management**: Pause, skip, modify subscriptions easily

## 📱 Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🎭 Animation System
- **Page Transitions**: Fade and slide effects
- **Scroll Animations**: Elements animate in on scroll
- **Hover States**: Buttons, cards, and interactive elements
- **Loading States**: Skeleton loaders and spinners
- **Form Animations**: Validation feedback and state changes

## 🛠️ Setup & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
catbox-subscription/
├── app/                    # Next.js App Router
│   ├── api/               # Mock API routes
│   ├── (pages)/           # Application pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout/           # Navigation, footer
│   ├── home/             # Homepage sections
│   ├── products/         # Product catalog
│   ├── subscription/     # Subscription wizard
│   ├── dashboard/        # User dashboard
│   └── referrals/        # Referral system
├── hooks/                # React Query hooks
├── stores/               # Zustand stores
├── lib/                  # Utilities and constants
├── types/                # TypeScript definitions
└── styles/               # Global styles
```

## 💼 Business Value

This platform provides a complete e-commerce solution for subscription businesses with:

- **Conversion Optimization**: Multi-step wizard reduces abandonment
- **Customer Retention**: Flexible subscription management
- **Growth Engine**: Built-in referral system for organic growth
- **Brand Experience**: Cohesive design system with premium feel
- **Analytics Ready**: Event tracking hooks throughout the funnel

The platform is designed to scale and can be easily extended with additional features like loyalty programs, social commerce, or advanced analytics.

---

**Built with ❤️ for cat parents everywhere** 🐱