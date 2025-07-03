'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = '/website_ship.png';
  }, []);

  if (!imageDimensions) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const aspectRatio = imageDimensions.width / imageDimensions.height;
  
  return (
    <div 
      className="relative bg-black overflow-hidden mx-auto"
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: `${100 * aspectRatio}vh`,
        maxHeight: `${100 / aspectRatio}vw`,
      }}
    >
      {/* Space background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/space_background.mp4" type="video/mp4" />
      </video>
      
      {/* Video mask to match cockpit shape */}
      <div 
        className="absolute inset-0 w-full h-full z-5"
        style={{
          WebkitMask: "url('/website_ship.png')",
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          mask: "url('/website_ship.png')",
          maskSize: '100% 100%',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/space_background.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Cockpit overlay */}
      <img
        src="/website_ship.png"
        alt="Cockpit"
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      
      {/* UI Elements container - positioned above the cockpit */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {/* Systems Online indicator */}
        <div className="absolute top-4 left-4 text-white text-sm font-mono pointer-events-auto">
          <p>Systems Online</p>
        </div>

        {/* Left Navigation Button */}
        <button
          className="absolute pointer-events-auto bg-transparent hover:bg-yellow-400 hover:bg-opacity-30 border-2 border-yellow-400 border-opacity-60 rounded transition-all duration-200 flex items-center justify-center"
          style={{
            left: '43.6%',
            top: '83.9%',
            width: '1%',
            height: '4.5%',
            boxShadow: '0 0 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 215, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.boxShadow = '0 0 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 215, 0, 0.2)';
          }}
          onClick={() => {
            setSelectedMenu(Math.max(0, selectedMenu - 1));
            console.log('Left button clicked, menu:', selectedMenu - 1);
          }}
        >
          <span className="text-white text-xs">◀</span>
        </button>

        {/* Right Navigation Button */}
        <button
          className="absolute pointer-events-auto bg-transparent hover:bg-yellow-400 hover:bg-opacity-30 border-2 border-yellow-400 border-opacity-60 rounded transition-all duration-200 flex items-center justify-center"
          style={{
            left: '55.25%',
            top: '84.2%',
            width: '1%',
            height: '4.5%',
            boxShadow: '0 0 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 215, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.boxShadow = '0 0 5px rgba(255, 215, 0, 0.4), inset 0 0 5px rgba(255, 215, 0, 0.2)';
          }}
          onClick={() => {
            setSelectedMenu(selectedMenu + 1);
            console.log('Right button clicked, menu:', selectedMenu + 1);
          }}
        >
          <span className="text-white text-xs">▶</span>
        </button>

        {/* Current Menu Indicator */}
        <div className="absolute top-4 right-4 text-white text-sm font-mono pointer-events-none">
          <p>Menu: {selectedMenu}</p>
        </div>
      </div>
    </div>
  );
}
