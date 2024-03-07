'use client';

import { TQueryValidator } from '@/types/generalTypes';
import { trpc } from '../trpc/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Product } from '../payload-types';
import { Box } from '@mui/material';
import ProductListing from './ProductListing';

interface Props {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: Props) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];
  if (products && products.length > 0) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 'var(--default-layout-width)',
        margin: '0 auto',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      {title ? <h2>{title}</h2> : null}
      {subtitle ? <p>{subtitle}</p> : null}
      {href ? (
        <Link href={href} style={{ display: 'flex', alignItems: 'center' }}>
          Shop the Collection <ArrowRight size={16} />
        </Link>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: 'var(--default-layout-width)',
        }}
      >
        {map.map((product, i) => (
          <ProductListing key={i} index={i} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductReel;
