import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ParticleProps {
    id: number;
    x: number;
    y: number;
    color: string;
    type: 'heart' | 'star' | 'circle' | 'sparkle';
    size: number;
    delay: number;
}

interface CelebrationEffectProps {
    isActive: boolean;
    onComplete: () => void;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ isActive, onComplete }) => {
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    const colors = [
        '#ff4d4f', '#ff7875', '#ffa39e', '#ffccc7',
        '#f759ab', '#ff85c0', '#ffadd6', '#ffd6e7',
        '#722ed1', '#9254de', '#b37feb', '#d3adf7',
        '#1890ff', '#40a9ff', '#69c0ff', '#91d5ff',
        '#52c41a', '#73d13d', '#95de64', '#b7eb8f'
    ];

    useEffect(() => {
        if (isActive) {
            const newParticles: ParticleProps[] = [];

            // Create different types of particles
            for (let i = 0; i < 60; i++) {
                const types: ('heart' | 'star' | 'circle' | 'sparkle')[] = ['heart', 'star', 'circle', 'sparkle'];
                newParticles.push({
                    id: i,
                    x: 50 + (Math.random() - 0.5) * 30, // Center around middle
                    y: 60 + (Math.random() - 0.5) * 20,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    type: types[Math.floor(Math.random() * types.length)],
                    size: Math.random() * 12 + 8,
                    delay: Math.random() * 0.5,
                });
            }

            setParticles(newParticles);

            const timer = setTimeout(() => {
                setParticles([]);
                onComplete();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    const renderParticle = (particle: ParticleProps) => {
        const baseStyle = {
            position: 'absolute' as const,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            color: particle.color,
            fontSize: `${particle.size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        switch (particle.type) {
            case 'heart':
                return (
                    <div style={baseStyle}>
                        ❤️
                    </div>
                );
            case 'star':
                return (
                    <div style={baseStyle}>
                        ⭐
                    </div>
                );
            case 'sparkle':
                return (
                    <div style={baseStyle}>
                        ✨
                    </div>
                );
            case 'circle':
                return (
                    <div
                        style={{
                            ...baseStyle,
                            backgroundColor: particle.color,
                            borderRadius: '50%',
                            boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden'
            }}
        >
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{
                            x: `${particle.x}vw`,
                            y: `${particle.y}vh`,
                            scale: 0,
                            rotate: 0,
                            opacity: 0,
                        }}
                        animate={{
                            x: `${particle.x + (Math.random() - 0.5) * 150}vw`,
                            y: `${particle.y - 50 - Math.random() * 30}vh`,
                            scale: [0, 1.5, 1, 0.8, 0],
                            rotate: [0, 180, 360, 540],
                            opacity: [0, 1, 1, 0.8, 0],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                        }}
                        transition={{
                            duration: 3 + Math.random() * 1.5,
                            delay: particle.delay,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            times: [0, 0.2, 0.5, 0.8, 1],
                        }}
                    >
                        {renderParticle(particle)}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Radial burst effect */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 2, 4], opacity: [0, 0.6, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(255,77,79,0.3) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)',
                            borderRadius: '50%',
                            filter: 'blur(2px)',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Success message overlay */}


            {/* Floating hearts animation */}
            {/* <AnimatePresence>
                {isActive && [...Array(8)].map((_, i) => (
                    <motion.div
                        key={`floating-heart-${i}`}
                        initial={{
                            x: '50vw',
                            y: '60vh',
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            x: `${50 + (Math.random() - 0.5) * 80}vw`,
                            y: `${20 + Math.random() * 40}vh`,
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 0],
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 2.5,
                            delay: i * 0.1,
                            ease: "easeOut"
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: `${20 + Math.random() * 15}px`,
                            filter: 'drop-shadow(0 4px 8px rgba(255, 77, 79, 0.3))',
                        }}
                    >
                        💖
                    </motion.div>
                ))}
            </AnimatePresence> */}
        </div>
    );
};

export default CelebrationEffect;