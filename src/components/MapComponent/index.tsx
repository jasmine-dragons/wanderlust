import ThreeJS from '@/components/ThreeJS';
import { Canvas } from '@react-three/fiber';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import Map, { GeolocateControl, MapRef, Marker } from 'react-map-gl';
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
      obj: '/shiba/scene.gltf',
      type: 'gltf',
      scale: 25,
      units: 'meters',
      anchor: 'center',
      rotation: { x: -90, y: 0, z: 180 },
      adjustment: { x: 0, y: 0, z: 1.5 },
    },
    base: {
      obj: '/shiba/scene.gltf',
      type: 'gltf',
      scale: 40,
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
        addAdornment();
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

const MapComponent = () => {
  const mapRef = useRef<MapRef>(null);
  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;

  const addFood = (map: any, origin: Location) => {
    let model: any;

    window.tb.loadObj(models.food.adornment, function (obj: any) {
      model = obj.setCoords([origin.lat, origin.lng]);
      window.tb.add(model);

      // comment out animation for now -
      // first needa figure out how to get this whole thing to work
      let rotation = 0;
      function animate() {
        setTimeout(function () {
          requestAnimationFrame(animate);
        }, 1000 / 20);
        model.setRotation({ x: 0, y: 0, z: (rotation += 10) });
      }

      animate();
    });
  };

  const mapLoad = () => {
    const map = mapRef.current?.getMap();
    if (!map) {
      console.log('failed load');
      return;
    }
    window.map = map;
    console.log('map load!');
    loadLocation(map, 'food', ucla);
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
      }}
      projection="globe"
      style={{ width: '90vw', height: '90vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={ucla.lat} latitude={ucla.lng} anchor="bottom">
        {/* <img src="pin.png" /> */}
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ThreeJS />
        </Canvas>
      </Marker>
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
