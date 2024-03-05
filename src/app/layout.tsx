import AppGeneralConfig from '@/GlobalStyles/AppGeneralConfig';
import Provider from '@/components/Provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DonoHippy',
  description: 'An E-Commercial Web App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <AppGeneralConfig>
          <body className={inter.className}>{children}</body>
        </AppGeneralConfig>
      </Provider>
    </html>
  );
}
