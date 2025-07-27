import { useRef, useEffect } from 'react';

interface UseAudioManagerProps {
  isMuted: boolean;
  isTyping: boolean;
}

export const useAudioManager = ({ isMuted, isTyping }: UseAudioManagerProps) => {
  const spaceAudioRef = useRef<HTMLAudioElement>(null);
  const typingAudioRef = useRef<HTMLAudioElement>(null);

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

  return {
    spaceAudioRef,
    typingAudioRef,
  };
};
