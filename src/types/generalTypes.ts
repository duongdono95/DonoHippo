import { z } from 'zod';

interface FeaturedItem {
  name: string;
  href: string;
  imageSrc: string;
}

interface ProductCategory {
  label: string;
  value: 'ui_kits' | 'icons';
  featured: FeaturedItem[];
}

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
});

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;
