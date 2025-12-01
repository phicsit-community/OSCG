"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const AnimatedShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Rotate based on mouse position
        const { x, y } = state.mouse;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            y * 0.5,
            0.1
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            x * 0.5,
            0.1
        );
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere
                ref={meshRef}
                args={[1, 100, 200]}
                scale={2.2}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <MeshDistortMaterial
                    color={hovered ? "#4FD1D0" : "#2b2b2b"}
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
};

const InteractiveHero = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <AnimatedShape />
            </Canvas>
        </div>
    );
};

export default InteractiveHero;
