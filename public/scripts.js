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
  const mixers = []; // Array to store AnimationMixers

  const loader = new GLTFLoader();

  // Function to load models and setup animations
  const loadModel = (url, position) =>
    new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.position.copy(position);

          // Traverse and configure materials
          model.traverse((child) => {
            if (child.isMesh) {
              child.material.wireframe = false;
            }
          });

          scene.add(model);

          // Set up animations if available
          if (gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
            mixers.push(mixer);
          }

          resolve(model);
        },
        undefined,
        reject
      );
    });

  // Load models
  Promise.all([
    loadModel('/models/model1.glb', new THREE.Vector3(0.95, 0, 7)),
    loadModel('/models/model2.glb', new THREE.Vector3(-2, -objectsDistance * 1.5, 0.1)),
    loadModel('/models/model3.glb', new THREE.Vector3(2, -objectsDistance * 3.7, 0.001)),
  ])
    .then((models) => {
      sectionModels.push(...models);
    })
    .catch((error) => {
      console.error('Error loading models:', error);
    });

  // Lights
  const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);

  // Particles
  const particlesCount = 250;
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
    size: 0.05,
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
  camera.position.z = 10;
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
        x: '+=0.5',
        y: '+=0.5',
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

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = clock.getDelta();

    // Update camera position
    camera.position.y = (-scrollY / sizes.height) * objectsDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    // Update models' custom rotations
    sectionModels.forEach((model) => {
      model.rotation.y += deltaTime * 0.1; // Custom rotation speed
    });

    // Update animations
    mixers.forEach((mixer) => mixer.update(deltaTime));

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();
};

export default initThreeJsWithModels;
