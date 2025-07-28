import { useState, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

export const useImageDimensions = (imageSrc: string) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${imageSrc}`);
      setIsLoading(false);
    };
    
    img.src = imageSrc;
  }, [imageSrc]);

  const aspectRatio = imageDimensions 
    ? imageDimensions.width / imageDimensions.height 
    : null;

  return {
    imageDimensions,
    aspectRatio,
    isLoading,
  };
};
