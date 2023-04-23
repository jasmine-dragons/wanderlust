import { GeoLocation, MapItemType } from '@/lib/types';
import HeartPin from '@/public/heartpin.png';
import Pin from '@/public/pin.png';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Map, { GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl';
import styles from './style.module.scss';

const ucla: GeoLocation = {
  lng: 34.0689,
  lat: -118.4452,
};

interface IProps {
  markers: MapItemType[];
  goTo: GeoLocation | null;
  favorites: MapItemType[];
}

const MapComponent = (props: IProps) => {
  const { markers, goTo, favorites } = props;

  const mapRef = useRef<MapRef>(null);

  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;

  useEffect(() => {
    if (!goTo) return;

    mapRef.current?.flyTo({
      center: [goTo.lng, goTo.lat],
    });
  }, [goTo]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{
        longitude: ucla.lat,
        latitude: ucla.lng,
        zoom: 14,
        pitch: 75,
      }}
      maxZoom={18}
      minZoom={10}
      projection="globe"
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/nishantbalaji/clgsr9lyg001301q12ajhb47e"
    >
      {markers.map((item: MapItemType) => (
        <Marker key={item.id} {...item.coordinates}>
          <Image src={Pin} width={48} height={48} alt="pin" className={styles.pin} />
        </Marker>
      ))}
      {favorites.map((item: MapItemType) => (
        <Marker key={item.id} {...item.coordinates}>
          <Image src={HeartPin} width={36} height={48} alt="pin" className={styles.pin} />
        </Marker>
      ))}
      <NavigationControl position="bottom-right" visualizePitch />
      <GeolocateControl
        trackUserLocation
        showUserHeading={false}
        showAccuracyCircle={false}
        position="bottom-right"
      />
    </Map>
  );
};

export default MapComponent;
