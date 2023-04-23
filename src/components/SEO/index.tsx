import Logo from '@/public/logo.png';
import Head from 'next/head';

const TITLE = 'wanderlust';
const DESC =
  'Community driven exploration. Find your next new adventure on an endless journey with us!';

const SEO = () => (
  <Head>
    <title>{TITLE}</title>
    <meta name="description" content={DESC} />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta property="og:url" content="https://wander.acmucsd.com" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="wanderlust" />
    <meta property="og:title" content={TITLE} />
    <meta property="og:image" content={Logo.src} />
    <meta property="og:description" content={DESC} />
  </Head>
);

export default SEO;
