import AppGeneralConfig from '@/GlobalStyles/AppGeneralConfig';
import { Navbar } from '@/components/NavBar/NavBar';
import Provider from '@/components/Provider';
import { getServerSideUser } from '@/libs/payload.utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
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
      <Provider>
        <AppGeneralConfig>
          <body className={inter.className}>
            <Navbar user={user} />
            {children}
          </body>
        </AppGeneralConfig>
      </Provider>
    </html>
  );
}
