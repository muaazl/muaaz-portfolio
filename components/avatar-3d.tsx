"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    const speed = 1.5;
    meshRef.current.rotation.x += delta * speed * 0.2;
    meshRef.current.rotation.y += delta * speed * 0.4;
  });

  const color = "#00e1ff";
  const emissive = "#2563eb";
  const emissiveIntensity = 2;
  const scale = 1.06;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 16]} scale={scale}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          wireframe
        />
      </TorusKnot>
    </Float>
  );
}

export default function Avatar3D() {

  return (
    <div className="h-[400px] w-full relative z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedMesh />
        <Sparkles count={50} scale={4} size={4} speed={0.4} opacity={0.5} color="#00e1ff" />
      </Canvas>
    </div>
  );
}