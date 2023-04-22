/**
 * Example page component
 */
import LoginButton from '@/components/LoginButton';
import MapComponent from '@/components/MapComponent';
import styles from '@/styles/pages/Home.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session?.user]);

  return (
    <div className={styles.container}>
      <LoginButton />
      <h1>Hello, {session?.user?.name}</h1>
      <MapComponent />
    </div>
  );
};

export default Home;
