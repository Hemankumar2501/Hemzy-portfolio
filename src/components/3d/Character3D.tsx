import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GokuModel from './GokuModel';

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
      </mesh>
      {/* Middle ring */}
      <mesh rotation={[Math.PI / 2.2, 0.5, 0]}>
        <torusGeometry args={[2, 0.03, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0.3]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00F0FF" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#B829F7" />
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#FF2D8D" />
      
      <FloatingRings />
      <Suspense fallback={null}>
        <GokuModel />
      </Suspense>
    </>
  );
}

export default function Character3D() {
  return (
    <div className="w-full h-full" style={{ position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
