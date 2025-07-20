// src/components/BoidScene.jsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import BoidManager from '../logic/BoidManager';
import * as THREE from 'three';

const numBoids = 1000;

const BoidScene = () =>{

  const boidRef = useRef();
  const managerRef = useRef();

  useEffect(() => {
    managerRef.current = new BoidManager(500, {x: 8, y: 3, z: 5});
  }, [])

  useFrame((state, delta) => {
    if(!boidRef.current || !managerRef.current) return;

    managerRef.current.update(delta);
    const positions = boidRef.current.geometry.attributes.position.array;

    managerRef.current.boids.forEach((Boid, i) => {
      const index = i * 3;
      positions[index] = Boid.position.x;
      positions[index + 1] = Boid.position.y;
      positions[index + 2] = Boid.position.z;
    });
    boidRef.current.geometry.attributes.position.needsUpdate = true;
  
});

  return(
    <points ref={boidRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={numBoids}
          itemSize={3}
          array={new Float32Array(numBoids * 3)}
                />
      </bufferGeometry>
      <pointsMaterial size={.15} color="skyblue" sizeAttenuation />
    </points>
  )

}

export default BoidScene