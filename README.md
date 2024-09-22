# Shorten - URL Shortener

Shorten is a modern, user-friendly URL shortening application built with Next.js and Prisma. It allows users to create shortened versions of long URLs, making them easier to share and manage.

## Features

- User authentication (register, login, logout)
- Create shortened URLs with custom codes (optional)
- View list of shortened URLs with visit counts
- Copy shortened URLs to clipboard
- Delete shortened URLs
- Redirect to original URLs when accessing shortened links

## Technology Stack

- **Frontend**: 
  - Next.js 14 (React framework)
  - TypeScript
  - Tailwind CSS for styling
  - shadcn/ui components
- **Backend**: 
  - Next.js API routes
  - Prisma ORM
- **Database**: 
  - PostgreSQL
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - bcrypt for password hashing
- **Form Validation**: 
  - Zod
- **Deployment**: 
  - Vercel (recommended)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/0xtbug/shorten.git
   cd shorten
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```bash
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_jwt_secret"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is designed to be easily deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Connect your GitHub account to Vercel.
3. Create a new project in Vercel and select your repository.
4. Configure your environment variables in Vercel's project settings.
5. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
