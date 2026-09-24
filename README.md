# E-Commerce Ordering Website

A full-stack online ordering website for a small bakery business, built with Next.js and Supabase. Customers can browse products and add items to their cart as guests, then create an account securely at checkout.

## Features
- Product catalog with [categories / product details]
- Guest browsing and shopping cart (no account needed to shop)
- Email and password authentication required only at checkout
- Order placement stored in a Supabase database
- Responsive design for mobile and desktop

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend & Database:** Supabase (PostgreSQL, Authentication)
- **State Management:** React Context (shopping cart)

## Security
- Supabase Row Level Security (RLS) so users can only access their own orders
- Environment variables for configuration, excluded from version control
- Authentication handled by Supabase Auth


## How to Run
1. Clone the repository
2. Install dependencies:
```
   npm install
```
3. Create a `.env.local` file in the root folder:
```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. Start the development server:
```
   npm run dev
```
5. Open http://localhost:3000
