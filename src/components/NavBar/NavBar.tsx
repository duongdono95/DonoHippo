'use client';
import { AppBar, Box, Button, Divider, Drawer, IconButton } from '@mui/material';
import { Icons } from '../Icons';
import { NavItems } from './NavItems';
import { useEffect, useRef, useState } from 'react';
import { CircleUser, ShoppingCart } from 'lucide-react';
import Cart from '../Cart';
import { useRouter } from 'next/navigation';
import { User } from '@/payload-types';
import UserAccountNav from './UserAccountNav';
import Link from 'next/link';

interface Props {
  user: User | null;
}

export const Navbar = ({ user }: Props) => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  const [localUser, setLocalUser] = useState<User | null>(null);
  const route = useRouter();
  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);
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
        <Link href={'/'}>
          <Icons.logo />
        </Link>
        <NavItems appBarRef={appBarRef} />
        {localUser ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserAccountNav user={user} />
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={toggleDrawer(true)}>
              <ShoppingCart size={20} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="text" color="info" onClick={() => route.push('/sign-in')}>
              Sign In
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button variant="outlined" color="primary" onClick={() => route.push('/sign-up')}>
              Create Account
            </Button>
          </Box>
        )}
      </Box>
      <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
        <Cart toggleDrawer={toggleDrawer} />
      </Drawer>
    </AppBar>
  );
};
