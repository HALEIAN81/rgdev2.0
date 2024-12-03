import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Sphere */}
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="blue" />
      </Sphere>
      
      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
