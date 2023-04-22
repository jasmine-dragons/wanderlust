import ThreeJS from '@/components/ThreeJS';
import { Canvas } from '@react-three/fiber';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import Map, { GeolocateControl, MapRef, Marker } from 'react-map-gl';
import { Threebox } from 'threebox-plugin';

declare var window: any;

interface location {
  lat: number;
  lng: number;
}

const ucla: location = {
  lng: 34.0689,
  lat: -118.4452,
};

const MapComponent = () => {
  const mapRef = useRef<MapRef>(null);
  const token = process.env.NEXT_PUBLIC_MAP_TOKEN;

  const addFood = (map: any, origin: any) => {
    let model: any;

    var options = {
      obj: '/car.glb', //'/shiba/scene.gltf', // shiba url doesnt seem to work for some reason. maybe need to only use glb files(?)
      type: 'gltf',
      scale: 1.5,
      units: 'meters',
      anchor: 'center',
      rotationTransform: 1,
      adjustment: { x: 0, y: 0, z: 1.5 },
      rotation: { x: 0, y: 0, z: 0 }, //default rotation
    };

    window.tb.loadObj(options, function (obj: any) {
      model = obj.setCoords(origin);
      window.tb.add(model);

      // comment out animation for now -
      // first needa figure out how to get this whole thing to work
      //   let rotation = 0;
      // //   function animate() {
      // //     setTimeout(function () {
      // //       requestAnimationFrame(animate);
      // //     }, 1000 / 20);
      // //     food.setRotation({ x: 0, y: 0, z: (rotation += 10) });
      // //   }

      // //   animate();
    });
  };

  const loadLocations = (map: mapboxgl.Map) => {
    let model;

    console.log('loading locations');
    map.addLayer({
      id: 'food',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (_map: any, ctx: any) {
        window.tb = new Threebox(_map, ctx, { defaultLights: true });

        let options = {
          obj: '/car.glb', //'/shiba/scene.gtlf',
          type: 'gltf',
          scale: 40,
          units: 'meters',
          anchor: 'center',
          rotation: { x: 90, y: 180, z: 0 },
        };

        window.tb.loadObj(options, (obj: any) => {
          model = obj.setCoords([ucla.lat, ucla.lng]);
          window.tb.add(model);
          addFood(_map, [ucla.lat, ucla.lng]);
        });
      },
      render: function (gl: any, matrix: any) {
        window.tb.update();
      },
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
    loadLocations(map);
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
