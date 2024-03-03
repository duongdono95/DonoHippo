'use client';
import { Box } from '@mui/material';
import { Icons } from '../Icons';
import { NavItems } from './NavItems';

export const Navbar = () => {
  return (
    <Box sx={{ position: 'fixed', width: '100vw', bgcolor: 'var(--white01)', backdropFilter: 'blur(10px)' }}>
      <Box
        style={{
          maxWidth: 'var(--default-layout-width)',
          width: '100%',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--primary05)',
          zIndex: 10,
        }}
      >
        <Icons.logo />
        <NavItems />
      </Box>
    </Box>
  );
};
