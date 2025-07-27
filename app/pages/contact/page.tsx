'use client';

import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      {/* Back button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black"
      >
        ← Back to Ship
      </Link>
    </div>
  );
}
