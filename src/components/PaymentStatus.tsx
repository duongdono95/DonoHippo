'use client';
import { trpc } from '@/trpc/client';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface Props {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: Props) => {
  const router = useRouter();
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    { enabled: isPaid === false, refetchInterval: (data) => (data?.isPaid ? false : 1000) },
  );
  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);
  return (
    <Box sx={{ padding: '10px', bgcolor: 'var(--black01)', margin: '20px 0', borderRadius: '10px' }}>
      <Box sx={{ display: 'flex', gap: '10px', padding: '10px' }}>
        <p style={{ opacity: 0.7, minWidth: '150px' }}>Shipping to:</p>
        <p>{orderEmail}</p>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', padding: '10px' }}>
        <p style={{ opacity: 0.7, minWidth: '150px' }}>Order Status:</p>
        <p>{isPaid ? 'Payment Successful' : 'Pending Payment'}</p>
      </Box>
    </Box>
  );
};

export default PaymentStatus;
