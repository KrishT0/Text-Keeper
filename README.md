# Text Keeper

Text Keeper is a lightweight workspace for saving, organizing, and sharing text snippets. It is designed for developers who need a fast place to keep notes, code fragments, links, and temporary text without searching through chat threads or browser tabs.

## Features

- **Authentication** — Sign up and sign in with session-based authentication.
- **Private notes** — Create, edit, and delete notes from an authenticated workspace.
- **AI summaries** — Generate concise summaries of saved notes with a streaming response.
- **Instant copy** — Copy note content directly to the clipboard.
- **QR and link sharing** — Create a shareable URL or QR code for a note.
- **Expiring share links** — Set links to expire after one hour, one day, a custom number of minutes, or never.
- **Fast note search** — Use `Ctrl + F` or `Cmd + F` to search note headings and content, preview matching snippets, and jump directly to a note.
- **Responsive interface** — Optimized for desktop and mobile layouts.
- **Accessible feedback** — Loading states, toast notifications, error handling, and empty states.
- **Privacy page** — Documents the data handled by the application and its third-party services.

## Tech stack

- [Next.js](https://nextjs.org/) 15 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) with strict type checking
- [Tailwind CSS](https://tailwindcss.com/)
- [Neon](https://neon.tech/) serverless PostgreSQL
- [Zod](https://zod.dev/) for input validation
- [Vercel AI SDK](https://ai-sdk.dev/) for streamed AI responses
- [Jose](https://github.com/panva/jose) for JWT operations
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- [pnpm](https://pnpm.io/) for package management

## Requirements

- Node.js 18 or later
- pnpm 9 or later
- A PostgreSQL database, such as Neon
- An AI provider configuration supported by the Vercel AI SDK

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/KrishT0/Text-Keeper.git
cd Text-Keeper/fullstack
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_long_random_session_secret
NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=your-production-domain
```

`NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` is optional for local development. When it is not set, shared links use `http://localhost:3000`.

The AI summary route also requires the provider configuration expected by the Vercel AI SDK. Configure those credentials according to your selected provider and deployment environment. Never commit secrets or `.env.local` to source control.

### 4. Prepare the database

The application expects a PostgreSQL database with the following logical entities:

- `users` — stores user identifiers, usernames, and authentication data
- `notes` — stores note identifiers, headings, text content, and the owning user ID

Apply your database schema before starting the application. Keep schema changes in version-controlled migrations when deploying to shared environments.

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command        | Description                            |
| -------------- | -------------------------------------- |
| `pnpm dev`     | Start the Next.js development server   |
| `pnpm build`   | Create and validate a production build |
| `pnpm start`   | Run the production build               |
| `pnpm lint`    | Run ESLint                             |
| `pnpm prepare` | Initialize Husky Git hooks             |

## Project structure

```text
src/
└── app/
    ├── api/ai/              AI summary route handler
    ├── auth/                Authentication page, actions, and forms
    ├── components/          Shared UI components
    ├── hooks/               Reusable client hooks
    ├── privacy/             Privacy policy page
    ├── share/[slug]/        Public note-sharing route
    ├── text/                Authenticated notes workspace and actions
    ├── utils/               Database and session helpers
    ├── error.tsx            Application error boundary
    ├── loading.tsx          Loading UI
    ├── not-found.tsx        Not-found UI
    └── page.tsx             Landing page
```

## Security considerations

Text Keeper handles user accounts and private note content. Before deploying to production, verify the following:

- Use a strong, unique `SESSION_SECRET` stored in the deployment platform's secret manager.
- Hash passwords with a modern password hashing algorithm such as Argon2id or bcrypt. Never store plaintext passwords.
- Ensure note reads, updates, and deletes are scoped to the authenticated user's ID.
- Validate and limit note content and AI request payloads.
- Add rate limiting to authentication and AI endpoints.
- Configure secure, HTTP-only, same-site cookies for production.
- Review the public sharing model before storing sensitive information in shareable notes.
- Expiring links use signed server-generated tokens; invalid or expired tokens are rejected by the public share route.
- Treat `Never` links as public, long-lived links and revoke or delete the note when access should end.
- Keep the privacy policy aligned with the actual behavior and retention policies of the selected AI provider.

## Development notes

- Server Actions are used for authentication and note mutations.
- The AI summary feature is exposed through the `/api/ai` Route Handler because it streams its response to the client.
- Notes are cached and revalidated by user-specific cache tags.
- Share-link expiry is stateless: temporary links carry a signed token with an expiration timestamp, so no additional database column is required.
- The public share route validates the token signature, note ID, and expiration before returning note content.
- The desktop search modal performs case-insensitive searches across note headings and content, displays contextual snippets, and smoothly scrolls to matching notes.
- The `/text` workspace and `/api/ai` endpoint are protected by the authentication middleware.

## Contributing

1. Create a feature branch.
2. Make focused changes that match the existing application patterns.
3. Run the checks before opening a pull request:

   ```bash
   pnpm lint
   pnpm build
   ```

4. Open a pull request with a clear description of the change and any required environment or database updates.

## License

No license has been declared yet. Add a license file before distributing or accepting external contributions under specific terms.
