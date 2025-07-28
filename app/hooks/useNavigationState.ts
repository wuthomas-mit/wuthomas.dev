import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationState {
  showNavigationScreen: boolean;
  showConfirmation: boolean;
  destinationInfo: { path: string; name: string };
  isTraveling: boolean;
}

export const useNavigationState = () => {
  const router = useRouter();
  const [showNavigationScreen, setShowNavigationScreen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState({ path: '', name: '' });
  const [isTraveling, setIsTraveling] = useState(false);

  const handleNavigation = (path: string, name: string) => {
    setDestinationInfo({ path, name });
    setShowConfirmation(true);
  };

  const confirmNavigation = () => {
    // Close navigation screens immediately
    setShowNavigationScreen(false);
    setShowConfirmation(false);
    
    // Start travel animation
    setIsTraveling(true);
    
    // Navigate to the new page during the black blink effect
    setTimeout(() => {
      sessionStorage.setItem('hasVisitedHomePage', 'true');
      router.push(destinationInfo.path);
      // Don't set isTraveling to false here - let the new page handle it
    }, 5100); // Right when blink effect starts
  };

  const cancelNavigation = () => {
    setShowConfirmation(false);
    setDestinationInfo({ path: '', name: '' });
  };

  return {
    showNavigationScreen,
    setShowNavigationScreen,
    showConfirmation,
    destinationInfo,
    isTraveling,
    handleNavigation,
    confirmNavigation,
    cancelNavigation,
  };
};
