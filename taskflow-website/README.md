# TaskFlow - Task Management Website

A modern, responsive one-page website for TaskFlow, a fictional task management application. Built with React, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## 🚀 Features

- **Modern Design**: Clean and professional interface with a gradient hero section
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Scroll-triggered animations using Framer Motion
- **Component-Based Architecture**: Modular React components for easy maintenance
- **TypeScript**: Type-safe development experience
- **Tailwind CSS**: Utility-first CSS framework

## 📋 Sections

1. **Hero Section**
   - Eye-catching app name with branding
   - Compelling value proposition
   - Call-to-action button
   - Preview cards showing key features

2. **Features Section**
   - Three main features with icons and detailed descriptions:
     - Smart Analytics
     - Lightning Fast Performance  
     - Secure & Private
   - Hover effects and animations

3. **Testimonials Section**
   - Three customer testimonials with avatars
   - Professional quotes from different user types
   - Card-based layout with smooth animations

4. **Pricing Section**
   - Three pricing tiers: Free, Pro, and Team
   - Feature comparison with checkmarks
   - Popular plan highlighting
   - Clear call-to-action buttons

5. **Footer Section**
   - Company branding
   - Organized link sections (Product, Company, Legal)
   - Social media icons (Facebook, Instagram, Twitter, LinkedIn)
   - Copyright information

## 🛠️ Technologies Used

- **React 19** - Frontend library
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Vite** - Fast build tool and development server
- **pnpm** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskflow-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Hero section with main CTA
│   ├── Features.tsx      # Three feature cards
│   ├── Testimonials.tsx  # Customer testimonials
│   ├── Pricing.tsx       # Three pricing tiers
│   └── Footer.tsx        # Footer with links and social media
├── App.tsx               # Main app component
├── main.tsx             # Application entry point
└── index.css            # Tailwind CSS imports
```

## 🎨 Design Features

- **Color Scheme**: Blue and gray palette with gradient backgrounds
- **Typography**: System fonts with proper hierarchy
- **Animations**: 
  - Entrance animations on scroll
  - Hover effects on cards and buttons
  - Smooth transitions throughout
- **Responsive Design**: 
  - Mobile-first approach
  - Breakpoints for tablet and desktop
  - Flexible grid layouts

## 🌟 Key Components

### Hero Component
- Full-screen gradient background
- Animated text and CTA button
- Feature preview cards
- Responsive typography scaling

### Features Component
- Three-column grid layout
- Icon-based feature presentation
- Staggered entrance animations
- Hover effects with scale and shadow

### Testimonials Component
- Customer quote cards
- Avatar images from Pravatar
- Professional styling with quotation marks
- Responsive grid layout

### Pricing Component
- Three-tier pricing structure
- Popular plan highlighting
- Feature lists with checkmarks
- Different button styles per plan

### Footer Component
- Multi-column link organization
- Social media integration
- Company branding consistency
- Mobile-responsive layout

## 🎯 Bonus Features Implemented

- **Scroll Animations**: Each section animates in when scrolled into view
- **Micro-interactions**: Button hover effects, card animations
- **Performance Optimized**: Efficient rendering and animations

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (two-column where appropriate)
- **Desktop**: > 1024px (three-column layouts)

## 🚀 Deployment

To deploy the website:

1. Build the project:
```bash
pnpm run build
```

2. The `dist` folder contains the production-ready files
3. Deploy to your preferred hosting service (Vercel, Netlify, etc.)

## 📄 License

This project is for educational/portfolio purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your own needs!
