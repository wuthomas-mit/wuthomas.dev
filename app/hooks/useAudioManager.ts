import { useRef, useEffect } from 'react';

interface UseAudioManagerProps {
  isMuted: boolean;
  isTyping: boolean;
  isTraveling?: boolean;
  isInitialized: boolean;
  isReturningUser?: boolean;
}

export const useAudioManager = ({ 
  isMuted, 
  isTyping, 
  isTraveling = false, 
  isInitialized,
  isReturningUser = false 
}: UseAudioManagerProps) => {
  const spaceAudioRef = useRef<HTMLAudioElement>(null);
  const typingAudioRef = useRef<HTMLAudioElement>(null);
  const launchAudioRef = useRef<HTMLAudioElement>(null);

  // Track when user manually enables audio (user interaction) in sessionStorage
  useEffect(() => {
    if (!isMuted && isInitialized) {
      sessionStorage.setItem('wuthomas-audio-user-interacted', 'true');
    }
  }, [isMuted, isInitialized]);

  // Audio management for background space audio
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!spaceAudioRef.current || !isInitialized) return;

      const hasUserInteracted = sessionStorage.getItem('wuthomas-audio-user-interacted') === 'true';
      
      if (!isMuted) {
        if (isReturningUser || hasUserInteracted) {
          spaceAudioRef.current.play().catch(() => {
            // Silently ignore autoplay errors
          });
        }
      } else {
        spaceAudioRef.current.pause();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMuted, isInitialized, isReturningUser]);

  // Audio management for typing sound
  useEffect(() => {
    if (!typingAudioRef.current) return;

    if (!isMuted && isTyping) {
      typingAudioRef.current.play().catch(console.error);
    } else {
      typingAudioRef.current.pause();
    }
  }, [isMuted, isTyping]);

  // Audio management for launch sound during travel
  useEffect(() => {
    if (!launchAudioRef.current) return;

    if (!isMuted && isTraveling) {
      launchAudioRef.current.currentTime = 0; // Reset to beginning
      launchAudioRef.current.play().catch(console.error);
    } else {
      launchAudioRef.current.pause();
    }
  }, [isMuted, isTraveling]);

  return {
    spaceAudioRef,
    typingAudioRef,
    launchAudioRef,
  };
};
