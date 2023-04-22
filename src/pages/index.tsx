/**
 * Example page component
 */
import styles from '@/styles/pages/Home.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import Map, { Marker } from 'react-map-gl';

const Home: NextPage = () => {
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  return (
    <div className={styles.container}>
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
          <img src="pin.png" />
        </Marker>
      </Map>
    </div>
  );
};

export default Home;
