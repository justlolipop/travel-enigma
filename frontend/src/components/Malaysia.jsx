 
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
 

const Malaysia = ({alpha}) => {
  const gltf = useGLTF("/malaysia.glb");
  const { nodes } = gltf;
  const mapRef = useRef();
  const { camera } = useThree();

  // Define a custom material
  const customMaterial = new MeshStandardMaterial({
    color: "#ffcc00", // Change to any color
    metalness: 1,   // Adjust for metallic look
    roughness: 0.3,   // Adjust for reflections
    side: 2,          // Double-sided material
    emissive: "#ffcc00", // Emissive color
    emissiveIntensity: 3, // 
    alphaTest: alpha || 1
  });

  const handleClick = () => {
    // Get camera position, fov, and zoom
    const cameraPosition = camera.position.clone();
    const cameraFov = camera.fov;
    const cameraZoom = camera.zoom;

    // Log or store the camera data
    console.log("Camera Position:", cameraPosition);
    console.log("Camera FOV:", cameraFov);
    console.log("Camera Zoom:", cameraZoom);
  };


  return (
    <group  >
      <mesh
      onClick={handleClick} 
        ref={mapRef}
        scale={1.8}
        position={[-3.32, -0.828, -9.375]}
        rotation={[1.929, 0.3445, -2.796]}
   
        geometry={nodes.Plane.geometry} 
          // material={materials['Material.001']}
        material={customMaterial} 
      />
    </group>
  );
};

export default Malaysia;
