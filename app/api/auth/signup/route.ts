import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { signUpSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = signUpSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please provide a valid name, email, and password.' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (exists) {
    return NextResponse.json({ error: 'An account with that email already exists.' }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash
    }
  });

  return NextResponse.json({ ok: true });
}
