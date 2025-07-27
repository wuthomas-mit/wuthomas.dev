'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAudioManager } from './hooks/useAudioManager';

const hologramImages = ['closed-holo.png', 'open-holo.png', 'wide-holo.png'];
const dialogSentences = [
  "Hello! Nice to meet you!",
  "My name is Thomas Wu.",
  "I'm a rising senior at MIT studying Computer Science.",
  "Let me show you what I've done and where I've been.",
  "To explore, click on the navigation button to begin your journey!"
];

export default function Home() {
  const router = useRouter();
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showHologram, setShowHologram] = useState(false); // Hidden initially
  const [showDialog, setShowDialog] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentHologramImage, setCurrentHologramImage] = useState('smile-holo.png');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showNavigationScreen, setShowNavigationScreen] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [hasCheckedNavigation, setHasCheckedNavigation] = useState(false);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState({ path: '', name: '' });

  // Audio management using custom hook
  const { spaceAudioRef, typingAudioRef } = useAudioManager({ isMuted, isTyping });

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
  }, [hasAutoStarted, hasCheckedNavigation, isReturningUser]);

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

        {/* Navigate Button */}
        <div className="absolute pointer-events-auto" style={{ 
          left: '50%', 
          top: '70.75%', 
          transform: 'translate(-50%, -50%)' 
        }}>
          <button
            onClick={() => {
              console.log('Navigate button clicked!');
              setShowNavigationScreen(true);
            }}
            className="relative group transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              width: '11.5vw',
              height: '6vw',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)',
              animation: (isDialogueComplete || isReturningUser) ? 'hologram-button 2s infinite' : 'none',
            }}
          >
            <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
            
            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src="/icons/navigate.png"
                alt="Navigate"
                className="object-contain"
                style={{
                  width: '2.5vw',
                  height: '2.5vw',
                }}
              />
            </div>
          </button>
        </div>

        {/* Volume Button*/}
        <div className="absolute pointer-events-auto" style={{ 
          right: '2%', 
          top: '2%'
        }}>
          <button
            onClick={() => {
              console.log('Volume button clicked!');
              setIsMuted(!isMuted);
            }}
            className="relative group transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              width: '3vw',
              height: '3vw',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid #FFD700',
              borderRadius: '50%',
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.2)',
            }}
          >
            <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
            
            <div className="relative flex items-center justify-center w-full h-full">
              <div 
                className="text-yellow-400"
                style={{
                  fontSize: '1.2vw',
                  fontWeight: 'bold',
                }}
              >
                🔊
              </div>
              {/* Muted Line */}
              {isMuted && (
                <div 
                  className="absolute"
                  style={{
                    width: '2.5vw',
                    height: '0.2vw',
                    backgroundColor: '#FF0000',
                    transform: 'rotate(45deg)',
                    borderRadius: '1px',
                    boxShadow: '0 0 5px rgba(255, 0, 0, 0.8)',
                  }}
                />
              )}
            </div>
          </button>
        </div>

        {/* Navigation Screen Overlay */}
        {showNavigationScreen && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-auto"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(0.5vw)',
            }}
          >
            <div className="relative">
              {/* Futuristic Screen Frame*/}
              <div 
                className="relative inline-block"
                style={{
                  border: '0.3vw solid #00FFFF',
                  backgroundColor: 'rgba(0, 20, 40, 0.95)',
                  boxShadow: '0 0 3vw rgba(0, 255, 255, 0.5), inset 0 0 3vw rgba(0, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, rgba(0, 50, 100, 0.8) 0%, rgba(0, 20, 60, 0.9) 100%)',
                  padding: '.25vw',
                  borderRadius: '1.5vw',
                }}
              >
                {/* Top Frame Elements */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: '-0.2vw',
                    width: '12vw',
                    height: '1.2vw',
                    backgroundColor: '#00FFFF',
                    clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                    boxShadow: '0 0 1.5vw rgba(0, 255, 255, 0.8)',
                  }}
                />

                {/* Grid Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '2.5vw 2.5vw',
                    borderRadius: '1.5vw',
                  }}
                />

                {/* Stellar Nursery Image Container */}
                <div className="relative inline-block" style={{ padding: '1.5vw' }}>
                  <img
                    src="/stellar_nursery.jpg"
                    alt="Stellar Nursery"
                    className="block rounded-lg"
                    style={{
                      width: 'min(50vw, 700px)',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'brightness(1.1) contrast(1.2) drop-shadow(0 0 2vw rgba(0, 255, 255, 0.3))',
                      border: '0.1vw solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '1.5vw',
                    }}
                  />

                  {/* Interactive Stars */}
                  {/* Star 1 */}
                  <button
                    onClick={() => handleNavigation('/aboutMe', 'About Me')}
                    className="absolute group transition-all duration-300 hover:scale-125 active:scale-95"
                    style={{
                      left: '12.2%',
                      top: '15.4%',
                      width: '1.5vw',
                      height: '1.5vw',
                      color: '#ffffffff',
                      fontSize: '1.5vw',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))',
                      animation: 'twinkle 2s infinite',
                    }}
                    title="Learn about me!"
                  >
                    ✦
                  </button>

                  {/* Star 1 Label */}
                  <div
                    className="absolute text-cyan-300 text-center pointer-events-none"
                    style={{
                      left: '13.75%',
                      top: '21.25%',
                      fontSize: '0.7vw',
                      textShadow: '0 0 5px rgba(0, 255, 255, 0.6)',
                      whiteSpace: 'nowrap',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    About Me
                  </div>

                  {/* Star 2 */}
                  <button
                    onClick={() => handleNavigation('/skills', 'Skills')}
                    className="absolute group transition-all duration-300 hover:scale-125 active:scale-95"
                    style={{
                      left: '28.6%',
                      top: '30.25%',
                      width: '1.5vw',
                      height: '1.5vw',
                      color: '#ffffffff',
                      fontSize: '1vw',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))',
                      animation: 'twinkle 2.5s infinite',
                    }}
                    title="My Skills!"
                  >
                    ✦
                  </button>

                  {/* Star 2 Label */}
                  <div
                    className="absolute text-cyan-300 text-center pointer-events-none"
                    style={{
                      left: '30%',
                      top: '34.5%',
                      fontSize: '0.7vw',
                      textShadow: '0 0 5px rgba(0, 255, 255, 0.6)',
                      whiteSpace: 'nowrap',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    Skills
                  </div>

                  {/* Star 3 */}
                  <button
                    onClick={() => handleNavigation('/projects', 'Projects')}
                    className="absolute group transition-all duration-300 hover:scale-125 active:scale-95"
                    style={{
                      left: '38.7%',
                      top: '31.2%',
                      transform: 'translate(-50%, -50%)',
                      width: '1.5vw',
                      height: '1.5vw',
                      color: '#ffffffff',
                      fontSize: '1vw',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))',
                      animation: 'twinkle 1.8s infinite',
                    }}
                    title="My Projects!"
                  >
                    ✦
                  </button>

                  {/* Star 3 Label */}
                  <div
                    className="absolute text-cyan-300 text-center pointer-events-none"
                    style={{
                      left: '40.25%',
                      top: '35%',
                      fontSize: '0.7vw',
                      textShadow: '0 0 5px rgba(0, 255, 255, 0.6)',
                      whiteSpace: 'nowrap',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    Projects
                  </div>

                  {/* Star 4 */}
                  <button
                    onClick={() => handleNavigation('/experiences', 'Experiences')}
                    className="absolute group transition-all duration-300 hover:scale-125 active:scale-95"
                    style={{
                      left: '29.5%',
                      bottom: '52.5%',
                      width: '1.5vw',
                      height: '1.5vw',
                      color: '#ffffffff',
                      fontSize: '1vw',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))',
                      animation: 'twinkle 2.2s infinite',
                    }}
                    title="My Experiences!"
                  >
                    ✦
                  </button>

                  {/* Star 4 Label */}
                  <div
                    className="absolute text-cyan-300 text-center pointer-events-none"
                    style={{
                      left: '31%',
                      bottom: '49.75%',
                      fontSize: '0.7vw',
                      textShadow: '0 0 5px rgba(0, 255, 255, 0.6)',
                      whiteSpace: 'nowrap',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    Experiences
                  </div>

                  {/* Star 5 */}
                  <button
                    onClick={() => handleNavigation('/contact', 'Contact + Links')}
                    className="absolute group transition-all duration-300 hover:scale-125 active:scale-95"
                    style={{
                      left: '19.5%',
                      bottom: '48.6%',
                      width: '1.5vw',
                      height: '1.5vw',
                      color: '#ffffffff',
                      fontSize: '1.5vw',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))',
                      animation: 'twinkle 3s infinite',
                    }}
                    title="Contact me!"
                  >
                    ✦
                  </button>

                  {/* Star 5 Label */}
                  <div
                    className="absolute text-cyan-300 text-center pointer-events-none"
                    style={{
                      left: '20.75%',
                      bottom: '44%',
                      fontSize: '0.7vw',
                      textShadow: '0 0 5px rgba(0, 255, 255, 0.6)',
                      whiteSpace: 'nowrap',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    Contact + Links
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowNavigationScreen(false)}
                    className="absolute flex items-center justify-center text-cyan-400 hover:text-white transition-colors duration-300"
                    style={{
                      top: '1vw',
                      right: '1vw',
                      width: '2vw',
                      height: '2vw',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      border: '0.1vw solid #00FFFF',
                      borderRadius: '50%',
                      fontSize: '1vw',
                      fontWeight: 'bold',
                      boxShadow: '0 0 1vw rgba(0, 255, 255, 0.5)',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Confirmation Popup */}
        {showConfirmation && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(1vw)',
            }}
          >
            <div className="relative">
              {/* Confirmation Modal */}
              <div 
                className="relative inline-block"
                style={{
                  border: '0.3vw solid #00FFFF',
                  backgroundColor: 'rgba(0, 20, 40, 0.98)',
                  boxShadow: '0 0 3vw rgba(0, 255, 255, 0.6), inset 0 0 2vw rgba(0, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, rgba(40, 20, 0, 0.9) 0%, rgba(20, 10, 40, 0.95) 100%)',
                  padding: '2vw',
                  borderRadius: '1.5vw',
                  minWidth: '25vw',
                  textAlign: 'center',
                }}
              >
                {/* Title */}
                <div 
                  className="text-cyan-300 font-bold mb-4"
                  style={{
                    fontSize: '1.5vw',
                    textShadow: '0 0 1vw rgba(0, 255, 255, 0.8)',
                    marginBottom: '1.5vw',
                  }}
                >
                  Travel Confirmation
                </div>

                {/* Message */}
                <div 
                  className="text-cyan-300 mb-6"
                  style={{
                    fontSize: '1vw',
                    lineHeight: '1.4',
                    marginBottom: '2vw',
                    textShadow: '0 0 0.5vw rgba(0, 255, 255, 0.6)',
                  }}
                >
                  Do you want to travel to<br />
                  <span className="text-yellow-300 font-semibold">{destinationInfo.name}</span>?
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                  {/* Confirm Button */}
                  <button
                    onClick={confirmNavigation}
                    className="relative group transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: 'rgba(0, 100, 0, 0.8)',
                      border: '0.15vw solid #00FF00',
                      borderRadius: '0.8vw',
                      padding: '0.8vw 1.5vw',
                      color: '#00FF00',
                      fontSize: '0.9vw',
                      fontWeight: 'bold',
                      boxShadow: '0 0 1.5vw rgba(0, 255, 0, 0.4)',
                      cursor: 'pointer',
                      marginRight: '1vw',
                    }}
                  >
                    <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
                    <span className="relative">Yes!</span>
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={cancelNavigation}
                    className="relative group transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: 'rgba(100, 0, 0, 0.8)',
                      border: '0.15vw solid #FF0000',
                      borderRadius: '0.8vw',
                      padding: '0.8vw 1.5vw',
                      color: '#FF4444',
                      fontSize: '0.9vw',
                      fontWeight: 'bold',
                      boxShadow: '0 0 1.5vw rgba(255, 0, 0, 0.4)',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
                    <span className="relative">Not Yet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
