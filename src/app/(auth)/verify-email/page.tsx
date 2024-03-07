import VerifyEmail from '@/components/VerifyEmail';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {token && typeof token === 'string' ? (
        <Box>
          <VerifyEmail token={token} />
        </Box>
      ) : (
        <div>
          <Box sx={{ width: '400px', height: '400px', position: 'relative' }}>
            <Image src="/hippo-email-sent.png" fill alt="Hippo email sent message" />
          </Box>
          <h3 style={{ textAlign: 'center' }}>{`Please Check your Email :)`}</h3>
          <p style={{ textAlign: 'center' }}>
            {`We've sent a verification Link to`} {toEmail ?? 'your Email'}
          </p>
        </div>
      )}
    </Box>
  );
};

export default VerifyEmailPage;
