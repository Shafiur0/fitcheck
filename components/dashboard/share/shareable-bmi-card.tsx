"use client";

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

export function ShareableBmiCard({ name, bmi, category, date }: { name: string; bmi: number; category: string; date: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  const copyImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: '#ffffff', scale: 2 });
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      setMessage('Unable to create image.');
      return;
    }
    if ('clipboard' in navigator && 'ClipboardItem' in window) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setMessage('Image copied to clipboard.');
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fitcheck-bmi-card.png';
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Image downloaded.');
  };

  return (
    <div className="space-y-4">
      <div ref={cardRef} className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">FitCheck</p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-emerald-950">{name}</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Metric label="BMI" value={bmi.toFixed(1)} />
          <Metric label="Category" value={category} />
          <Metric label="Date" value={date} />
        </div>
        <Badge className="mt-6">Shareable fitness snapshot</Badge>
      </div>
      <Button onClick={() => void copyImage()} type="button">
        <Download className="h-4 w-4" /> Copy Image
      </Button>
      <p className="text-sm text-emerald-900/70">{message}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4">
      <p className="text-xs uppercase tracking-wide text-emerald-700">{label}</p>
      <p className="mt-2 text-lg font-semibold text-emerald-950">{value}</p>
    </div>
  );
}
