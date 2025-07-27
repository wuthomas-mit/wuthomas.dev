'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAudioManager } from './hooks/useAudioManager';
import { HologramDialog } from './components/HologramDialog';
import { NavigationScreen } from './components/NavigationScreen';
import { NavigationConfirmation } from './components/NavigationConfirmation';
import { NavigateButton } from './components/NavigateButton';
import { VolumeButton } from './components/VolumeButton';

export default function Home() {
  const router = useRouter();
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showNavigationScreen, setShowNavigationScreen] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [hasCheckedNavigation, setHasCheckedNavigation] = useState(false);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState({ path: '', name: '' });
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  // Audio management using custom hook - need isTyping for audio
  const [isTyping, setIsTyping] = useState(false);
  const { spaceAudioRef, typingAudioRef } = useAudioManager({ isMuted, isTyping });

  const handleTypingChange = (typing: boolean) => {
    setIsTyping(typing);
  };

  // Function to handle navigation with confirmation
  const handleNavigation = (path: string, name: string) => {
    setDestinationInfo({ path, name });
    setShowConfirmation(true);
  };

  const confirmNavigation = () => {
    sessionStorage.setItem('hasVisitedHomePage', 'true');
    router.push(destinationInfo.path);
    setShowConfirmation(false);
  };

  const cancelNavigation = () => {
    setShowConfirmation(false);
    setDestinationInfo({ path: '', name: '' });
  };

  // Check navigation type on component mount
  useEffect(() => {
    if (!hasCheckedNavigation) {
      // Check if this is a fresh visit or returning from internal navigation
      const hasVisitedBefore = sessionStorage.getItem('hasVisitedHomePage');
      const referrer = document.referrer;
      const currentDomain = window.location.origin;
      
      // If user has visited before in this session OR came from our domain, they're returning
      if (hasVisitedBefore || (referrer && referrer.startsWith(currentDomain))) {
        setIsReturningUser(true);
        console.log('User is returning from another page or has visited before');
      } else {
        setIsReturningUser(false);
        console.log('User opened the page fresh (new tab, bookmark, external link)');
        // Mark that they've now visited the home page
        sessionStorage.setItem('hasVisitedHomePage', 'true');
      }
      
      setHasCheckedNavigation(true);
    }
  }, [hasCheckedNavigation]);

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
        {/* Hologram Dialog Component */}
        <HologramDialog
          isDialogueComplete={isDialogueComplete}
          setIsDialogueComplete={setIsDialogueComplete}
          hasAutoStarted={hasAutoStarted}
          setHasAutoStarted={setHasAutoStarted}
          hasCheckedNavigation={hasCheckedNavigation}
          isReturningUser={isReturningUser}
          onTypingChange={handleTypingChange}
        />

        {/* Navigate Button */}
        <NavigateButton
          onClick={() => {
            console.log('Navigate button clicked!');
            setShowNavigationScreen(true);
          }}
          isDialogueComplete={isDialogueComplete}
          isReturningUser={isReturningUser}
        />

        {/* Volume Button*/}
        <VolumeButton
          isMuted={isMuted}
          onToggle={() => {
            console.log('Volume button clicked!');
            setIsMuted(!isMuted);
          }}
        />

        {/* Navigation Screen Component */}
        <NavigationScreen
          showNavigationScreen={showNavigationScreen}
          setShowNavigationScreen={setShowNavigationScreen}
          onNavigate={handleNavigation}
        />

        {/* Navigation Confirmation Component */}
        <NavigationConfirmation
          showConfirmation={showConfirmation}
          destinationInfo={destinationInfo}
          onConfirm={confirmNavigation}
          onCancel={cancelNavigation}
        />
      </div>
      
      {/* Audio elements */}
      <audio
        ref={spaceAudioRef}
        loop
        preload="auto"
      >
        <source src="/space-audio.mp3" type="audio/mpeg" />
      </audio>
      
      <audio
        ref={typingAudioRef}
        loop
        preload="auto"
      >
        <source src="/digital-typing.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Blinking screen overlay */}
      <div className="absolute inset-0 z-30 w-full h-full blink-overlay pointer-events-none"></div>
    </div>
  );
}
