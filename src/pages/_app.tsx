import '@/styles/globals.scss';
import '@/styles/reset.scss';
import '@/styles/vars.scss';
import { SessionProvider } from 'next-auth/react';

import { DM_Sans as DMSans } from 'next/font/google';

import type { AppProps } from 'next/app';

const dmSans = DMSans({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        * {
          font-family: ${dmSans.style.fontFamily}, sans-serif;
        }
      `}</style>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
