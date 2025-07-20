// src/components/BoidCanvas.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BoidScene from './BoidScene';



const BoidCanvas = () => {
  return (
    <div className="animation">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ backgroundColor: 'sunset'}}>
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={1} />
      <directionalLight
        position={[5,10,5]}
        intensity={2}
        castShadow/>
      <BoidScene />
    </Canvas>
    </div>
    
  );
};

export default BoidCanvas;
