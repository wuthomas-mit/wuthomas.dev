'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);

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

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showCoordinates) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setClickPosition({ x, y });
      console.log(`Position: left: '${x.toFixed(1)}%', top: '${y.toFixed(1)}%'`);
    }
  };

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
      className="relative bg-black overflow-hidden mx-auto cursor-crosshair"
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: `${100 * aspectRatio}vh`,
        maxHeight: `${100 / aspectRatio}vw`,
      }}
      onClick={handleContainerClick}
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
        {/* Positioning helper toggle */}
        <button
          className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded pointer-events-auto transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setShowCoordinates(!showCoordinates);
            setClickPosition(null);
          }}
        >
          {showCoordinates ? 'Hide Coordinates' : 'Show Coordinates'}
        </button>

        {/* Coordinate display */}
        {showCoordinates && clickPosition && (
          <div
            className="absolute pointer-events-none bg-black bg-opacity-80 text-white text-xs p-2 rounded"
            style={{
              left: `${clickPosition.x}%`,
              top: `${clickPosition.y}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            left: '{clickPosition.x.toFixed(1)}%'<br/>
            top: '{clickPosition.y.toFixed(1)}%'
          </div>
        )}
      </div>
    </div>
  );
}
