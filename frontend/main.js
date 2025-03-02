import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'; 


const scene = new THREE.Scene()

scene.background = new THREE.Color('black'); // Set to black or any color you prefer


const loader = new THREE.TextureLoader();
const texture = loader.load('/images/earth.jpg' );
const maskTexture = loader.load('/src/images/maskmap.png');
const sphereGeometry = new THREE.SphereGeometry(5,30,30)
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: texture,})


const cubeMesh = new THREE.Mesh(
  sphereGeometry,
  sphereMaterial
)

scene.add(cubeMesh)

const aspectRatio = window.innerWidth/ window.innerHeight

// initialize the camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 30)

camera.position.z = 12

//initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
  
//instantiate the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDampling = true
controls.autoRotate = true

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const renderloop = () => {
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(renderloop)

}

renderloop()

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera)
  // Ensure canvas matches the new renderer size
  
});

renderer.setSize(window.innerWidth, window.innerHeight);

canvas.addEventListener('click', (event) => { 
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; 
    
    // Defines the ray's origin and direction
    raycaster.setFromCamera(mouse, camera); 
    const intersects = raycaster.intersectObject(cubeMesh);
    
    if (intersects.length > 0) { 
        const intersect = intersects[0]; 
        const uv = intersect.uv; 
        const textureWidth = texture.image.width;
        const textureHeight = texture.image.height;
         
        const x = Math.floor(uv.x * textureWidth);
        const y = Math.floor(uv.y * textureHeight);

        console.log(`Clicked on texture coordinates: (${x}, ${y})`); 
        // Determine the country based on the texture coordinates
        
    } 
});

const animateButton = document.getElementById('animateButton'); animateButton.addEventListener('click', () => { 
    const duration = 2; // duration in seconds
  const startTime = performance.now();

  const startPosition = camera.position.clone();
  const endPosition = new THREE.Vector3(0, 0, 12);

  const startTarget = controls.target.clone();
  const endTarget = new THREE.Vector3(0, 0, 0);

  function animate() {
    const elapsedTime = (performance.now() - startTime) / 1000;
    const t = Math.min(elapsedTime / duration, 1); // normalize time

    // Interpolate camera position
    camera.position.lerpVectors(startPosition, endPosition, t);
    camera.lookAt(scene.position);

    // Interpolate controls target
    controls.target.lerpVectors(startTarget, endTarget, t);
    controls.update();

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  animate();
});
