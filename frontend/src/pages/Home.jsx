import Earth from "../components/Earth";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
 
import { OrbitControls, Html, useProgress, Environment  } from "@react-three/drei";
import Clouds from "../components/Clouds";
import Atmosphere from "../components/Atmosphere";
import  Malaysia from "../components/Malaysia";
 
import CameraAnimation from "../utils/CameraAnimation";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}


const Home = () => {

  const [animation, setAnimation] = useState(false);
  const [alpha, setAlpha] = useState(10);
  
  useEffect(() => {
    if (animation) {
      setTimeout(() => {
      setAlpha(1);
    }, 5000) 
    }else {
      setAlpha(10);
    }

  }, [animation])

  return (
    <>
      <button
        onClick={() => setAnimation(prev => !prev)}
        className="absolute z-1000 left-3 top-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Find Malaysia
      </button>

    <Canvas 
      style={{ height: "100vh", width: "100vw", display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
      camera={{ position: [50, 0, 50], fov: 45 }}
      // camera={{ position: [-6.149, -2.716, -20.661], fov: 25}}
    >
      <Suspense fallback={<Loader />}>
        <color attach="background" args={['black']} />
          <ambientLight intensity={0.05} />
          <directionalLight
            position={[-50, 0, 30]}
            intensity={2.5}
            color={0xffffff}
          />
          <Earth />
          <Clouds />
          <Atmosphere opacity={0.5} powFactor={4.0} multiplier={6} />
          <Malaysia alpha={alpha} />

          {animation ? <CameraAnimation  /> : null }

          <Environment files="/galaxy.hdr" background  />
          <OrbitControls autoRotate autoRotateSpeed={.5} />  
          {/* <OrbitControls /> */}
          
      </Suspense>

 

    </Canvas>
    
    </>
  );
}

export default Home;
