interface NavigateButtonProps {
  onClick: () => void;
  isDialogueComplete: boolean;
  isReturningUser: boolean;
}

export const NavigateButton = ({
  onClick,
  isDialogueComplete,
  isReturningUser,
}: NavigateButtonProps) => {
  return (
    <div className="absolute pointer-events-auto" style={{ 
      left: '50%', 
      top: '70.75%', 
      transform: 'translate(-50%, -50%)' 
    }}>
      <button
        onClick={onClick}
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
  );
};
