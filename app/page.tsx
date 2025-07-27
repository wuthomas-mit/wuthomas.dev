'use client';

import { useEffect, useState } from 'react';

const hologramImages = ['closed-holo.png', 'open-holo.png', 'wide-holo.png'];
const dialogSentences = [
  "Hello! Nice to meet you!",
  "My name is Thomas Wu.",
  "I'm a rising senior at MIT studying Computer Science.",
  "Let me show you what I've done and where I've been.",
  "To explore, click on the map and begin our journey."
];

export default function Home() {
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showHologram, setShowHologram] = useState(false); // Hidden initially
  const [showDialog, setShowDialog] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentHologramImage, setCurrentHologramImage] = useState('smile-holo.png');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  // Auto-start hologram after blinking animation finishes (6 seconds)
  useEffect(() => {
    if (!hasAutoStarted) {
      const timer = setTimeout(() => {
        setShowHologram(true);
        setShowDialog(true);
        setIsTyping(true);
        setCurrentText('');
        setCurrentSentenceIndex(0);
        setHasAutoStarted(true);
      }, 6500); // 6s animation + 0.5s buffer

      return () => clearTimeout(timer);
    }
  }, [hasAutoStarted]);

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

  // Auto-advance to next sentence after typing is complete, or hide dialog after last sentence
  useEffect(() => {
    if (!isTyping && currentText && showDialog) {
      if (currentSentenceIndex < dialogSentences.length - 1) {
        // More sentences to show - advance to next
        const timer = setTimeout(() => {
          setCurrentSentenceIndex(prev => prev + 1);
          setIsTyping(true);
          setCurrentText('');
        }, 2000); // 2 second pause between sentences

        return () => clearTimeout(timer);
      } else {
        // Last sentence finished - hide dialog after a longer pause
        const timer = setTimeout(() => {
          setShowDialog(false);
          setCurrentText('');
          setCurrentSentenceIndex(0);
          setCurrentHologramImage('smile-holo.png');
        }, 4000); // 4 second pause after last sentence

        return () => clearTimeout(timer);
      }
    }
  }, [isTyping, currentText, currentSentenceIndex, showDialog]);

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
          left: '18%',
          top: '50.1%',
          width: '5vw',
          height: '3vw',
        }}
      />

      {/* UI Elements container - positioned above the cockpit */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {/* Hologram Button */}
        <div className="absolute pointer-events-auto" style={{ left: '19.25%', top: '55.5%' }}>
          <button
            onClick={() => {
              console.log('Hologram button clicked!');
              if (!showHologram && !showDialog) {
                // Show hologram and start dialog
                setShowHologram(true);
                setShowDialog(true);
                setIsTyping(true);
                setCurrentText('');
                setCurrentSentenceIndex(0);
                setHasAutoStarted(true); // Mark as manually started
              } else if (showHologram && !showDialog) {
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
                // Don't reset hasAutoStarted here - user can still manually control
              }
            }}
            className="relative group bg-yellow-500 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              width: '2.5vw',
              height: '1vw',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)',
              animation: 'hologram-button 2s infinite',
            }}
          >
            <div className="absolute inset-0 bg-yellow-400 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src="/message.png"
                alt="Center Icon"
                className="object-contain"
                style={{
                  width: '1.5vw',
                  height: '1.5vw',
                }}
              />
            </div>
          </button>
          
          {/* Hologram Image */}
          {showHologram && (
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '55%',
                bottom: '250%',
                transform: 'translateX(-50%)',
                marginBottom: '1vw',
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
                  maxHeight: '20vw',
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

        {/* Dialog Box - positioned independently on screen */}
        {showDialog && (
          <div 
            className="absolute pointer-events-auto"
            style={{
              left: '50%',
              top: '8%',
              transform: 'translateX(-50%)',
              height: '4vw',
            }}
          >
            <div 
              className="bg-black bg-opacity-80 border border-cyan-400 rounded-lg"
              style={{
                padding: '.5vw',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-cyan-300 leading-relaxed whitespace-nowrap overflow-hidden" style={{ fontSize: '1vw' }}>
                {currentText}
                {isTyping && (
                  <span className="inline-block bg-cyan-400 ml-1 animate-pulse" style={{
                    width: '0.3vw',
                    height: '1.5vw',
                  }}>|</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Blinking screen overlay */}
      <div className="absolute inset-0 z-30 w-full h-full blink-overlay pointer-events-none"></div>
    </div>
  );
}
