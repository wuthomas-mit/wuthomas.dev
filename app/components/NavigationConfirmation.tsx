interface NavigationConfirmationProps {
  showConfirmation: boolean;
  destinationInfo: { path: string; name: string };
  onConfirm: () => void;
  onCancel: () => void;
}

export const NavigationConfirmation = ({
  showConfirmation,
  destinationInfo,
  onConfirm,
  onCancel,
}: NavigationConfirmationProps) => {
  if (!showConfirmation) return null;

  return (
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
              onClick={onConfirm}
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
              onClick={onCancel}
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
  );
};
