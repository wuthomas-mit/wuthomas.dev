'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Experiences() {
  useEffect(() => {
    // Clear travel overlay once page is loaded
    const timer = setTimeout(() => {
      document.body.classList.remove('travel-overlay-active');
      sessionStorage.removeItem('travel-overlay-active');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      {/* Back button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black"
      >
        ← Back to Ship
      </Link>

      {/* Under Construction Message */}
      <h1 className="text-6xl font-bold text-cyan-400 text-center">
        UNDER CONSTRUCTION
      </h1>
    </div>
  );
}
