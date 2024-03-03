'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  handleMenuOpen: (anchor: HTMLElement | null) => void;
}
export const NavItems = ({ handleMenuOpen }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <Box sx={{ display: 'flex', gap: ' 20px' }}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        return (
          <Button color="secondary" onClick={() => setActiveIndex(category.label)} sx={{ display: 'flex', gap: '5px' }}>
            <p style={{ color: 'var(--black07)' }}>{category.label}</p>
            <ChevronDown
              style={{ transition: '0.5s ease-in-out', transform: isOpen ? 'rotate(-180deg)' : undefined }}
            />
          </Button>
        );
      })}
    </Box>
  );
};
