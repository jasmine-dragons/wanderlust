import { GeoLocation, MapItemType } from '@/lib/types';
import Pin from '@/public/pin.png';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Map, { GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl';

declare var window: any;

const ucla: GeoLocation = {
  lng: 34.0689,
  lat: -118.4452,
};

interface IProps {
  markers: MapItemType[];
  goTo: GeoLocation | null;
}
const MapComponent = (props: IProps) => {
  const { markers, goTo } = props;

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
      minZoom={12}
      projection="globe"
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/nishantbalaji/clgsr9lyg001301q12ajhb47e"
    >
      {markers.map((item: MapItemType, i: number) => (
        <Marker key={i} {...item.coordinates}>
          {/* <button
            onClick={() => {
              console.log({ item });
            }}
          > */}
          <Image src={Pin} width={48} height={48} alt="pin" />
          {/* </button> */}
        </Marker>
      ))}
      <NavigationControl position="bottom-right" visualizePitch={true} />
      <GeolocateControl
        trackUserLocation={true}
        showUserHeading={false}
        showAccuracyCircle={false}
        position="bottom-right"
      />
    </Map>
  );
};

export default MapComponent;
