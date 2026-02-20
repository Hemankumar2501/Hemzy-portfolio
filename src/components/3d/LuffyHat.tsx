import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LuffyHat() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/luffy_hat.glb');

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      // Slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.8} position={[0, 0, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/luffy_hat.glb');
