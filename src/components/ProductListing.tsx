'use client';
import { Box, Skeleton } from '@mui/material';
import { Product } from '../payload-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '@/hooks/generalHooks';
import ImageSlider from './ImageSlider';

const ProductPlaceHolder = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '0 auto' }}>
      <Skeleton variant="rectangular" width={250} height={250} sx={{ borderRadius: '10px' }} />
      <Skeleton variant="rectangular" width={200} height={20} sx={{ borderRadius: '5px' }} />
      <Skeleton variant="rectangular" width={150} height={20} sx={{ borderRadius: '5px' }} />
      <Skeleton variant="rectangular" width={50} height={20} sx={{ borderRadius: '5px' }} />
    </Box>
  );
};

interface Props {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);
  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product?.category)?.label;
  if (!product || !isVisible) return <ProductPlaceHolder />;

  if (isVisible && product) {
    const validUrls = product.images
      .map(({ image }) => (typeof image === 'string' ? image : image.url))
      .filter(Boolean) as string[];
    return (
      <Link href={`/product/${product.id}`}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '0 auto', color: 'var(--black07)' }}>
          <ImageSlider urls={validUrls} />
          <h4>{product.name}</h4>
          <p style={{ opacity: 0.7 }}>{label}</p>
          <p style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
        </Box>
      </Link>
    );
  }

  return <div>ProductListing</div>;
};

export default ProductListing;
