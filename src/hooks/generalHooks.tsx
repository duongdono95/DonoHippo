import { RefObject, useEffect, useState } from 'react';

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

export const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
