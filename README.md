# FitCheck

FitCheck is a full-stack fitness web app built with Next.js 14 App Router, Tailwind CSS, shadcn/ui-style components, NextAuth.js, Prisma, and Neon Postgres.

## Features

- Email/password and Google sign-in with NextAuth.js
- Neon-backed user, BMI, daily log, and goal storage through Prisma
- BMI calculator with metric and imperial inputs
- TDEE and calorie target calculator
- BMI and weight trend charts with Recharts
- Daily water and sleep trackers
- Workout planner based on BMI category
- Goal tracking, progress bars, milestone badges, and achievement syncing
- Workout completion syncing for the 7-day plan
- Shareable BMI card with html2canvas
- Protected dashboard routes with middleware

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-inspired component layer
- NextAuth.js
- Prisma ORM
- Neon serverless PostgreSQL
- Recharts
- html2canvas

## Project Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Neon database:

   - Sign in to [Neon](https://neon.tech).
   - Create a new project.
   - Copy the connection string from the database dashboard.
   - Make sure the connection string includes `sslmode=require`.

3. Set environment variables:

   Create a `.env.local` file in the project root using these values:

   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@HOST/fitcheck?sslmode=require"
   NEXTAUTH_SECRET="a-long-random-secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Create and apply the initial migration:

   ```bash
   npx prisma migrate dev --name init
   ```

   The repo also includes a generated starter migration at `prisma/migrations/0001_init/migration.sql`.

6. Start the app locally:

   ```bash
   npm run dev
   ```

7. Optional demo data:

   ```bash
   npm run prisma:seed
   ```

   Demo sign-in: `demo@fitcheck.app` / `Demo1234!`

## Google OAuth Setup

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Configure the OAuth consent screen.
4. Create OAuth credentials.
5. Add these redirect URIs:

   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-vercel-domain.vercel.app/api/auth/callback/google`

6. Copy the Client ID and Client Secret into `.env.local`.

## Database Schema

The Prisma schema includes:

- `User`
- `BmiLog`
- `DailyLog`
- `Goal`
- `WorkoutCompletion`

It also includes the NextAuth support tables required for Prisma adapter storage:

- `Account`
- `Session`
- `VerificationToken`

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **New Project** and import the GitHub repo.
3. Add the environment variables from `.env.local` in the Vercel project settings.
4. Set `NEXTAUTH_URL` to your production Vercel domain.
5. Deploy.

Vercel will detect the Next.js app automatically. No extra deployment config is required.

## Notes

- The dashboard is protected by middleware.
- BMI checks, daily logs, and goals are stored per logged-in user.
- The workout planner is generated from the user's latest BMI category.
- Workout completions and goal achievements sync back to the database.
- A seed script is included for demo data and local testing.
