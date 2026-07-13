"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Jellyfish ── */
function Jellyfish({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tentacleRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle floating motion
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + position[0]) * 0.3;
    groupRef.current.position.x =
      position[0] + Math.sin(t * 0.3 + position[2]) * 0.15;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;

    // Tentacle wave
    tentacleRefs.current.forEach((tentacle, i) => {
      if (tentacle) {
        tentacle.rotation.x =
          Math.sin(t * 1.5 + i * 0.8) * 0.3 + 0.2;
      }
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Bell / dome */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.6}
            distort={0.15}
            speed={2}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Tentacles */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.25;
        return (
          <mesh
            key={i}
            ref={(el) => { tentacleRefs.current[i] = el; }}
            position={[
              Math.cos(angle) * radius,
              -0.1,
              Math.sin(angle) * radius,
            ]}
          >
            <cylinderGeometry args={[0.015, 0.005, 0.8, 6]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.4}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Fish (low-poly) ── */
function Fish({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;

    // Swimming path
    ref.current.position.x = position[0] + Math.sin(t * 0.4) * 3;
    ref.current.position.y =
      position[1] + Math.sin(t * 0.6) * 0.3;
    ref.current.position.z = position[2] + Math.cos(t * 0.4) * 1;

    // Face direction of movement
    ref.current.rotation.y = Math.cos(t * 0.4) * 0.5 + Math.PI / 2;
    // Body wiggle
    ref.current.rotation.z = Math.sin(t * 2) * 0.05;
  });

  return (
    <group ref={ref} position={position} scale={0.3}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          flatShading
        />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          flatShading
        />
      </mesh>
      {/* Eye */}
      <mesh position={[0.3, 0.15, 0.25]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* ── Underwater Bubbles 3D ── */
function UnderwaterBubbles({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const bubbleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ),
      speed: Math.random() * 0.3 + 0.1,
      size: Math.random() * 0.08 + 0.02,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    bubbleData.forEach((bubble, i) => {
      const y = ((bubble.position.y + t * bubble.speed + 4) % 8) - 4;
      dummy.position.set(
        bubble.position.x + Math.sin(t * 0.5 + bubble.offset) * 0.3,
        y,
        bubble.position.z + Math.cos(t * 0.3 + bubble.offset) * 0.2
      );
      dummy.scale.setScalar(bubble.size * 10);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color="#4fc3f7"
        transparent
        opacity={0.3}
        emissive="#4fc3f7"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

/* ── Seaweed ── */
function Seaweed({
  position,
  color = "#1b5e20",
  height = 2,
}: {
  position: [number, number, number];
  color?: string;
  height?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.8 + position[0] * 2) * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.5 + position[2]) * 0.08;
  });

  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.04, 0.08, height, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* ── Main Scene ── */
function UnderwaterScene() {
  const seaweedData = useMemo(() => (
    [-4, -3, -2, 2, 3, 4.5].map((x, i) => ({
      x,
      i,
      height: 1.5 + Math.random() * 1.5,
      color: i % 2 === 0 ? "#1b5e20" : "#2e7d32",
    }))
  ), []);

  return (
    <>
      {/* Ambient underwater lighting */}
      <ambientLight intensity={0.15} color="#1a4a7a" />

      {/* Caustic-like light from above */}
      <directionalLight
        position={[0, 10, 5]}
        intensity={0.3}
        color="#4fc3f7"
      />

      {/* Bioluminescent point lights */}
      <pointLight position={[-3, 1, 0]} intensity={0.8} color="#4fc3f7" distance={8} />
      <pointLight position={[3, -1, -2]} intensity={0.5} color="#00bcd4" distance={6} />
      <pointLight position={[0, 2, 2]} intensity={0.4} color="#7c4dff" distance={5} />

      {/* Jellyfish */}
      <Jellyfish position={[-2.5, 1.5, -2]} color="#4fc3f7" scale={0.8} />
      <Jellyfish position={[3, 0.5, -3]} color="#ce93d8" scale={0.6} />
      <Jellyfish position={[0, 2, -4]} color="#00bcd4" scale={0.5} />

      {/* Fish */}
      <Fish position={[-1, -0.5, -1]} color="#ff7043" speed={0.8} />
      <Fish position={[2, 0.5, -2]} color="#ffd54f" speed={1.2} />
      <Fish position={[0, -1, 0]} color="#4fc3f7" speed={0.6} />

      {/* Seaweed */}
      {seaweedData.map(({ x, i, height, color }) => (
        <Seaweed
          key={i}
          position={[x, -3.5, -3 + i * 0.5]}
          color={color}
          height={height}
        />
      ))}

      {/* 3D Bubbles */}
      <UnderwaterBubbles count={50} />

      {/* Sparkle particles (plankton) */}
      <Sparkles
        count={80}
        scale={[15, 8, 8]}
        size={2}
        speed={0.3}
        opacity={0.4}
        color="#4fc3f7"
      />

      {/* Ocean floor hint */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial
          color="#0d1b30"
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

/* ── Exported Component ── */
export default function Scene3D() {
  return (
    <div className="hero-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <UnderwaterScene />
      </Canvas>
    </div>
  );
}
