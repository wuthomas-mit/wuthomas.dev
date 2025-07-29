'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);

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

  const handleDragonClick = () => {
    setShowTextBox(true);
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
        onClick={handleDragonClick}
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

      {/* Text box that appears to the left of the dragon */}
      {showTextBox && (
        <div
          className="absolute z-30 bg-gray-900 bg-opacity-95 text-white p-3 rounded-lg shadow-xl border border-cyan-400"
          style={{
            left: '52%',
            top: '20%',
            width: '160px',
            transform: 'translate(-50%, 0)',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-cyan-300">Large Messenger Pidgeon</h3>
            <button
              onClick={() => setShowTextBox(false)}
              className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="space-y-3">
            <p className="text-sm">

            </p>
            <div className="text-sm space-y-1">
              <p>
                <a
                  href="mailto:wuthomas@mit.edu"
                  className="text-cyan-300 hover:text-cyan-100 underline transition-colors"
                >
                  wuthomas@mit.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Linkedin Snail */}
      <div
        className="absolute z-20 cursor-pointer hover:scale-110 transition-transform"
        style={{
          left: '57%',
          bottom: '4%',
          transform: 'translate(-50%, 0)',
        }}
        onClick={() => window.open('https://linkedin.com/in/thomas--wu', '_blank')}
      >
        <img
          src="/components/snail-maplestory.png"
          alt="LinkedIn Snail"
          className=""
          style={{
            width: '12vw',
            height: 'auto'
          }}
        />
      </div>

      {/* GitHub Statue */}
      <div
        className="absolute z-20 cursor-pointer hover:scale-110 transition-transform"
        style={{
          left: '35%',
          bottom: '45%',
        }}
        onClick={() => window.open('https://github.com/wuthomas-mit', '_blank')}
      >
        <img
          src="/components/github-statue.png"
          alt="GitHub Statue"
          className=""
          style={{
            width: '8vw',
            height: 'auto'
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-8 left-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black shadow-lg z-40"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
