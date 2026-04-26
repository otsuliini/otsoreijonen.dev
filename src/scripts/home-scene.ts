//@ts-ignore
import * as THREE from "three";

const canvas = document.getElementById("bg") as HTMLCanvasElement;

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
); // Arguments are: FOV, aspect ratio, near clipping plane (view frustum), far clipping plane (view frustum)
const renderer = new THREE.WebGLRenderer({ canvas });

// Set up renderer properties
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Position camera along z-axis
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

function animiate() {
  requestAnimationFrame(animiate); // mechanism that tells the browser that you want to perform an animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animiate();
