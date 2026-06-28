import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";

function Vinyl({ position }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.z += delta * 0.4;
  });
  return (
    <group position={position}>
      <mesh ref={mesh}>
        <cylinderGeometry args={[1.2, 1.2, 0.06, 64]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Grooves */}
      {[0.4, 0.6, 0.8, 1.0].map((r, i) => (
        <mesh key={i} position={[0, 0.035, 0]}>
          <torusGeometry args={[r, 0.005, 8, 64]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  );
}

function Polaroid({ position, rotation }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[1.4, 1.7, 0.04]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.15, 0.025]}>
          <boxGeometry args={[1.1, 1.0, 0.01]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function Sparkles() {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
    }
    return new Float32Array(arr);
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f59e0b" size={0.04} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function CameraRig() {
  const { camera, gl } = useThree();
  useFrame(() => {
    camera.position.x += (-camera.position.x) * 0.02;
    camera.position.y += (-camera.position.y) * 0.02;
  });

  React.useEffect(() => {
    const canvas = gl.domElement;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      camera.position.x = x * 0.8;
      camera.position.y = y * 0.4;
    };
    canvas.addEventListener("mousemove", move);
    return () => canvas.removeEventListener("mousemove", move);
  }, [camera, gl]);

  return null;
}

export default function ThreeScene() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={1.5} color="#f59e0b" />
        <pointLight position={[-4, -2, 2]} intensity={0.8} color="#6366f1" />
        <Stars radius={60} depth={30} count={800} factor={2} fade />
        <Sparkles />
        <Vinyl position={[0, 0, 0]} />
        <Polaroid position={[-3, 1, -1]} rotation={[0.1, 0.3, -0.2]} />
        <Polaroid position={[3, -0.5, -1.5]} rotation={[-0.1, -0.2, 0.15]} />
        <Polaroid position={[2.5, 1.5, -2]} rotation={[0.2, -0.3, 0.1]} />
        <CameraRig />
      </Canvas>
    </div>
  );
}
