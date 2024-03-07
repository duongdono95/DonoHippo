'use client';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ShoppingBasket } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';

const AddToCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addItem } = useCart();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [isSuccess]);
  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      sx={{ maxWidth: '400px', width: '100%' }}
      variant="contained"
      color={isSuccess ? 'success' : 'primary'}
    >
      {isSuccess ? (
        'Added'
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingBasket style={{ marginRight: '10px' }} /> Add To Cart
        </Box>
      )}
    </Button>
  );
};

export default AddToCartButton;
