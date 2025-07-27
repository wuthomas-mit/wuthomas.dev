interface CockpitLayoutProps {
  aspectRatio: number;
  children: React.ReactNode;
}

export const CockpitLayout = ({ aspectRatio, children }: CockpitLayoutProps) => {
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

      {/* Children (UI Elements) */}
      {children}
    </div>
  );
};
