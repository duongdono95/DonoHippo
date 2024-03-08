'use client';
import { Icons } from '@/components/Icons';
import { trpc } from '@/trpc/client';
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/types/generalTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');
  const continueAsSeller = () => {
    router.push('?as=seller');
  };
  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err) {
        if (err.data?.code === 'UNAUTHORIZED') toast.error('Invalidate Email or Password');

        return;
      }
      toast.error('Something went wrong. Please try again.');
    },
    onSuccess: () => {
      toast.success(`Sign In successfully.`);
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push('/sell');
        return;
      }
      router.refresh();
      router.push('/');
    },
  });
  const onsubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <div className="sign-up-page">
      <form onSubmit={handleSubmit(onsubmit)} className="form">
        <Icons.logo />
        <h2>Sign In to your {isSeller ? 'Seller' : ''} Account</h2>
        <p className="guide">
          Do not have an account with us? <Link href={'/sign-up'}>Sign Up</Link>
        </p>

        <TextField
          {...register('email')}
          variant="outlined"
          label="Email"
          type="email"
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email ? errors.email.message : undefined}
        />
        <TextField
          {...register('password')}
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : undefined}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ margin: '20px' }}>
          Sign In
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ height: '2px', backgroundColor: 'var(--black01)', width: '100px' }}></div>
          <p style={{ opacity: 0.7 }}> Or</p>
          <div style={{ height: '2px', backgroundColor: 'var(--black01)', width: '100px' }}></div>
        </Box>

        {isSeller ? (
          <Button onClick={continueAsBuyer} disabled={isLoading}>
            Continue as customer
          </Button>
        ) : (
          <Button onClick={continueAsSeller}>Continue as Seller</Button>
        )}
      </form>
    </div>
  );
};

export default page;
