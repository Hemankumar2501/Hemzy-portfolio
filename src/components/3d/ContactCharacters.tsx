import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WavingCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Breathing animation
      const breath = Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
      groupRef.current.position.y = breath;
    }
    if (armRef.current) {
      // Waving animation
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.3 - 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[-0.8, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#0E111A" roughness={0.3} metalness={0.8} />
        {/* Visor */}
        <mesh position={[0, 0.05, 0.22]}>
          <boxGeometry args={[0.35, 0.06, 0.04]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 1, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.4} metalness={0.7} />
        {/* Chest glow */}
        <mesh position={[0, 0.1, 0.32]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
        </mesh>
      </mesh>
      
      {/* Waving arm */}
      <mesh ref={armRef} position={[-0.5, 1.1, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.7, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
        {/* Arm glow */}
        <mesh position={[0.06, 0, 0]}>
          <boxGeometry args={[0.015, 0.5, 0.015]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </mesh>
      
      {/* Other arm */}
      <mesh position={[0.5, 0.7, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.08, 0.06, 0.7, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0.2, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

function StandingCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle idle animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2 + 1) * 0.01;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0.8, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#0E111A" roughness={0.3} metalness={0.8} />
        {/* Visor */}
        <mesh position={[0, 0.05, 0.2]}>
          <boxGeometry args={[0.32, 0.06, 0.04]} />
          <meshBasicMaterial color="#2DFF6F" />
        </mesh>
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 1, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.4} metalness={0.7} />
        {/* Chest glow - green */}
        <mesh position={[0, 0.1, 0.3]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="#2DFF6F" transparent opacity={0.5} />
        </mesh>
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.45, 0.8, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.07, 0.05, 0.7, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0.45, 0.8, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.07, 0.05, 0.7, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.18, -0.5, 0]}>
        <cylinderGeometry args={[0.09, 0.07, 0.8, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0.18, -0.5, 0]}>
        <cylinderGeometry args={[0.09, 0.07, 0.8, 16]} />
        <meshStandardMaterial color="#0E111A" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

function PortalRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ringRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0.5, -1]}>
      <torusGeometry args={[2.5, 0.03, 16, 100]} />
      <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 5, 3]} intensity={0.8} color="#00F0FF" />
      <pointLight position={[-3, 3, -3]} intensity={0.5} color="#2DFF6F" />
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#B829F7" />
      
      <PortalRing />
      <WavingCharacter />
      <StandingCharacter />
    </>
  );
}

export default function ContactCharacters() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
