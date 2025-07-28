interface VolumeButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const VolumeButton = ({
  isMuted,
  onToggle,
}: VolumeButtonProps) => {
  return (
    <div className="absolute pointer-events-auto" style={{ 
      right: '2%', 
      top: '2%'
    }}>
      <button
        onClick={onToggle}
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
  );
};
