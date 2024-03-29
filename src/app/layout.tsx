import AppGeneralConfig from '@/GlobalStyles/AppGeneralConfig';
import { Navbar } from '@/components/NavBar/NavBar';

import { getServerSideUser } from '@/libs/payload.utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { User } from '@/payload-types';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DonoHippy',
  description: 'An E-Commercial Web App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppGeneralConfig>
          <Navbar user={user} />
          {children}
        </AppGeneralConfig>
      </body>
    </html>
  );
}
