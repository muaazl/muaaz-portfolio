"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Sparkles, Float } from "@react-three/drei";
import { useMode } from "@/hooks/use-mode";
import * as THREE from "three";

function AnimatedMesh({ mode }: { mode: "muaaz" | "super" }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    // Rotation logic
    const speed = mode === "super" ? 1.5 : 0.5;
    meshRef.current.rotation.x += delta * speed * 0.2;
    meshRef.current.rotation.y += delta * speed * 0.4;
  });

// Change the color logic:
  const color = mode === "super" ? "#00e1ff" : "#e6eef6"; // Was #ff2d55
  const emissive = mode === "super" ? "#2563eb" : "#000000"; // Optional tweak to darker blue
  const emissiveIntensity = mode === "super" ? 2 : 0;
  const scale = mode === "super" ? 1.06 : 1;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 16]} scale={scale}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          wireframe={mode === "super"} // Cyber look
        />
      </TorusKnot>
    </Float>
  );
}

export default function Avatar3D() {
  const { mode } = useMode();

  return (
    <div className="h-[400px] w-full relative z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedMesh mode={mode} />
        {mode === "super" && (
          <Sparkles count={50} scale={4} size={4} speed={0.4} opacity={0.5} color="#00e1ff" />
        )}
      </Canvas>
    </div>
  );
}