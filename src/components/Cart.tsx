import { formatPrice } from '@/hooks/generalHooks';
import { Box, Button, Divider, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const ListItem = styled('div')({
  width: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '20px 0',
});
const Cart = () => {
  const itemCount = 0;
  const fee = 1;
  return (
    <Box
      sx={{
        height: '100vh',
        padding: '50px 20px',
      }}
    >
      <h3 style={{ textAlign: 'center', opacity: 0.9 }}>Cart({itemCount})</h3>
      {itemCount > 0 ? (
        <Box>
          <h4 style={{ opacity: 0.7 }}>Cart Items</h4>
          <Divider sx={{ padding: '10px 0' }} />
          <Box sx={{ padding: '20px 10px' }}>
            <ListItem>
              <p>Shipping</p>
              <p>Free</p>
            </ListItem>
            <ListItem>
              <p>Transaction Fee</p>
              <p>{formatPrice(fee)}</p>
            </ListItem>
          </Box>
          <Link href={'/cart'}>
            <Button variant="contained" fullWidth>
              Continue To Checkout
            </Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ position: 'relative', width: '300px', height: '300px', margin: '30px 0' }}>
          <Image src="/hippo-empty-cart.png" fill alt={'Empty-Cart'} />
        </Box>
      )}
    </Box>
  );
};

export default Cart;
