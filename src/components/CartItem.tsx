import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '../hooks/generalHooks';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';
import { Box, IconButton } from '@mui/material';
import { ImageIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  product: Product;
}

const CartItem = ({ product }: Props) => {
  const { image } = product.images[0];
  const { removeItem } = useCart();

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
  return (
    <Box sx={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
      <Box sx={{ position: 'relative', width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden' }}>
        {typeof image !== 'string' && image.url ? <Image src={image.url} alt={product.name} fill /> : <ImageIcon />}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <p style={{ opacity: 0.8, fontSize: '14px' }} className={'text-overflow'}>
          {product.name}
        </p>
        <p style={{ opacity: 0.5, fontSize: '12px' }} className={'text-overflow'}>
          {label}
        </p>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton onClick={() => removeItem(product.id)}>
          <Trash size={16} />
        </IconButton>
        <p style={{ fontSize: '12px', color: 'var(--primary)', paddingTop: '20px' }}>{formatPrice(product.price)}</p>
      </Box>
    </Box>
  );
};

export default CartItem;
