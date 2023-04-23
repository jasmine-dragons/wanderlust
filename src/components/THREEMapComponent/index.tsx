import { Binoculars } from '@/components/ThreeJS';
import { MapItemType } from '@/lib/types';
import { Canvas } from '@react-three/fiber';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import Map, { GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl';
import { Threebox } from 'threebox-plugin';

declare var window: any;

type Transform = { x: number; y: number; z: number };
type ModelOptions = {
  obj: string; // path to file
  type: string; // probably "gltf"
  scale: number;
  units: string; // probably "meters"
  anchor: string; // probably "center"
  rotation: Transform; // default rotation
  adjustment?: Transform;
};

type CompoundModelOptions = {
  // the static "base" of a model
  base: ModelOptions;
  // the smaller, rotating "adornment" of a model
  adornment: ModelOptions;
};

const models = {
  food: {
    adornment: {
      obj: '/burger/scene.gltf',
      type: 'gltf',
      scale: 60,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
      adjustment: { x: 0, y: 0, z: 1.5 },
    },
    base: {
      obj: '/burger/scene.gltf',
      type: 'gltf',
      scale: 1000,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
    },
  },

  entertainment: {
    adornment: {
      obj: '/microphone/scene.gltf',
      type: 'gltf',
      scale: 60,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
      adjustment: { x: 0, y: 0, z: 1.5 },
    },
    base: {
      obj: '/microphone/scene.gltf',
      type: 'gltf',
      scale: 0.5,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
    },
  },
  sightseeing: {
    adornment: {
      obj: '/binoculars/scene.gltf',
      type: 'gltf',
      scale: 10,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
      adjustment: { x: 0, y: 0, z: 1.5 },
    },
    base: {
      obj: '/binoculars/scene.gltf',
      type: 'gltf',
      scale: 1000,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
    },
  },
} satisfies Record<string, CompoundModelOptions>;

type ModelType = keyof typeof models;

type MapLocation = { type: ModelType } & Location;

function loadLocation(map: mapboxgl.Map, modelType: ModelType, location: Location) {
  map.addLayer({
    id: modelType,
    type: 'custom',
    renderingMode: '3d',
    onAdd(_map, ctx) {
      window.tb = new Threebox(_map, ctx, { defaultLights: true });
      window.tb.loadObj(models[modelType].base, (obj: any) => {
        const model = obj.setCoords([location.lat, location.lng]);
        window.tb.add(model);
        // addAdornment();
      });
    },
    render(gl, matrix) {
      window.tb.update();
    },
  });

  function addAdornment() {
    window.tb.loadObj(models[modelType].adornment, (obj: any) => {
      const model = obj.setCoords([location.lat, location.lng]);
      window.tb.add(model);

      // rotate adornment
      let rotation = 0;
      function animate() {
        setTimeout(() => {
          requestAnimationFrame(animate);
        }, 1000 / 20); // rotate ~20 times/s
        model.setRotation({ x: 0, y: 0, z: (rotation = (rotation - 10) % 360) });
      }
      animate();
    });
  }
}

interface Location {
  lat: number;
  lng: number;
}

const ucla: Location = {
  lng: 34.0689,
  lat: -118.4452,
};

interface IProps {
  items: MapItemType[];
  callHover: () => void;
}
const THREEMapComponent = (props: IProps) => {
  const { items, callHover } = props;

  const mapRef = useRef<MapRef>(null);
  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;

  // useEffect({mapRef.current.setData()}, [items]);

  const mapLoad = () => {
    const map = mapRef.current?.getMap();
    if (!map) {
      return;
    }
    window.map = map;

    items.forEach((marker: MapItemType) => {
      const loc: Location = {
        lat: marker.coordinates.latitude,
        lng: marker.coordinates.longitude,
      };
      console.log(marker.name);
      console.log(marker.type);
      console.log(marker.coordinates);

      console.log({ marker });
      marker.type = 'food';

      if (marker.type == 'food') {
        loadLocation(map, marker.type, loc);
      } else if (marker.type == 'entertainment') {
        loadLocation(map, marker.type, loc);
      } else if (marker.type == 'sightseeing') {
        loadLocation(map, marker.type, loc);
      }
    });
  };

  return (
    <Map
      ref={mapRef}
      onLoad={mapLoad}
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
      {items.map(item => {
        <Marker anchor="bottom" {...item.coordinates}>
          <img src="pin.png" />
        </Marker>;
      })}

      <Marker longitude={ucla.lat} latitude={ucla.lng} anchor="bottom">
        <img src="pin.png" />
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Binoculars />
        </Canvas>
      </Marker>
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

export default THREEMapComponent;
