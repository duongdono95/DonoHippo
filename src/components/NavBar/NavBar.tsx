'use client';
import { Box, Menu } from '@mui/material';
import { Icons } from '../Icons';
import { NavItems } from './NavItems';
import { useState } from 'react';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (anchor: HTMLElement | null) => {
    setAnchorEl(anchor);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        maxWidth: 'var(--default-layout-width)',
        width: '100%',
        padding: '10px 20px',
        margin: '0 auto',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--white01)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--primary05)',
        zIndex: 1000,
      }}
    >
      <Icons.logo />
      <NavItems handleMenuOpen={handleMenuOpen} />
      <Menu open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'absolute',
            top: '100px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'var(--default-layout-width)',
            width: '100vw',
            padding: '20px',
            ':hover': {
              bgcolor: 'red',
            },
          }}
        >
          {/* {category.featured.map((feature) => (
            <Box key={feature.name} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="secondary" sx={{ width: '100%', justifyContent: 'flex-start', color: 'var(--black07)' }}>
                <Link href={feature.href}>
                  <Box width={400} height={200}>
                    <Image src={feature.imageSrc} alt={`${feature.name} Image`} fill />
                  </Box>
                  <p>Shop Now</p>
                </Link>
              </Button>
            </Box>
          ))} */}
        </Box>
      </Menu>
    </div>
  );
};
