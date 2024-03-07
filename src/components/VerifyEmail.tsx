'use client';
import { trpc } from '@/trpc/client';
import { Box } from '@mui/material';
import { Loader2, XCircle } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
  token: string;
}

const VerifyEmail = ({ token }: Props) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <XCircle size={24} color="red" />
        <h2>Failed to verify email</h2>
        <h3 style={{ opacity: 0.7 }}>There was a problem</h3>
        <p style={{ opacity: 0.7 }}>The token is not valid or might be expired, please try again.</p>
      </Box>
    );
  }
  if (data?.success) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative', width: '400px', height: '400px' }}>
          <Image src="/hippo-email-sent.png" fill alt="The Email was sent" />
        </Box>
        <h3 style={{ textAlign: 'center' }}>You are all set!</h3>
        <p style={{ textAlign: 'center' }}>Thank you for verifying your email</p>
        <Link href={'sign-in'}>Sign In</Link>
      </Box>
    );
  }
  if (true) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Loader2 size={24} color="var(--primary)" className="animated-rotation" />
        <h2>Verifying...</h2>
        <p style={{ opacity: 0.7 }}>This will not take long.</p>
      </Box>
    );
  }
};

export default VerifyEmail;
