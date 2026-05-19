import Link from 'next/link';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-4 lg:order-2">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-700">Join FitCheck</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-emerald-950">Build momentum from day one.</h1>
        <p className="max-w-xl text-lg leading-8 text-emerald-900/70">Create your account, connect Google if you want, and start logging checks, goals, and daily habits.</p>
        <p className="text-sm text-emerald-900/70">
          Already have an account? <Link href="/sign-in" className="font-medium text-emerald-700 underline underline-offset-4">Sign in</Link>
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
