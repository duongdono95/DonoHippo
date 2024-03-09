'use client';

import { useCart } from '@/hooks/use-cart';
import { Box, Button, IconButton } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '../../hooks/generalHooks';
import { Check, Loader2, TrashIcon } from 'lucide-react';
import { trpc } from '../../trpc/client';
import { useRouter } from 'next/navigation';
const page = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const { mutate: createCheckoutSession, isLoading } = trpc.payment.createSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce((total, { product }) => total + product.price, 0);

  const fee = 1;
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <h2>Items in your shopping cart</h2>
      {items.length === 0 ? (
        <div className="empty-cart-container">
          <Image
            src={'/hippo-empty-cart.png'}
            width={360}
            height={360}
            loading="eager"
            alt="empty shopping cart hippo"
          />
        </div>
      ) : null}
      {isMounted &&
        items.map(({ product }) => {
          const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label;
          const { image } = product.images[0];
          return (
            <div key={product.name} className="cart-item">
              {typeof image !== 'string' && image.url ? (
                <Box sx={{ position: 'relative', width: 200, height: 200, borderRadius: '10px', overflow: 'hidden' }}>
                  <Image fill src={image.url} alt="product image" />
                </Box>
              ) : null}
              <div className="component">
                <p style={{ opacity: 0.7 }} className="overflow-text">
                  {product.name}
                </p>
                <p style={{ fontSize: 14, opacity: 0.5 }}>
                  <span>Category: </span> {label}
                </p>
                <p style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
                <div className="group">
                  <Check size={20} color={'var(--success)'} />
                  <p> Eligibal for instant delivery</p>
                </div>
                <Button
                  onClick={() => removeItem(product.id)}
                  className="trash-icon"
                  aria-label="remove-button"
                  variant="outlined"
                  color="error"
                >
                  <TrashIcon size={20} color="red" /> Remove
                </Button>
              </div>
            </div>
          );
        })}
      <div className="order-summary">
        <h3>Order Summary:</h3>
        <div className="item">
          <p style={{ opacity: 0.5 }}>Subtotal:</p>
          <p>{isMounted ? formatPrice(cartTotal) : <Loader2 className="animated-rotation" />}</p>
        </div>
        <div className="item">
          <p style={{ opacity: 0.5 }}>Flat Transaction Fee</p>
          <p>{isMounted ? formatPrice(fee) : <Loader2 className="animated-rotation" />}</p>
        </div>
        <div className="item">
          <p style={{ opacity: 0.5 }}>Order Total: </p>
          <p style={{ color: 'var(--primary)' }}>
            {isMounted ? formatPrice(fee + cartTotal) : <Loader2 className="animated-rotation" />}
          </p>
        </div>
        <Button
          onClick={() => createCheckoutSession({ productIds })}
          disabled={items.length === 0 || isLoading}
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          {isLoading ? <Loader2 size={20} className="animated-rotation" /> : null}
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default page;
