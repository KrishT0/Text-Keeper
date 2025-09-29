# Secure Note-Taking App

A modern secure note-taking web application built with Next.js (App Router), TypeScript, Tailwind CSS, and Neon/PostgreSQL. It features JWT-based authentication with session management, robust validation with Zod, and responsive UI with toast notifications using Sonner. The app uses Next.js Server Actions for all backend logic without separate API routes.

## Features

- User signup and login with JWT sessions stored in secure HTTP-only cookies.
- Server Actions for all backend authentication and note management operations.
- Notes creation, editing, and listing, scoped per authenticated user.
- Input validation using Zod with detailed field-level error reporting.
- Route protection enforced by Next.js middleware checking session tokens.
- Responsive UI with Tailwind CSS and user feedback via Sonner toast notifications.
- Custom loaders and tooltips for improved accessibility and UX.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- PostgreSQL database (Neon compatible)
- Yarn or npm package manager
- Environment variables for database connection and JWT secret

### Installation

```bash
git clone https://github.com/KrishT0/Text-Keeper.git
cd secure-note-app
npm install
```

### Configuration

Create a `.env.local` file in the root with the following variables:

```
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_jwt_secret_key
```

### Running the app

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to access the app.

## Folder Structure

- `/app` - Next.js pages and server actions
- `/components` - Reusable React UI components
- `/utils` - Session, validation, and database helpers
- `/types` - TypeScript type definitions

## Security Notes

- Passwords should be securely hashed in production.
- Session cookies are HTTP-only and Secure for protection.
- Middleware guards protected pages against unauthorized access.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
