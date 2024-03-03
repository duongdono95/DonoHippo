'use client';
import { Box, Button, Link } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useOutsideClick } from '@/hooks/generalHooks';

const ProductCategory = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: ProductCategory;
  setActiveCategory: Dispatch<SetStateAction<ProductCategory | null>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setActiveCategory(null));

  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        top: '200px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'var(--default-layout-width)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        zIndex: 100,
      }}
    >
      {activeCategory &&
        activeCategory.featured.map((feature) => {
          console.log(feature);
          return (
            <Box key={feature.name} sx={{ minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
              <Button color="secondary" sx={{ width: '100%', justifyContent: 'flex-start', color: 'var(--black07)' }}>
                {/* <Link href={feature.href}> */}
                <Box width={300} height={200}>
                  <Image src={feature.imageSrc} alt={`${feature.name} Image`} fill />
                </Box>
                <p>Shop Now</p>
                {/* </Link> */}
              </Button>
            </Box>
          );
        })}
    </Box>
  );
};

export default ProductCategory;
