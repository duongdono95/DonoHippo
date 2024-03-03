import { useEffect, useState } from 'react';

export const useDivSizeThroughRef = (ref: React.RefObject<HTMLDivElement>, type: 'height' | 'width') => {
  const [returnedValue, setReturnedValue] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        type === 'height' && setReturnedValue(ref.current.clientHeight);
        type === 'width' && setReturnedValue(ref.current.clientWidth);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref, type]);
  return returnedValue;
};
