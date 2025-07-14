'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showHologram, setShowHologram] = useState(false);

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
      
      {/* Image Caster positioned on cockpit */}
      <img
        src="/image-caster.png"
        alt="Image Caster"
        className="absolute z-20"
        style={{
          left: '17.5%',
          top: '50.1%',
          width: 'auto',
          height: 'auto',
          maxWidth: '100px',
          maxHeight: '100px',
        }}
      />

      {/* UI Elements container - positioned above the cockpit */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {/* Tablet Button */}
        <div className="absolute pointer-events-auto" style={{ left: '47.69%', top: '85%' }}>
          <button
            onClick={() => {
              console.log('Glowing button clicked!');
            }}
            className="relative group w-16 h-16 rounded-full bg-blue-500 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)',
              animation: 'pulse-box 2s infinite'
            }}
          >
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="w-3 h-3 bg-white rounded-full opacity-90"></div>
            </div>
          </button>
        </div>
        {/* Hologram Button */}
        <div className="absolute pointer-events-auto" style={{ left: '19.5%', top: '55.5%' }}>
          <button
            onClick={() => {
              console.log('Hologram button clicked!');
              setShowHologram(!showHologram);
            }}
            className="relative group w-10 h-4 bg-yellow-500 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)',
              animation: 'hologram-button 2s infinite',
            }}
          >
            <div className="absolute inset-0 bg-yellow-400 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src="/message.png"
                alt="Center Icon"
                className="w-6 h-6 object-contain"
              />
            </div>
          </button>
          
          {/* Hologram Image */}
          {showHologram && (
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                bottom: '200%',
                transform: 'translateX(-50%)',
                marginBottom: '20px',
                background: 'transparent',
              }}
            >
              <img
                src="/me-hologram-smile.png"
                alt="Hologram"
                className="object-contain"
                style={{
                  animation: 'pulse-filter 2s infinite',
                  filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(0, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.6))',
                  maxWidth: 'none',
                  maxHeight: '200px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  mixBlendMode: 'screen',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>
          )}
        </div>


        
      </div>
      {/* Blinking screen overlay */}
      <div className="absolute inset-0 z-30 w-full h-full blink-overlay pointer-events-none"></div>
    </div>
  );
}
