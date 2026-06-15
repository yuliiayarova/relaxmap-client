import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@/styles/global.css';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import AuthProvider from './(auth routes)/AuthProvider';
import Footer from '@/components/Footer/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RelaxMap — Discover and Save Recreational Places',
  description:
    'Explore recreational locations, discover new places, save favorites, read reviews, and share your own experiences with the RelaxMap community.',
  openGraph: {
    title: 'RelaxMap — Discover and Save Recreational Places',
    description:
      'Find recreational locations, save favorite spots, read reviews, and explore places recommended by the community.',
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: 'RelaxMap',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <TanStackProvider>
          <AuthProvider>
            <div className="appLayout">
              <Header />

              <main className="appContent">{children}</main>

              <Footer />
            </div>

            {modal}

            <Toaster position="bottom-center" />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
