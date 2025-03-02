import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;


const CameraAnimation = () => {
  const cameraRef = useRef();

  const state = useRef({
    rotationProgress: 0, // Track how much we rotated
    transitioning: true, // True while rotating, then false when moving to final pos
    initialAngle: null, // Store initial angle
    extraRotation: 0, // Store calculated extra rotation
  });

  // Target final position
  const finalPosition = new THREE.Vector3(-6.149, -2.716, -20.661);
  const dampingFactor = 4; // Controls smoothness
  const totalRotations = 3; // Number of full spins
  const duration = 5; // Duration of spin in seconds

  useFrame(({ camera }, delta) => {
    if (!cameraRef.current) {
      cameraRef.current = camera;

      // **Calculate Initial Rotation Angle**
      const initialAngle = Math.atan2(camera.position.z, camera.position.x); // Get angle from (x, z)
      const finalAngle = Math.atan2(finalPosition.z, finalPosition.x); // Get angle for final position

      // **Calculate Extra Rotation Needed**
      let extraRotation = finalAngle - initialAngle;
      
      // Ensure the rotation is **positive** and accounts for at least 2 full spins
      if (extraRotation < 0) extraRotation += Math.PI * 2; // Normalize negative angles
      extraRotation += Math.PI * 2 * totalRotations; // Ensure at least 2 full spins

      // **Randomize the final landing angle slightly**
      const randomOffset =  (Math.PI / 6); // ±π/4 (~±45 degrees)
      extraRotation += randomOffset;

      // Store in state
      state.current.initialAngle = initialAngle;
      state.current.extraRotation = extraRotation;
    }

    if (state.current.transitioning) {
      // Progress between 0 and 1 over "duration" seconds
      state.current.rotationProgress = Math.min(state.current.rotationProgress + delta / duration, 1);

      // Ease-in-out using a sine curve
      const easedProgress = easeInOutCubic(state.current.rotationProgress);

      // Compute smooth rotation
      const angle = state.current.initialAngle + easedProgress * state.current.extraRotation;

      // Calculate orbit position
      const radius = 50; // Initial radius from center
      camera.position.x = Math.cos(angle) * radius;
      camera.position.z = Math.sin(angle) * radius;
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 30, dampingFactor, delta);

      // **Stop spinning after calculated rotations**
      if (state.current.rotationProgress >= 1) {
        state.current.transitioning = false;
      }
    } else {
      // **Damp towards final position smoothly**
      camera.position.x = THREE.MathUtils.damp(camera.position.x, finalPosition.x, dampingFactor, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, finalPosition.y, dampingFactor, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, finalPosition.z, dampingFactor, delta);
    }

    // Keep looking at the Earth
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return null;
};

export default CameraAnimation;


    // // **Zoom-in effect with damping**
    // if (state.current.zoomProgress < 1) {
    //   state.current.zoomProgress += delta * 0.2; // Adjust zoom speed
    //   camera.fov = THREE.MathUtils.damp(camera.fov, 25, dampingFactor, delta);
    //   camera.updateProjectionMatrix();
    // }
