import { useState } from 'react';

interface NavigationScreenProps {
  showNavigationScreen: boolean;
  setShowNavigationScreen: (show: boolean) => void;
  onNavigate: (path: string, name: string) => void;
}

export const NavigationScreen = ({
  showNavigationScreen,
  setShowNavigationScreen,
  onNavigate,
}: NavigationScreenProps) => {
  if (!showNavigationScreen) return null;

  return (
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
            {/* Star 1 - About Me */}
            <button
              onClick={() => onNavigate('/pages/aboutMe', 'About Me')}
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

            {/* Star 2 - Skills */}
            <button
              onClick={() => onNavigate('/pages/skills', 'Skills')}
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

            {/* Star 3 - Projects */}
            <button
              onClick={() => onNavigate('/pages/projects', 'Projects')}
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

            {/* Star 4 - Experiences */}
            <button
              onClick={() => onNavigate('/pages/experiences', 'Experiences')}
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

            {/* Star 5 - Contact */}
            <button
              onClick={() => onNavigate('/pages/contact', 'Contact + Links')}
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
  );
};
