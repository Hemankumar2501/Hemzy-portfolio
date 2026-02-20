import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GokuModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  
  const { scene } = useGLTF('/son_goku.glb');

  // Handle pointer events (works for both mouse and touch)
  const handlePointerMove = (e: any) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    setTargetRotation({
      y: x * 1.5,
      x: y * 0.5
    });
  };

  // Add event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', handlePointerMove);
  }
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      
      // Smooth rotation towards target
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.y,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.x,
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
