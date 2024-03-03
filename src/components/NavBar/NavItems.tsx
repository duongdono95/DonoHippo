'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import { Box, Button } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCategory from './ProductCategory';

export const NavItems = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  console.log(activeCategory);
  return (
    <Box sx={{ display: 'flex', gap: ' 20px' }}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        return (
          <Button
            key={i}
            color="secondary"
            sx={{ display: 'flex', gap: '5px' }}
            onClick={() => setActiveCategory(category)}
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
      {activeCategory && <ProductCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
    </Box>
  );
};
