'use client';

import { useState } from 'react';
import { useAudioManager } from './hooks/useAudioManager';
import { useNavigationState } from './hooks/useNavigationState';
import { useImageDimensions } from './hooks/useImageDimensions';
import { useUserSession } from './hooks/useUserSession';
import { HologramDialog } from './components/HologramDialog';
import { NavigationScreen } from './components/NavigationScreen';
import { NavigationConfirmation } from './components/NavigationConfirmation';
import { NavigateButton } from './components/NavigateButton';
import { VolumeButton } from './components/VolumeButton';
import { CockpitLayout } from './components/CockpitLayout';

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  // Custom hooks
  const { imageDimensions, aspectRatio, isLoading } = useImageDimensions('/website_ship.png');
  const { isReturningUser, hasCheckedNavigation } = useUserSession();
  const {
    showNavigationScreen,
    setShowNavigationScreen,
    showConfirmation,
    destinationInfo,
    handleNavigation,
    confirmNavigation,
    cancelNavigation,
  } = useNavigationState();

  // Audio management using custom hook - need isTyping for audio
  const [isTyping, setIsTyping] = useState(false);
  const { spaceAudioRef, typingAudioRef } = useAudioManager({ isMuted, isTyping });

  const handleTypingChange = (typing: boolean) => {
    setIsTyping(typing);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  return (
    <CockpitLayout aspectRatio={aspectRatio!}>
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
            setShowNavigationScreen(true);
          }}
          isDialogueComplete={isDialogueComplete}
          isReturningUser={isReturningUser}
        />

        {/* Volume Button*/}
        <VolumeButton
          isMuted={isMuted}
          onToggle={() => {
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
    </CockpitLayout>
  );
}
