'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showHologram, setShowHologram] = useState(false); // Hidden initially
  const [showDialog, setShowDialog] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentHologramImage, setCurrentHologramImage] = useState('smile-holo.png');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const hologramImages = ['closed-holo.png', 'open-holo.png', 'wide-holo.png'];
  const dialogSentences = [
    "Hello! I'm Thomas's holographic assistant.",
    "Welcome to his digital cockpit.",
    "I can help you navigate through his projects and learn more about his work.",
    "What would you like to explore?"
  ];

  // Typewriter effect for current sentence
  useEffect(() => {
    if (!isTyping || !showDialog || currentSentenceIndex >= dialogSentences.length) return;

    const currentSentence = dialogSentences[currentSentenceIndex];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= currentSentence.length) {
        setCurrentText(currentSentence.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        setCurrentHologramImage('smile-holo.png'); // Return to default
        clearInterval(interval);
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [isTyping, showDialog, currentSentenceIndex]);

  // Cycle through hologram images while typing
  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setCurrentHologramImage(prev => {
        const currentIndex = hologramImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % hologramImages.length;
        return hologramImages[nextIndex];
      });
    }, 150); // Change image every __

    return () => clearInterval(interval);
  }, [isTyping]);

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
              if (!showHologram) {
                // First click - show hologram and start dialog
                setShowHologram(true);
                setShowDialog(true);
                setIsTyping(true);
                setCurrentText('');
                setCurrentSentenceIndex(0);
              } else if (!showDialog) {
                // Hologram visible but no dialog - start dialog
                setShowDialog(true);
                setIsTyping(true);
                setCurrentText('');
                setCurrentSentenceIndex(0);
              } else {
                // Dialog is open - close everything
                setShowDialog(false);
                setIsTyping(false);
                setCurrentText('');
                setShowHologram(false);
                setCurrentHologramImage('smile-holo.png');
                setCurrentSentenceIndex(0);
              }
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
                src={`/hologram/${currentHologramImage}`}
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

          {/* Dialog Box */}
          {showDialog && (
            <div 
              className="absolute pointer-events-auto"
              style={{
                left: '50%',
                bottom: '120%',
                transform: 'translateX(-50%)',
                marginBottom: '20px',
                minWidth: '300px',
                maxWidth: '400px',
              }}
            >
              <div 
                className="bg-black bg-opacity-80 border border-cyan-400 rounded-lg p-4"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="text-cyan-300 text-sm leading-relaxed">
                  {currentText}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse">|</span>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="mt-3 flex gap-2">
                  {!isTyping && currentText && currentSentenceIndex < dialogSentences.length - 1 && (
                    <button
                      onClick={() => {
                        setCurrentSentenceIndex(prev => prev + 1);
                        setIsTyping(true);
                        setCurrentText('');
                      }}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded transition-colors duration-200"
                    >
                      Next
                    </button>
                  )}
                  
                  {!isTyping && currentText && (
                    <button
                      onClick={() => {
                        setShowDialog(false);
                        setCurrentText('');
                        setShowHologram(false);
                        setCurrentHologramImage('smile-holo.png');
                        setCurrentSentenceIndex(0);
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded transition-colors duration-200"
                    >
                      {currentSentenceIndex >= dialogSentences.length - 1 ? 'Close' : 'Skip'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>


        
      </div>
      {/* Blinking screen overlay */}
      <div className="absolute inset-0 z-30 w-full h-full blink-overlay pointer-events-none"></div>
    </div>
  );
}
