import { useCart } from '@/hooks/use-cart';
import React from 'react';

const page = () => {
  const { items, removeItem } = useCart();
  return (
    <div>
      <h1>Shopping Cart</h1>
      <h2>Items in your shopping cart</h2>
    </div>
  );
};

export default page;
