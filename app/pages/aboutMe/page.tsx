'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function AboutMe() {
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
      {/* Top section with three vertical thirds (7/8 of screen) */}
      <div className="absolute inset-0 w-full flex flex-col">
        {/* Three vertical sections - 7/8 height */}
        <div className="w-full h-[85vh] flex">
          {/* Left third - split into 3 sub-sections */}
          <div className="w-1/3 h-full bg-gray-700"> </div>

          {/* Middle third - gradient from darker to lighter */}
          <div className="w-1/3 h-full bg-gradient-to-b from-gray-950 to-gray-700"></div>
          
          {/* Right third */}
          <div className="w-1/3 h-full bg-gray-700"> </div>
        </div>

        {/* Bottom section - 1/8 height */}
        <div className="w-full h-[15vh] bg-gradient-to-b from-gray-800 to-gray-700"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8">
        {/* Back button */}
        <Link 
          href="/"
          className="absolute top-8 left-8 px-1 py-1 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black"
        >
          ← Back
        </Link>

        {/* Name in top left */}
        <h1 className="absolute top-20 left-8 text-6xl font-bold text-white font-serif">
          Thomas Wu
        </h1>

        {/* Chinese name */}
        {/* <h1 className="absolute top-35 left-7.5 text-5xl font-bold text-white font-serif">
          吴志韬
        </h1> */}

        {/* Pinyin */}
        {/* <h1 className="absolute top-48 left-12.5 text-3md font-bold text-white font-serif tracking-widest">
          wú zhì tāo
        </h1> */}

        {/* Hologram image in center */}
        <img 
          src="/profile_pictures/armscrossed.png" 
          alt="Thomas Wu Hologram" 
          className="max-w-lg max-h-180 object-contain"
        />

        {/* Left text box */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">About Me</h3>
          <p className="text-white text-sm leading-relaxed">
            Write about yourself here. This could include your background, interests, education, or anything you'd like to share about your personal journey.
          </p>
        </div>

        {/* Right text box */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Hometown</h3>
          <p className="text-white text-sm leading-relaxed">
            Add information about your skills, hobbies, interests, or professional experience here. This section can highlight what makes you unique.
          </p>
        </div>

        {/* Hometown */}
        <div className="absolute right-8 top-1/5 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Hometown</h3>
          <p className="text-white text-sm leading-relaxed">
            Austin, Texas
          </p>
        </div>

        {/* Theme selector at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <select className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
            <option value="me">🧍🏻</option>
            <option value="chinese">🇨🇳</option>
            <option value="swimming">🏊</option>
            <option value="hobbies">🏂</option>
          </select>
        </div>
      </div>
    </div>
  );
}
