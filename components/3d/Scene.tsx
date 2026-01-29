'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState, ReactNode } from 'react';

interface SceneProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
}

export function Scene({ children, className = '', interactive = false }: SceneProps) {
    const [dpr, setDpr] = useState(1.5);

    return (
        <div
            className={`canvas-container ${interactive ? 'interactive' : ''} ${className}`}
        >
            <Canvas
                dpr={dpr}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 1000,
                    position: [0, 0, 10],
                }}
            >
                <PerformanceMonitor
                    onIncline={() => setDpr(Math.min(2, dpr + 0.5))}
                    onDecline={() => setDpr(Math.max(1, dpr - 0.5))}
                >
                    <Suspense fallback={null}>
                        {/* Ambient lighting */}
                        <ambientLight intensity={0.2} />

                        {/* Key light - creates rim lighting effect */}
                        <directionalLight
                            position={[5, 5, 5]}
                            intensity={0.5}
                            color="#ffffff"
                        />

                        {/* Accent light - cyan tint */}
                        <pointLight
                            position={[-5, 2, 3]}
                            intensity={0.3}
                            color="#00e5ff"
                        />

                        {/* Fill light - subtle violet */}
                        <pointLight
                            position={[3, -3, 2]}
                            intensity={0.15}
                            color="#8b5cf6"
                        />

                        {children}

                        <Preload all />
                    </Suspense>
                </PerformanceMonitor>
            </Canvas>
        </div>
    );
}

export default Scene;
