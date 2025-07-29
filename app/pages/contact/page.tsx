'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Clear travel overlay once page is loaded
    const timer = setTimeout(() => {
      document.body.classList.remove('travel-overlay-active');
      sessionStorage.removeItem('travel-overlay-active');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="fixed inset-0 text-white flex flex-col"
      style={{
        backgroundImage: `url('/components/maplestory-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Evan Dragon GIF with hover email icon cursor */}
      <div
        className="absolute z-20 group cursor-pointer"
        style={{
          left: '70%',
          top: '20%',
          transform: 'translate(-50%, -50%)',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src="/components/evan-dragon.gif"
          alt="Evan Dragon"
          className=""
          style={{
            width: '25vw',
            height: 'auto'
          }}
        />
      </div>

      {/* Floating email icon that follows cursor */}
      {isHovering && (
        <div
          className="fixed z-30 pointer-events-none"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 10,
            transform: 'translate(0, 0)',
          }}
        >
          <img
            src="/icons/email-icon.png"
            alt="Email"
            className="w-8 h-8 opacity-90"
          />
        </div>
      )}

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-8 left-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black shadow-lg"
        >
          ← Back to Ship
        </Link>
      </div>
    </div>
  );
}
