//@ts-ignore
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff); // 0x means it's a hexadecimal value, ffffff is white
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);


const controls = new OrbitControls(camera, renderer.domElement); //listens to dom events and updates the camera position accordingly. It allows you to orbit around a target, zoom in and out, and pan the camera. It is commonly used in 3D applications to provide an interactive way for users to explore the scene.
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;

  // Draw a radial gradient — white center fading to transparent
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  return new THREE.CanvasTexture(canvas);
}

const starTexture = createStarTexture(); // Create a custom star texture using a canvas. This function creates a small canvas, draws a radial gradient on it to represent a star, and then converts that canvas into a Three.js texture that can be applied to sprites in the scene.

function addStar() {
  const material = new THREE.SpriteMaterial({ map: starTexture, color: 0xffffff }); // Create a sprite material using the loaded star texture. A sprite is a 2D image that always faces the camera, making it ideal for representing stars in a 3D scene.
  // const geometry = new THREE.SphereGeometry(0.25); // radius of the sphere
  const star = new THREE.Sprite(material);

  const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100)); // randomly generate x, y, and z positions for the star. By using the three.js random float spread function. 
  star.position.set(x, y, z);
  star.scale.set(0.5, 0.5, 0.5); //adjust the size of the star
  scene.add(star);
}

Array(200).fill(0).forEach(addStar); // creates an array of 200 elements, fills it with the value 0, and then iterates over each element using forEach. For each element, it calls the addStar function, which adds a star to the scene at a random position. 


// const spaceTexture = new THREE.TextureLoader().load("/nebula.jpg"); // You can also add a callback function here to get notified when the stars are finished loading. 
scene.background = ("/black.jpg")

function animiate() {
  requestAnimationFrame(animiate); // mechanism that tells the browser that you want to perform an animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);

}

animiate();
