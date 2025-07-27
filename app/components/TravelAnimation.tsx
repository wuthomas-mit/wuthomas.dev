import { useEffect, useState } from 'react';

interface TravelAnimationProps {
  isTraveling: boolean;
}

export const TravelAnimation = ({ isTraveling }: TravelAnimationProps) => {
  const [brightness, setBrightness] = useState(1);
  const [showBlinkEffect, setShowBlinkEffect] = useState(false);

  useEffect(() => {
    if (!isTraveling) {
      setBrightness(1);
      setShowBlinkEffect(false);
      // Clear any lingering travel overlay from sessionStorage
      sessionStorage.removeItem('travel-overlay-active');
      return;
    }

    // Mark travel overlay as active in sessionStorage
    sessionStorage.setItem('travel-overlay-active', 'true');

    // Phase 1: Speed up video and brighten screen over 5 seconds
    const brightnessDuration = 5000;
    const brightnessStart = Date.now();
    
    const brightnessInterval = setInterval(() => {
      const elapsed = Date.now() - brightnessStart;
      const progress = Math.min(elapsed / brightnessDuration, 1);
      
      const newBrightness = 1 + Math.pow(progress, 1.5) * 9; // 1 to 10
      setBrightness(newBrightness);
      
      if (progress >= 1) {
        clearInterval(brightnessInterval);
        
        // Phase 2: Blinking effect (eyes closing)
        setTimeout(() => {
          setShowBlinkEffect(true);
          // Add persistent overlay to body that survives navigation
          document.body.style.setProperty('--travel-overlay', 'block');
          document.body.classList.add('travel-overlay-active');
        }, 100);
      }
    }, 16); // ~60fps updates

    return () => {
      clearInterval(brightnessInterval);
    };
  }, [isTraveling]);

  if (!isTraveling) return null;

  return (
    <>
      {/* White overlay for brightness effect */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${Math.max(0, (brightness - 1) / 9)})`,
          transition: 'none',
        }}
      />
      
      {/* Blinking effect overlay */}
      {showBlinkEffect && (
        <div
          className="absolute inset-0 z-40 pointer-events-none bg-black"
          style={{
            animation: 'travel-blink 2s ease-in-out',
          }}
        />
      )}
    </>
  );
};
