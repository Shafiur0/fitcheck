export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[linear-gradient(180deg,rgba(236,253,245,0.55),rgba(255,255,255,0.95))] px-4 py-10">{children}</div>;
}
