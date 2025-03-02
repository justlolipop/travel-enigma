import  { useMemo } from 'react';
import {   useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Earth = ( ) => {
  const [albedoMap, bumpMap, oceanMap, lightsMap] = useTexture([
    '/Albedo.jpg',
    '/Bump.jpg',
    '/Ocean.png',
    '/night_lights_modified.png',
  ]);

  const earthMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: albedoMap,
    bumpMap: bumpMap,
    bumpScale: 0.03,
    roughnessMap: oceanMap,
    metalness: 0.7,
    metalnessMap: oceanMap,
    emissiveMap: lightsMap,
    emissive: new THREE.Color(0xeeee88),
  }), [albedoMap, bumpMap, oceanMap, lightsMap ]);

  return (
    <group>

      <mesh rotation={[0, 0, 23.5 / 360 * 2 * Math.PI]}>
        <sphereGeometry args={[10, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>

 
    
    </group>
  );
};

export default Earth;
