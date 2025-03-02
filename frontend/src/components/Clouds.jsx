 
import { useTexture } from '@react-three/drei';

const Clouds = ( ) => {
  const cloudsMap = useTexture('Clouds.png');

  return (
    <mesh rotation={[0, 0, 23.5 / 360 * 2 * Math.PI]}>
      <sphereGeometry args={[10.05, 64, 64]} />
      <meshStandardMaterial
        alphaMap={cloudsMap}
        transparent
      />
    </mesh>
  );
};

export default Clouds;
