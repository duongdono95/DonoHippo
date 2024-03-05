'use client';
import { Icons } from '@/components/Icons';
import { trpc } from '@/trpc/client';
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/types/generalTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import './styles.scss';
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  console.log(errors);
  // const { data } = trpc.auth.useQuery();
  const onsubmit = ({ email, password }: TAuthCredentialsValidator) => {};

  return (
    <div className="sign-up-page">
      <form onSubmit={handleSubmit(onsubmit)} className="form">
        <Icons.logo />
        <h2>Create an Account</h2>
        <p className="guide">
          Already have an account? <Link href={'/sign-in'}>Sign In</Link>
        </p>

        <TextField {...register('email')} variant="outlined" label="Email" type="email" fullWidth />
        {/* {errors.email && <p>{errors.email.message}</p>} */}
        <TextField {...register('password')} variant="outlined" label="Password" type="password" fullWidth />
        <Button variant="contained" fullWidth sx={{ margin: '20px' }}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default page;
