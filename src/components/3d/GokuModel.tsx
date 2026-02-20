import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function GokuModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/son_goku.glb');
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      
      // Mouse-controlled rotation with faster speed
      const x = (state.mouse.x * viewport.width) / 2;
      const y = (state.mouse.y * viewport.height) / 2;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.6,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        y * 0.2,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -2, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/son_goku.glb');
