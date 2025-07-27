import { useRef, useEffect } from 'react';

interface UseAudioManagerProps {
  isMuted: boolean;
  isTyping: boolean;
  isTraveling?: boolean;
}

export const useAudioManager = ({ isMuted, isTyping, isTraveling = false }: UseAudioManagerProps) => {
  const spaceAudioRef = useRef<HTMLAudioElement>(null);
  const typingAudioRef = useRef<HTMLAudioElement>(null);
  const launchAudioRef = useRef<HTMLAudioElement>(null);

  // Audio management for background space audio
  useEffect(() => {
    if (!spaceAudioRef.current) return;

    if (!isMuted) {
      spaceAudioRef.current.play().catch(console.error);
    } else {
      spaceAudioRef.current.pause();
    }
  }, [isMuted]);

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
