import { PRODUCT_CATEGORIES } from '@/config';
import { getPayloadClient } from '../../../get-payload';
import React from 'react';
import { notFound } from 'next/navigation';
import './styles.scss';
import Link from 'next/link';
import { Check, Shield, Slash } from 'lucide-react';
import { Button, Divider } from '@mui/material';
import ImageSlider from '@/components/ImageSlider';
import ProductReel from '@/components/ProductReel';
import AddToCartButton from '@/components/AddToCartButton';
interface Props {
  params: {
    productId: string;
  };
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
];

const page = async ({ params }: Props) => {
  const { productId } = params;

  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  });

  const [product] = products;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];
  return (
    <div className="product-page">
      <div className="content">
        <div className="breadcrumb">
          {BREADCRUMBS.map((category, index) => (
            <div className="items">
              <Link href={category.href} key={index} style={{ color: 'var(--black07)' }}>
                {category.name}
              </Link>
              {index !== BREADCRUMBS.length - 1 && (
                <Slash color="var(--black02)" size={15} style={{ marginLeft: '10px' }} />
              )}
            </div>
          ))}
        </div>
        <h1>{product.name}</h1>
        <div className="intro">
          <p style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
          <Divider orientation="vertical" flexItem />
          <p style={{ opacity: 0.7, fontSize: 14 }}>{label}</p>
        </div>

        <ImageSlider urls={validUrls} size={400} />
        <AddToCartButton product={product} />
        <p>{product.description}</p>
        <div className="item">
          <Check color="var(--success)" />
          <p style={{ opacity: 0.7, fontSize: 14 }}>Eligible for instant Delivery</p>
        </div>
        <div className="item">
          <Shield color="var(--warning)" />
          <p style={{ opacity: 0.7, fontSize: 14 }}>30 Days return guarantee</p>
        </div>
      </div>
      <div className="product-reel">
        <ProductReel
          href="/products"
          query={{ category: product.category, limit: 4 }}
          title={`Similar ${label}`}
          subtitle={`Browse similar high-quality ${label} just like ${product.name}`}
        />
      </div>
    </div>
  );
};

export default page;
