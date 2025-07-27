import { useRef, useEffect } from 'react';

interface CockpitLayoutProps {
  aspectRatio: number;
  children: React.ReactNode;
  isTraveling?: boolean;
}

export const CockpitLayout = ({ aspectRatio, children, isTraveling = false }: CockpitLayoutProps) => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  // Handle video speed changes during travel
  useEffect(() => {
    if (!isTraveling) {
      // Reset video speeds
      if (videoRef1.current) videoRef1.current.playbackRate = 1;
      if (videoRef2.current) videoRef2.current.playbackRate = 1;
      return;
    }

    // Speed up videos over 5 seconds
    const speedDuration = 5000;
    const speedStart = Date.now();
    
    const speedInterval = setInterval(() => {
      const elapsed = Date.now() - speedStart;
      const progress = Math.min(elapsed / speedDuration, 1);
      
      // Speed increases from 1x to 8x
      const newSpeed = 1 + progress * 7;
      
      if (videoRef1.current) videoRef1.current.playbackRate = newSpeed;
      if (videoRef2.current) videoRef2.current.playbackRate = newSpeed;
      
      if (progress >= 1) {
        clearInterval(speedInterval);
      }
    }, 16); // ~60fps updates

    return () => {
      clearInterval(speedInterval);
    };
  }, [isTraveling]);
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
        ref={videoRef1}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/space_background.mp4" type="video/mp4" />
      </video>
      
      {/* Video mask to match cockpit shape */}
      <div 
        className="absolute inset-0 w-full h-full z-5"
        style={{
          WebkitMask: "url('/components/website_ship.png')",
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          mask: "url('/components/website_ship.png')",
          maskSize: '100% 100%',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
        }}
      >
        <video
          ref={videoRef2}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/space_background.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Cockpit overlay */}
      <img
        src="/components/website_ship.png"
        alt="Cockpit"
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      
      {/* Image Caster positioned on cockpit */}
      <img
        src="/components/image-caster.png"
        alt="Image Caster"
        className="absolute z-20"
        style={{
          left: '18%',
          top: '50.1%',
          width: '5vw',
          height: '3vw',
        }}
      />

      {/* Children (UI Elements) */}
      {children}
    </div>
  );
};
