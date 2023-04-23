import { MapItemType } from '@/lib/types';
import Pin from '@/public/pin.png';
import Image from 'next/image';
import { useRef } from 'react';
import Map, { GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl';

declare var window: any;

interface Location {
  lat: number;
  lng: number;
}

const ucla: Location = {
  lng: 34.0689,
  lat: -118.4452,
};

interface IProps {
  markers: MapItemType[];
  goTo: Location;
}
const MapComponent = (props: IProps) => {
  const { markers, goTo } = props;

  const mapRef = useRef<MapRef>(null);
  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;

  console.log({ markers });

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
      // maxZoom={18}
      // minZoom={12}
      projection="globe"
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {markers.map((item: MapItemType) => (
        <Marker
          key={item.id}
          longitude={parseInt(item.coordinates.longitude)}
          latitude={parseInt(item.coordinates.latitude)}
          anchor="bottom"
        >
          <button
            onClick={() => {
              console.log({ item });
            }}
          >
            <Image src={Pin} width={48} height={48} alt="pin" />
          </button>
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
