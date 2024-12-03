import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

const initThreeJsWithModels = () => {
  if (typeof window === 'undefined') {
    return; // Early return for server environments
  }

  const canvas = document.querySelector('canvas.webgl');
  const scene = new THREE.Scene();

  const objectsDistance = 4;
  const sectionModels = []; // Array to store models

  // GLTF Loader to load models
  const loader = new GLTFLoader();

  // Function to load models and return a promise
  const loadModel = (url, position) =>
    new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.position.copy(position);

          // Optional: Apply wireframe material or adjust material
          model.traverse((child) => {
            if (child.isMesh) {
              child.material.wireframe = true;
            }
          });

          scene.add(model);
          resolve(model);
        },
        undefined,
        reject
      );
    });

  // Load models into the scene
  Promise.all([
    loadModel('/models/model1.glb', new THREE.Vector3(2, 0, 0)),
    loadModel('/models/model2.glb', new THREE.Vector3(-2, -objectsDistance, 0)),
    loadModel('/models/model3.glb', new THREE.Vector3(2, -objectsDistance * 2, 0)),
  ])
    .then((models) => {
      sectionModels.push(...models);
    })
    .catch((error) => {
      console.error('Error loading models:', error);
    });

  // Directional Light
  const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);

  // Particles
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] =
      objectsDistance * 0.5 - Math.random() * objectsDistance * sectionModels.length;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    size: 0.03,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Camera
  const cameraGroup = new THREE.Group();
  scene.add(cameraGroup);

  const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 6;
  cameraGroup.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Scroll and Animation Logic
  let scrollY = window.scrollY;
  let currentSection = 0;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const newSection = Math.round(scrollY / sizes.height);

    if (newSection !== currentSection && sectionModels[newSection]) {
      currentSection = newSection;

      gsap.to(sectionModels[currentSection].rotation, {
        duration: 1.5,
        ease: 'power2.inOut',
        x: '+=6',
        y: '+=3',
        z: '+=1.5',
      });
    }
  });

  const cursor = { x: 0, y: 0 };
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  });

  // Animate
  const clock = new THREE.Clock();
  let previousTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    camera.position.y = (-scrollY / sizes.height) * objectsDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    sectionModels.forEach((model) => {
      model.rotation.x += deltaTime * 0.1;
      model.rotation.y += deltaTime * 0.12;
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();
};

export default initThreeJsWithModels;
