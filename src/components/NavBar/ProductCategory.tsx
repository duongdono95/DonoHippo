'use client';
import { Box, Button, Zoom } from '@mui/material';
import { Dispatch, SetStateAction, useRef } from 'react';
import Image from 'next/image';
import { useOutsideClick } from '@/hooks/generalHooks';
import { useRouter } from 'next/navigation';

const ProductCategory = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: ProductCategory;
  setActiveCategory: Dispatch<SetStateAction<ProductCategory | null>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setActiveCategory(null));
  const route = useRouter();
  return (
    <Zoom in={activeCategory ? true : false} mountOnEnter unmountOnExit>
      <Box
        ref={ref}
        sx={{
          maxWidth: '100vw',
          width: '100%',
          padding: '20px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            maxWidth: 'var(--default-layout-width)',
            width: '100%',
            margin: '0 auto',
            gap: '20px',
          }}
        >
          {activeCategory &&
            activeCategory.featured.map((feature) => {
              console.log(feature);
              return (
                <Box
                  key={feature.name}
                  sx={{
                    minWidth: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    ':hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Button
                    color="secondary"
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      padding: '10px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                    onClick={() => route.push(`${feature.href}`)}
                  >
                    <Image src={feature.imageSrc} alt={`${feature.name} Image`} width={250} height={180} />
                    <p style={{ textDecoration: 'none', fontSize: 14, color: 'var(--primary07)' }}>Shop Now</p>
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Zoom>
  );
};

export default ProductCategory;
