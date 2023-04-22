/**
 * Example page component
 */
import LoginButton from '@/components/LoginButton';
import ThreeJS from '@/components/ThreeJS';
import styles from '@/styles/pages/Home.module.scss';
import { Canvas } from '@react-three/fiber';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session?.user]);
  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;
  return (
    <div className={styles.container}>
      <LoginButton />
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        projection="globe"
        style={{ width: '90vw', height: '90vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={-122.4} latitude={37.8} anchor="bottom">
          {/* <img src="pin.png" /> */}
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <ThreeJS />
          </Canvas>
        </Marker>
      </Map>
    </div>
  );
};

export default Home;
