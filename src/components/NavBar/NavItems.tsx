'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import { Box, Button, Popover } from '@mui/material';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCategory from './ProductCategory';

interface Props {
  appBarRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const NavItems = ({ appBarRef }: Props) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <Box sx={{ display: 'flex', gap: ' 20px' }}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        return (
          <Button
            key={i}
            color="secondary"
            sx={{ display: 'flex', gap: '5px' }}
            onClick={(e) => {
              activeCategory === null && setActiveCategory(category);
              setAnchorEl(appBarRef.current);
            }}
          >
            <p style={{ color: 'var(--black07)' }}>{category.label}</p>
            <ChevronDown
              style={{
                transition: '0.5s ease-in-out',
                transform: activeCategory === category ? 'rotate(-180deg)' : undefined,
              }}
            />
          </Button>
        );
      })}
      {activeCategory && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ProductCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </Popover>
      )}
    </Box>
  );
};
