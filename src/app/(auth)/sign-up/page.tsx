'use client';
import { Icons } from '@/components/Icons';
import { trpc } from '@/trpc/client';
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/types/generalTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const router = useRouter();
  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?');

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error('Something went wrong. Please try again.');
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push('/verify-email?to=' + sentToEmail);
    },
  });
  const onsubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <div className="sign-up-page">
      <form onSubmit={handleSubmit(onsubmit)} className="form">
        <Icons.logo />
        <h2>Create an Account</h2>
        <p className="guide">
          Already have an account? <Link href={'/sign-in'}>Sign In</Link>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default page;
