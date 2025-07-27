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
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/components/art-background.jpg')"
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8">
        {/* Back button */}
        <Link 
          href="/"
          className="absolute top-8 left-8 px-1 py-1 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black text-xs"
        >
          ← Back
        </Link>

        {/* Name in top left */}
        <h1 className="absolute top-20 left-8 text-6xl font-bold text-white font-serif">
          Thomas Wu
        </h1>

        {/* Hologram image in center */}
        <img 
          src="/profile_pictures/armscrossed.png" 
          alt="Thomas Wu Hologram" 
          className="max-w-lg max-h-180 object-contain"
        />

        {/* Right text box */}
        <div className="absolute right-8 top-4/20 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Passions + Interests...</h3>
          <p className="text-white text-sm leading-relaxed">
            Write about yourself here. This could include your background, interests, education, or anything you'd like to share about your personal journey.
          </p>
        </div>

        {/* Right text box */}
        <div className="absolute right-8 top-9/20 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">What Drives Me...</h3>
          <p className="text-white text-sm leading-relaxed">
            Write about yourself here. This could include your background, interests, education, or anything you'd like to share about your personal journey.
          </p>
        </div>

        {/* Right text box */}
        <div className="absolute right-8 top-14/20 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Coolest Classes...</h3>
          <p className="text-white text-sm leading-relaxed">
            Write about yourself here. This could include your background, interests, education, or anything you'd like to share about your personal journey.
          </p>
        </div>

        {/* Lower Left*/}
        <div className="absolute left-8 bottom-1/8 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Currently I'm...</h3>
          <p className="text-white text-sm leading-relaxed">
            Studying CS & Management @ MIT<br />
            Interning at Genius Sports
          </p>
        </div>

        {/* Hometown Image */}
        <div className="absolute left-8 top-4/10 transform -translate-y-1/2 w-1/4 bg-gray-800 bg-opacity-80 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Hometown</h3>
          <img 
            src="/components/austin-texas.png" 
            alt="Austin, Texas" 
            className="w-full h-70 object-contain rounded-lg mb-4"
          />
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
