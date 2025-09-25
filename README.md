# Exclusive E-commerce Website

A modern, fully responsive e-commerce website built with Next.js, React, TypeScript, TailwindCSS, and Redux. Features include product browsing, cart management, user authentication, and payment processing.

## Features

- 🛍️ **Product Management**: Browse products, search, filter by categories
- 🛒 **Shopping Cart**: Add/remove items, quantity management, persistent cart state
- ❤️ **Wishlist**: Save favorite products for later
- 🔐 **Authentication**: Firebase-powered login/signup with Google OAuth
- 💳 **Payment Processing**: Flutterwave integration for secure payments
- 🌙 **Dark/Light Mode**: Toggle between themes
- 📱 **Fully Responsive**: Works on all device sizes
- ⚡ **Performance Optimized**: Fast loading with Next.js optimizations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Payments**: Flutterwave
- **API**: Fake Store API (https://api.escuelajs.co/api/v1/products)

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/                # UI components
│   ├── layout/            # Layout components
│   ├── home/              # Homepage sections
│   └── providers/         # Context providers
├── lib/                   # Utilities and configurations
│   └── redux/             # Redux store and slices
├── services/              # API and external services
├── types/                 # TypeScript type definitions
├── constants/             # App constants
└── utils/                 # Utility functions
\`\`\`

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd exclusive-ecommerce
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in your Firebase and Flutterwave credentials.

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Flutterwave Configuration
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
\`\`\`

## Key Features Implementation

### Redux State Management
- **Cart**: Add/remove products, update quantities, calculate totals
- **Wishlist**: Save/remove favorite products
- **Auth**: User authentication state
- **Theme**: Dark/light mode toggle

### Authentication
- Email/password authentication
- Google OAuth integration
- Protected routes and user sessions

### Payment Integration
- Flutterwave payment gateway
- Support for multiple payment methods
- Payment verification and order processing

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes

## Pages

- **Homepage**: Hero section, featured products, categories
- **Products**: Product listing with search and filters
- **Product Details**: Individual product information
- **Cart**: Shopping cart management
- **Checkout**: Billing details and payment processing
- **Authentication**: Login and signup pages
- **Account**: User profile and order history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
