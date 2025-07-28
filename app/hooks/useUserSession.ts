import { useState, useEffect } from 'react';

export const useUserSession = () => {
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [hasCheckedNavigation, setHasCheckedNavigation] = useState(false);

  useEffect(() => {
    if (!hasCheckedNavigation) {
      // Check if this is a fresh visit or returning from internal navigation
      const hasVisitedBefore = sessionStorage.getItem('hasVisitedHomePage');
      const referrer = document.referrer;
      const currentDomain = window.location.origin;
      
      // If user has visited before in this session OR came from our domain, they're returning
      if (hasVisitedBefore || (referrer && referrer.startsWith(currentDomain))) {
        setIsReturningUser(true);
        // console.log('User is returning from another page or has visited before');
      } else {
        setIsReturningUser(false);
        // console.log('User opened the page fresh');
        // Mark that they've now visited the home page
        sessionStorage.setItem('hasVisitedHomePage', 'true');
      }
      
      setHasCheckedNavigation(true);
    }
  }, [hasCheckedNavigation]);

  return {
    isReturningUser,
    hasCheckedNavigation,
  };
};
