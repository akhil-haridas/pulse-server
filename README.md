# Pulse Server

A Node.js/Express backend server for managing APIs and business logic.

## Project Structure

```
├── src/
│   ├── app.ts             # Express app setup
│   ├── server.ts          # Entry point
│   ├── config/            # Configs (env, db)
│   ├── routes/            # API routers
│   ├── controllers/       # Route handlers
│   ├── services/          # Business logic
│   ├── middlewares/       # Custom middleware (auth, error)
│   ├── models/            # DB models (later via Prisma)
│   ├── validations/       # Zod schemas
│   └── utils/             # Helpers (JWT, logger, etc.)
```

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the root directory and set your environment variables.
3. Start the development server:
   ```sh
   npm run dev
   ```

## Features
- Modular folder structure
- Ready for Express, Prisma, Zod, and more
- Easy to extend for new APIs and services

---
