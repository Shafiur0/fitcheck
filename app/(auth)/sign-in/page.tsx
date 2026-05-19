import Link from 'next/link';
import { Suspense } from 'react';
import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInPage() {
  const googleSignInEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-700">FitCheck</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-emerald-950">Sign in to your dashboard.</h1>
        <p className="max-w-xl text-lg leading-8 text-emerald-900/70">View your BMI trend, daily logs, goal progress, and workout plans from any device.</p>
        <p className="text-sm text-emerald-900/70">
          New here? <Link href="/sign-up" className="font-medium text-emerald-700 underline underline-offset-4">Create an account</Link>
        </p>
      </div>
      <Suspense fallback={null}>
        <SignInForm googleSignInEnabled={googleSignInEnabled} />
      </Suspense>
    </div>
  );
}
