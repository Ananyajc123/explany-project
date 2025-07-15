# Explany - Waste Management Mobile App

## Overview

Explany is a full-stack waste management application designed for rural communities, enabling users to earn money by properly disposing of plastic waste and e-waste. The app features AI-powered waste scanning, a point-based reward system, partner shop integration, and a book marketplace for sustainable commerce.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom eco-friendly color scheme
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Mobile-First**: Responsive design with mobile camera integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Style**: RESTful JSON APIs
- **Session Management**: Express sessions with PostgreSQL storage

### Database Schema
- **Users**: Core user profiles with points, earnings, and CO2 savings tracking
- **Shops**: Partner shop locations with geolocation support
- **Waste Categories**: Configurable waste types with point values
- **Waste Items**: User-submitted waste with verification workflow
- **Books**: Marketplace for used books with point-based pricing
- **Transactions**: Financial transaction history
- **Point Redemptions**: Point usage tracking

## Key Components

### Core Features
1. **Waste Scanner**: Camera-based waste identification with AI categorization
2. **Point System**: Gamified reward mechanism with milestone tracking
3. **Shop Locator**: GPS-based partner shop discovery
4. **Book Marketplace**: Secondary market for educational materials
5. **User Dashboard**: Comprehensive analytics and progress tracking
6. **Shop Dashboard**: Business interface for waste collection management

### Technical Components
- **WasteScanner**: Camera integration for waste identification
- **PointTracker**: Progress visualization and milestone system
- **ShopCard/BookCard**: Reusable UI components for listings
- **Responsive Navigation**: Mobile-optimized navigation with contextual menus

## Data Flow

### User Journey
1. User scans waste item using camera
2. AI categorizes waste and calculates points
3. User drops waste at partner shop
4. Shop verifies and confirms collection
5. Points are awarded to user account
6. User redeems points for products or books

### Data Processing
- Frontend captures images and sends to backend
- Backend processes images for waste categorization
- Database stores waste items with pending verification
- Shop dashboard allows verification workflow
- Points are calculated and added to user balance

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **wouter**: Lightweight routing

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundling

### UI/UX Libraries
- **class-variance-authority**: Component variant management
- **clsx**: Conditional class name utility
- **lucide-react**: Icon library
- **date-fns**: Date manipulation utilities

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - starts both frontend and backend
- **Production Build**: `npm run build` - creates optimized bundles
- **Database Migration**: `npm run db:push` - syncs schema changes

### Architecture Decisions
1. **Monorepo Structure**: Shared types and utilities between frontend/backend
2. **PostgreSQL**: Chosen for geospatial queries and complex relationships
3. **Drizzle ORM**: Type-safe database operations with schema migrations
4. **Vite**: Fast development experience with HMR
5. **Mobile-First**: Camera API integration for waste scanning
6. **Point System**: Gamification to encourage user engagement

### Environment Setup
- DATABASE_URL required for PostgreSQL connection
- File structure separates client, server, and shared code
- TypeScript configuration enables path mapping for clean imports
- Tailwind configured with custom eco-friendly color palette

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL database connectivity, with the frontend served as static assets and the backend providing API endpoints.