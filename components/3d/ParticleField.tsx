'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    size?: number;
    color?: string;
    speed?: number;
    spread?: number;
}

export function ParticleField({
    count = 500,
    size = 0.015,
    color = '#ffffff',
    speed = 0.0003,
    spread = 15,
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate random particle positions
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles in a spherical volume
            positions[i3] = (Math.random() - 0.5) * spread;
            positions[i3 + 1] = (Math.random() - 0.5) * spread;
            positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;

            // Random upward velocity for elevation effect
            velocities[i] = 0.5 + Math.random() * 0.5;
        }

        return { positions, velocities };
    }, [count, spread]);

    // Animate particles
    useFrame((state) => {
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Gentle upward drift with slight oscillation
            positions[i3 + 1] += speed * particles.velocities[i];

            // Subtle horizontal sway
            positions[i3] += Math.sin(time + i * 0.01) * 0.0002;

            // Reset particles that drift too high
            if (positions[i3 + 1] > spread / 2) {
                positions[i3 + 1] = -spread / 2;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Subtle rotation of the entire field
        pointsRef.current.rotation.y = time * 0.02;
    });

    return (
        <Points
            ref={pointsRef}
            positions={particles.positions}
            stride={3}
            frustumCulled={false}
        >
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation
                depthWrite={false}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// Interactive particles that respond to cursor
export function InteractiveParticles({
    count = 100,
    color = '#00e5ff',
}: {
    count?: number;
    color?: string;
}) {
    const pointsRef = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const basePositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 3 + Math.random() * 2;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            basePositions[i3] = positions[i3];
            basePositions[i3 + 1] = positions[i3 + 1];
            basePositions[i3 + 2] = positions[i3 + 2];
        }

        return { positions, basePositions };
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Get normalized mouse position
        const mouse = state.pointer;
        mouseRef.current.x += (mouse.x * 5 - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouse.y * 5 - mouseRef.current.y) * 0.05;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Calculate distance from mouse
            const dx = particles.basePositions[i3] - mouseRef.current.x;
            const dy = particles.basePositions[i3 + 1] - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Repel particles near cursor
            const repelStrength = Math.max(0, 1 - dist / 3) * 0.5;

            positions[i3] = particles.basePositions[i3] + dx * repelStrength + Math.sin(time + i) * 0.02;
            positions[i3 + 1] = particles.basePositions[i3 + 1] + dy * repelStrength + Math.cos(time + i) * 0.02;
            positions[i3 + 2] = particles.basePositions[i3 + 2] + Math.sin(time * 0.5 + i) * 0.05;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points
            ref={pointsRef}
            positions={particles.positions}
            stride={3}
            frustumCulled={false}
        >
            <PointMaterial
                transparent
                color={color}
                size={0.03}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export default ParticleField;
