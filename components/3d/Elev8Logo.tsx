'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Elev8LogoProps {
    scale?: number;
    wireframe?: boolean;
    rotationSpeed?: number;
    interactive?: boolean;
}

export function Elev8Logo({
    scale = 1,
    wireframe = true,
    rotationSpeed = 0.003,
    interactive = true,
}: Elev8LogoProps) {
    const groupRef = useRef<THREE.Group>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });
    const { pointer } = useThree();

    // Create the "8" / infinity shape geometry
    const infinityGeometry = useMemo(() => {
        const points: THREE.Vector3[] = [];
        const segments = 128;

        for (let i = 0; i <= segments; i++) {
            const t = (i / segments) * Math.PI * 2;

            // Parametric equation for a figure-8 / lemniscate
            const a = 2;
            const denominator = 1 + Math.sin(t) * Math.sin(t);

            const x = (a * Math.cos(t)) / denominator;
            const y = (a * Math.sin(t) * Math.cos(t)) / denominator;

            points.push(new THREE.Vector3(x, y * 1.5, 0)); // Stretch vertically for "8" look
        }

        // Create tube geometry along the path
        const curve = new THREE.CatmullRomCurve3(points, true);
        const tubeGeometry = new THREE.TubeGeometry(curve, 128, 0.08, 8, true);

        return tubeGeometry;
    }, []);

    // Create wireframe lines for additional detail
    const wireframeGeometry = useMemo(() => {
        const points: THREE.Vector3[] = [];
        const segments = 64;

        for (let i = 0; i <= segments; i++) {
            const t = (i / segments) * Math.PI * 2;
            const a = 2;
            const denominator = 1 + Math.sin(t) * Math.sin(t);

            const x = (a * Math.cos(t)) / denominator;
            const y = (a * Math.sin(t) * Math.cos(t)) / denominator;

            points.push(new THREE.Vector3(x, y * 1.5, 0));
        }

        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    // Animation loop
    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        // Mouse interaction
        if (interactive) {
            mouseRef.current.x += (pointer.x * 0.3 - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (pointer.y * 0.3 - mouseRef.current.y) * 0.05;

            targetRotation.current.y = mouseRef.current.x * 0.5;
            targetRotation.current.x = -mouseRef.current.y * 0.3;
        }

        // Smooth rotation with inertia
        groupRef.current.rotation.y +=
            (targetRotation.current.y + time * rotationSpeed - groupRef.current.rotation.y) * 0.02;
        groupRef.current.rotation.x +=
            (targetRotation.current.x - groupRef.current.rotation.x) * 0.02;

        // Subtle breathing scale effect
        const breathe = 1 + Math.sin(time * 0.5) * 0.02;
        groupRef.current.scale.setScalar(scale * breathe);
    });

    return (
        <group ref={groupRef}>
            {/* Main solid tube */}
            <mesh geometry={infinityGeometry}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.2}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Wireframe overlay */}
            {wireframe && (
                <lineLoop geometry={wireframeGeometry}>
                    <lineBasicMaterial
                        color="#00e5ff"
                        transparent
                        opacity={0.6}
                        linewidth={1}
                    />
                </lineLoop>
            )}

            {/* Inner glow ring */}
            <mesh geometry={infinityGeometry} scale={0.95}>
                <meshBasicMaterial
                    color="#00e5ff"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Outer rim light effect */}
            <mesh geometry={infinityGeometry} scale={1.02}>
                <meshBasicMaterial
                    color="#00e5ff"
                    transparent
                    opacity={0.05}
                    wireframe
                />
            </mesh>
        </group>
    );
}

// Floating geometric accents
export function GeometricAccents() {
    const groupRef = useRef<THREE.Group>(null);

    // Create various floating shapes
    const shapes = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4 - 3,
            ] as [number, number, number],
            rotation: Math.random() * Math.PI * 2,
            scale: 0.1 + Math.random() * 0.3,
            speed: 0.2 + Math.random() * 0.3,
            type: ['octahedron', 'ring', 'hexagon'][Math.floor(Math.random() * 3)] as string,
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    });

    return (
        <group ref={groupRef}>
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} index={i} />
            ))}
        </group>
    );
}

function FloatingShape({
    position,
    rotation,
    scale,
    speed,
    type,
    index,
}: {
    position: [number, number, number];
    rotation: number;
    scale: number;
    speed: number;
    type: string;
    index: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;

        meshRef.current.rotation.x = rotation + time * speed;
        meshRef.current.rotation.y = rotation + time * speed * 0.7;

        // Float up and down
        meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.3;
    });

    const geometry = useMemo(() => {
        switch (type) {
            case 'octahedron':
                return new THREE.OctahedronGeometry(1);
            case 'ring':
                return new THREE.TorusGeometry(1, 0.3, 8, 6);
            case 'hexagon':
                return new THREE.CylinderGeometry(1, 1, 0.2, 6);
            default:
                return new THREE.OctahedronGeometry(1);
        }
    }, [type]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            geometry={geometry}
        >
            <meshBasicMaterial
                color="#00e5ff"
                transparent
                opacity={0.15}
                wireframe
            />
        </mesh>
    );
}

export default Elev8Logo;
