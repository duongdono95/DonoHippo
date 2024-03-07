'use client';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/payload-types';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
interface Props {
  user: null | User;
}

const UserAccountNav = ({ user }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { signOut } = useAuth();
  return (
    <div>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        variant="text"
        color="info"
        sx={{ display: 'flex', gap: '10px' }}
      >
        <CircleUser size={20} />
        My Account
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem>{user?.email}</MenuItem>
        <Divider />
        <MenuItem>
          <Link href={'/sell'}>Seller Dashboard</Link>
        </MenuItem>
        <MenuItem onClick={signOut}>Log Out</MenuItem>
      </Menu>
    </div>
  );
};

export default UserAccountNav;
