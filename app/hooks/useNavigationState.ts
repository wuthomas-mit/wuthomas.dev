import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationState {
  showNavigationScreen: boolean;
  showConfirmation: boolean;
  destinationInfo: { path: string; name: string };
}

export const useNavigationState = () => {
  const router = useRouter();
  const [showNavigationScreen, setShowNavigationScreen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState({ path: '', name: '' });

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

  return {
    showNavigationScreen,
    setShowNavigationScreen,
    showConfirmation,
    destinationInfo,
    handleNavigation,
    confirmNavigation,
    cancelNavigation,
  };
};
