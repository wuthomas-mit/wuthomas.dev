import { useState, useEffect } from 'react';

const AUDIO_STORAGE_KEY = 'wuthomas-audio-muted';

export const useGlobalAudioState = () => {
  const [isMuted, setIsMuted] = useState(true); // Default to muted for new users
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial state from localStorage on mount
  useEffect(() => {
    const savedMutedState = localStorage.getItem(AUDIO_STORAGE_KEY);
    const hasCleared = sessionStorage.getItem('audio-cleared-this-session');
    
    // Only clear localStorage once per browser session
    if (!hasCleared) {
      localStorage.removeItem(AUDIO_STORAGE_KEY);
      sessionStorage.setItem('audio-cleared-this-session', 'true');
      setIsMuted(true);
    } else {
      if (savedMutedState !== null) {
        try {
          const parsedState = JSON.parse(savedMutedState);
          setIsMuted(parsedState);
        } catch (error) {
          setIsMuted(true);
          localStorage.removeItem(AUDIO_STORAGE_KEY);
        }
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(isMuted));
    }
  }, [isMuted, isInitialized]);

  const toggleMuted = () => {
    setIsMuted(prev => !prev);
  };

  return {
    isMuted,
    setIsMuted,
    toggleMuted,
    isInitialized,
  };
};
