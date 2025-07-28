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
        backgroundImage: "url('/components/background-profile.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />

    {/* Name in top left */}
    <h1 className="absolute top-[10%] left-[3%] text-[4vw] font-bold text-white font-serif">
      Thomas Wu
    </h1>

    {/* Outline behind main image */}
    <img
      src="/profile_pictures/armscrossed-outline.png"
      alt=""
      className="max-w-[55%] max-h-[80%] object-contain absolute"
      style={{
        opacity: 0.7,
        zIndex: 1,
        transform: 'translate(-1%, 1%)'
      }}
    />

    {/* Main image */}
    <img
      src="/profile_pictures/armscrossed.png"
      alt="Thomas Wu"
      className="max-w-[30%] max-h-[40%] object-contain"
      style={{
        zIndex: 2
      }}
    />

    {/* Upper Right text box */}
    <div
      className="absolute right-[5%] top-[25%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
    >
      <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">Passions...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed">
        Education Tech<br />
        Sports Tech <br />
        Software Engineering, AI <br />
      </p>
    </div>

    {/* Middle Right text box */}
    <div
      className="absolute right-[5%] top-[50%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
    >
      <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">What drives me...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed">
        "With great power comes great responsibility." And also: <br />
        Steak, Pizza, and my Mom's cooking.<br />
      </p>
    </div>

    {/* Bottom Right text box */}
    <div
      className="absolute right-[5%] top-[75%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
    >
      <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">My current aspiration...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed">
        Driving AI-powered education<br />
      </p>
    </div>

    {/* Lower Left*/}
    <div
      className="absolute left-[4%] bottom-[4%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
    >
      <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">Currently I'm...</h3>
      <p className="text-white text-[1.2vw] leading-relaxed">
        Studying CS & Management @ MIT<br />
        Interning at Genius Sports<br />
      </p>
    </div>

    {/* Hometown Image */}
    <div
      className="absolute left-[4%] top-[45%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
    >
      <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">Hometown</h3>
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
        {/* Back button - always visible */}
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
