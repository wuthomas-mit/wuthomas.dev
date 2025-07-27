import { useEffect, useState } from 'react';

interface HologramDialogProps {
  isDialogueComplete: boolean;
  setIsDialogueComplete: (complete: boolean) => void;
  hasAutoStarted: boolean;
  setHasAutoStarted: (started: boolean) => void;
  hasCheckedNavigation: boolean;
  isReturningUser: boolean;
  onTypingChange?: (isTyping: boolean) => void;
}

const hologramImages = ['closed-holo.png', 'open-holo.png', 'wide-holo.png'];
const dialogSentences = [
  "Hello! Nice to meet you!",
  "My name is Thomas Wu.",
  "I'm a rising senior at MIT studying Computer Science.",
  "Let me show you what I've done and where I've been.",
  "To explore, click on the navigation button to begin your journey!"
];

export const HologramDialog = ({
  isDialogueComplete,
  setIsDialogueComplete,
  hasAutoStarted,
  setHasAutoStarted,
  hasCheckedNavigation,
  isReturningUser,
  onTypingChange,
}: HologramDialogProps) => {
  const [showHologram, setShowHologram] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentHologramImage, setCurrentHologramImage] = useState('smile-holo.png');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  // Notify parent when typing state changes
  useEffect(() => {
    onTypingChange?.(isTyping);
  }, [isTyping, onTypingChange]);

  // Auto-start hologram after blinking animation finishes (only for fresh visits)
  useEffect(() => {
    if (!hasAutoStarted && hasCheckedNavigation) {
      // Only auto-start for new visitors, not returning users
      if (!isReturningUser) {
        const timer = setTimeout(() => {
          setShowHologram(true);
          setShowDialog(true);
          setIsTyping(true);
          setCurrentText('');
          setCurrentSentenceIndex(0);
          setHasAutoStarted(true);
        }, 6500); // 6s animation + 0.5s buffer

        return () => clearTimeout(timer);
      } else {
        // For returning users, mark as auto-started but don't show anything
        setHasAutoStarted(true);
      }
    }
  }, [hasAutoStarted, hasCheckedNavigation, isReturningUser, setHasAutoStarted]);

  // Typewriter effect
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
        setCurrentHologramImage('smile-holo.png');
        clearInterval(interval);
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [isTyping, showDialog, currentSentenceIndex]);

  // Auto-advance to next sentence after typing is complete, or hide dialog after last sentence
  useEffect(() => {
    if (!isTyping && currentText && showDialog) {
      if (currentSentenceIndex < dialogSentences.length - 1) {
        const timer = setTimeout(() => {
          setCurrentSentenceIndex(prev => prev + 1);
          setIsTyping(true);
          setCurrentText('');
        }, 2000); // 2 seconds between sentences

        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setShowDialog(false);
          setCurrentText('');
          setCurrentSentenceIndex(0);
          setCurrentHologramImage('smile-holo.png');
          setIsDialogueComplete(true); // Mark dialogue as complete
        }, 4000); // 4 seconds after last sentence

        return () => clearTimeout(timer);
      }
    }
  }, [isTyping, currentText, currentSentenceIndex, showDialog, setIsDialogueComplete]);

  // Cycle through hologram images while typing
  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setCurrentHologramImage(prev => {
        const currentIndex = hologramImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % hologramImages.length;
        return hologramImages[nextIndex];
      });
    }, 150); // Change image every 150ms

    return () => clearInterval(interval);
  }, [isTyping]);

  const handleHologramButtonClick = () => {
    console.log('Hologram button clicked!');
    if (!showHologram) {
      setShowHologram(true);
      setShowDialog(true);
      setIsTyping(true);
      setCurrentText('');
      setCurrentSentenceIndex(0);
      setHasAutoStarted(true);
    } else {
      setShowDialog(false);
      setIsTyping(false);
      setCurrentText('');
      setShowHologram(false);
      setCurrentHologramImage('smile-holo.png');
      setCurrentSentenceIndex(0);
    }
  };

  return (
    <>
      {/* Hologram Button */}
      <div className="absolute pointer-events-auto" style={{ left: '19.25%', top: '55.5%' }}>
        <button
          onClick={handleHologramButtonClick}
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
    </>
  );
};
