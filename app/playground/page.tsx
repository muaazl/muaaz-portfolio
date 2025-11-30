"use client";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

function Box(props: any) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref as any}>
      <boxGeometry />
      <meshStandardMaterial color="#00e1ff" />
    </mesh>
  );
}

function Sphere(props: any) {
  const [ref] = useSphere(() => ({ mass: 1, position: [0, 8, 0], ...props }));
  return (
    <mesh ref={ref as any}>
      <sphereGeometry />
      <meshStandardMaterial color="#3aa0ff" />
    </mesh>
  );
}

function Plane(props: any) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref as any}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#0f1317" />
    </mesh>
  );
}

export default function PlaygroundPage() {
  return (
    <main className="h-screen w-full bg-black">
      <div className="absolute top-24 left-8 z-10 pointer-events-none">
        <h1 className="text-4xl font-bold text-white">Physics Sandbox</h1>
        <p className="text-muted">Drag to rotate. Watch them fall.</p>
      </div>
      
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <Physics>
          <Plane />
          <Box position={[0, 5, 0]} />
          <Box position={[0.5, 8, 0]} />
          <Box position={[-0.5, 10, 0.5]} />
          <Sphere position={[1, 12, -1]} />
          <Sphere position={[-1, 15, 1]} />
        </Physics>
        <OrbitControls />
      </Canvas>
    </main>
  );
}