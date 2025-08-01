import { useRef, useEffect } from 'react';

interface UseContactAudioManagerProps {
  isMuted: boolean;
  isInitialized: boolean; // Prevents auto-play before localStorage is loaded
}

export const useContactAudioManager = ({ isMuted, isInitialized }: UseContactAudioManagerProps) => {
  const mapleAudioRef = useRef<HTMLAudioElement>(null);

  // Audio management for background maple music
  useEffect(() => {
    if (!mapleAudioRef.current || !isInitialized) return;

    if (!isMuted) {
      mapleAudioRef.current.play().catch(console.error);
    } else {
      mapleAudioRef.current.pause();
    }
  }, [isMuted, isInitialized]);

  return {
    mapleAudioRef,
  };
};
