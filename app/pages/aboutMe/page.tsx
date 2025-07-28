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
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/components/background-profile.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      </div>

      {/* Middle third transparent overlay */}
      <div className="absolute inset-0 w-full h-full flex">
        <div className="w-1/3 h-full"></div>
        <div className="w-1/3 h-full flex flex-col">
          <div className="h-[12vh]"></div>
          <div
            className="flex-1"
            style={{ backgroundColor: 'rgba(32, 50, 76, 0.7)' }}
          ></div>
          <div className="h-[8vh]"></div>
        </div>
        <div className="w-1/3 h-full"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-[2%] left-[2%] px-1 py-1 bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-lg font-semibold text-black text-xs"
        >
          ← Back
        </Link>

        {/* Name in top left */}
        <h1 className="absolute top-[10%] left-[3%] text-[4vw] font-bold text-white font-serif">
          Thomas Wu
        </h1>

        {/* Image in center */}
        <img
          src="/profile_pictures/armscrossed.png"
          alt="Thomas Wu"
          className="max-w-[30%] max-h-[40%] object-contain"
        />

        {/* Right text box */}
        <div
          className="absolute right-[5%] top-[25%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
          style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
        >
          <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">Passions...</h3>
          <p className="text-white text-[1.2vw] leading-relaxed">
            Working in Sports or Education<br />
          </p>
        </div>

        {/* Right text box */}
        <div
          className="absolute right-[5%] top-[50%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
          style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
        >
          <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">What Drives Me...</h3>
          <p className="text-white text-[1.2vw] leading-relaxed">
            Making an impact.
          </p>
        </div>

        {/* Right text box */}
        <div
          className="absolute right-[5%] top-[75%] transform -translate-y-1/2 w-[22%] p-[1%] rounded-lg"
          style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}
        >
          <h3 className="text-[1.5vw] font-bold text-cyan-400 mb-[1%]">Coolest Classes...</h3>
          <p className="text-white text-[1.2vw] leading-relaxed">
            6.S041
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
            Interning at Genius Sports
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

        {/* Theme selector at bottom */}
        <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2">
          <select className="bg-gray-800 text-white border border-gray-600 rounded-lg px-[1%] py-[0.5%] text-center text-[1vw] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
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
