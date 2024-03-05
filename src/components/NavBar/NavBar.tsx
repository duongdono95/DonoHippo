'use client';
import { AppBar, Box, Button, Divider, Drawer, IconButton } from '@mui/material';
import { Icons } from '../Icons';
import { NavItems } from './NavItems';
import { useRef, useState } from 'react';
import { CircleUser, ShoppingCart } from 'lucide-react';
import Cart from '../Cart';

export const Navbar = () => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const user = true;
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  return (
    <AppBar
      color="transparent"
      sx={{ backgroundColor: 'var(--white01)', backdropFilter: 'blur(10px)', boxShadow: 'none' }}
    >
      <Box
        ref={appBarRef}
        style={{
          position: 'relative',
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
        <NavItems appBarRef={appBarRef} />
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="text" color="info" sx={{ display: 'flex', gap: '10px' }}>
              <CircleUser size={20} />
              My Account
            </Button>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={toggleDrawer(true)}>
              <ShoppingCart size={20} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="text" color="info">
              Sign In
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button variant="outlined" color="info">
              Create Account
            </Button>
          </Box>
        )}
      </Box>
      <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
        <Cart />
      </Drawer>
    </AppBar>
  );
};
