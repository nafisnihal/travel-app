# Travello - Modern Travel Booking Application

A beautiful, modern travel booking application built with React, featuring stunning animations, responsive design, and a seamless user experience for discovering and booking dream destinations.

## Features

- ** Interactive Home Page** - Hero section with search functionality and trending destinations
- ** Destination Details** - Comprehensive destination pages with booking capabilities
- ** Favorites System** - Save and manage favorite destinations with local storage
- ** User Authentication** - Secure login/register system with form validation
- ** Dark/Light Theme** - Elegant theme switching with smooth transitions
- ** Responsive Design** - Optimized for all device sizes
- ** Modern UI/UX** - Clean, minimal design with smooth animations
- ** Newsletter Subscription** - Footer newsletter with validation
- ** Smart Search** - Real-time destination search with autocomplete

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nafisnihal/travel-app.git
   cd travel-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── home/           # Home page specific components
│   ├── destination/    # Destination page components
│   └── theme-provider/ # Theme management
├── pages/              # Application pages
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── Destination.jsx # Destination details
│   ├── Favorites.jsx   # Saved destinations
│   ├── Login.jsx       # Authentication
│   └── Register.jsx    # User registration
├── layouts/            # Layout components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Header.jsx      # Navigation header
│   └── Footer.jsx      # Site footer
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication state
├── data/               # Static data files
│   ├── destinations.js # Destination data
│   └── globe.json      # 3D globe configuration
├── lib/                # Utility functions
│   └── utils.js        # Helper utilities
└── assets/             # Static assets
    └── images/         # Image files
```

## Technology Stack

### Core Technologies

- **React** - Modern React with hooks and concurrent features
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Dynamic theming system

### Form Management

- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### State Management

- **React Context** - Global state management
- **Local Storage** - Persistent data storage
- **React Hot Toast** - Elegant toast notifications

## Design Approach

### Design Philosophy

The application follows a **modern, minimal design philosophy** with emphasis on:

- Clean typography using Playfair Display and Raleway fonts
- Consistent spacing and layout patterns
- Subtle animations that enhance user experience
- High contrast for accessibility
- Mobile-first responsive design

### Color Scheme

- **Light Theme**: Clean whites and subtle grays
- **Dark Theme**: Rich dark backgrounds with proper contrast
- **Accent Colors**: Minimalistic approach with focus on content

### Animation Strategy

- **Entrance Animations**: Smooth fade-ins with staggered delays
- **Micro-interactions**: Hover effects and button animations
- **Page Transitions**: Smooth scroll-to-top on navigation
- **Loading States**: Elegant spinners and skeleton screens

## Key Features Implementation

### Authentication System

- JWT-like simulation with local storage
- Form validation with real-time feedback
- Password strength indicators
- Persistent login state

### Favorites Management

- Local storage persistence
- Add/remove destinations
- Visual feedback with toast notifications
- Optimistic UI updates

### Theme System

- Simple dark/light toggle
- CSS variable-based theming
- Persistent theme preference
- Smooth transition animations

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Adaptive component sizing
- Touch-friendly interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- **Code Splitting** - Lazy loading for optimal bundle size
- **Image Optimization** - WebP format with fallbacks
- **Memoization** - React.memo for expensive components
- **Efficient Re-renders** - Optimized state management
- **Local Storage** - Reduced API calls with caching

---

Built with ❤️ by [Nafis Nihal](https://github.com/nafisnihal)
