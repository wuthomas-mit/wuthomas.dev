'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Individual theme components
const MeTheme = () => (
  <>
    {/* Background image */}
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: "url('/components/background-profile.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />

    {/* Name in top left */}
    <h1 className="absolute top-[10%] left-[5%] text-[4vw] font-bold text-white font-serif">
      Thomas Wu
    </h1>

    {/* Title */}
    <h1 className="absolute top-[20%] left-[5.25%] text-[1.1vw] font-bold text-white font-serif">
      Student | Software Engineer | AI Researcher
    </h1>

    {/* Main image */}
    <img
      src="/profile_pictures/armscrossed.png"
      alt="Thomas Wu"
      className="max-w-[30%] max-h-[40%] object-contain"
      style={{
        zIndex: 2
      }}
    />

    {/* Middle Right text box */}
    <div
      className="absolute right-[5%] top-[50%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
    >
      <h3 className="text-[2vw] font-bold text-cyan-400 mb-[1%] font-serif">Passions...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed font-serif">
        Education Tech<br />
        Sports Tech <br />
        Software Engineering, AI <br />
      </p>
    </div>

    {/* Bottom Right */}
    <div
      className="absolute right-[5%] top-[75%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg "
    >
      <h3 className="text-[2vw] font-bold text-cyan-400 mb-[1%] font-serif">What drives me...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed font-serif">
        - Steak <br />
        - "With great power <br /> comes great responsibility" <br />
        - Pizza <br />
        - Mom's cooking.
      </p>
    </div>

    {/* Left */}
    <div
      className="absolute left-[5%] top-[50%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
    >
      <h3 className="text-[2vw] font-bold font-serif text-cyan-400 mb-[1%]">Currently I'm...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed font-serif">
        Studying CS & Management @ MIT<br />
        Interning at Genius Sports<br />
      </p>
    </div>

    {/* Hometown Image */}
    <div
      className="absolute left-[4%] top-[75%] transform -translate-y-1/2 w-[15%] p-[2%] rounded-lg"
    >
      <h3 className="text-[2vw] font-bold text-cyan-400 mb-[1%] font-serif">Hometown</h3>
      <img
        src="/components/austin-texas.png"
        alt="Austin, Texas"
        className="w-full h-auto max-h-[30vh] object-contain rounded-lg mb-[1%]"
      />
    </div>
  </>
);

const ChineseTheme = () => (
  <>
    {/* Add Chinese theme content here */}
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-white text-2xl">Chinese Theme - Coming Soon</p>
    </div>
  </>
);

const SwimmingTheme = () => (
  <>
    {/* Add Swimming theme content here */}
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-white text-2xl">Swimming Theme - Coming Soon</p>
    </div>
  </>
);

const HobbiesTheme = () => (
  <>
    {/* Add Hobbies theme content here */}
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-white text-2xl">Hobbies Theme - Coming Soon</p>
    </div>
  </>
);

export default function AboutMe() {
  const [selectedTheme, setSelectedTheme] = useState<'me' | 'chinese' | 'swimming' | 'hobbies'>('me');

  const renderTheme = () => {
    switch (selectedTheme) {
      case 'me':
        return <MeTheme />;
      case 'chinese':
        return <ChineseTheme />;
      case 'swimming':
        return <SwimmingTheme />;
      case 'hobbies':
        return <HobbiesTheme />;
      default:
        return <MeTheme />;
    }
  };

  useEffect(() => {
    // Clear travel overlay once page is loaded
    const timer = setTimeout(() => {
      document.body.classList.remove('travel-overlay-active');
      sessionStorage.removeItem('travel-overlay-active');
    }, 500); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full text-white relative">
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-[2%] left-[2%] px-1 py-1 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black text-xs z-50"
        >
          ← Back
        </Link>

        {/* Render current theme */}
        {renderTheme()}

        {/* Theme selector bubbles at bottom - always visible */}
        <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          <button
            onClick={() => setSelectedTheme('me')}
            className={`${selectedTheme === 'me'
              ? 'bg-cyan-600 border-cyan-400'
              : 'bg-gray-800 hover:bg-cyan-600 border-gray-600 hover:border-cyan-500'
              } border-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          >
            🧍🏻
          </button>
          <button
            onClick={() => setSelectedTheme('chinese')}
            className={`${selectedTheme === 'chinese'
              ? 'bg-cyan-600 border-cyan-400'
              : 'bg-gray-800 hover:bg-cyan-600 border-gray-600 hover:border-cyan-500'
              } border-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          >
            🇨🇳
          </button>
          <button
            onClick={() => setSelectedTheme('swimming')}
            className={`${selectedTheme === 'swimming'
              ? 'bg-cyan-600 border-cyan-400'
              : 'bg-gray-800 hover:bg-cyan-600 border-gray-600 hover:border-cyan-500'
              } border-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          >
            🏊
          </button>
          <button
            onClick={() => setSelectedTheme('hobbies')}
            className={`${selectedTheme === 'hobbies'
              ? 'bg-cyan-600 border-cyan-400'
              : 'bg-gray-800 hover:bg-cyan-600 border-gray-600 hover:border-cyan-500'
              } border-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          >
            🏂
          </button>
        </div>
      </div>
    </div>
  );
}
