import React from "react";
import { Lock, ShieldX, Key } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "./config";
import { useAdmin } from "./admin/context";
import EditableText from "./admin/editableText";

export default function SecuritySection() {
    const { config, saveConfigToServer } = useAdmin();
    const iconMap = {
        Lock,
        ShieldX,
        Key
    };

    return (
        <section id="security" style={{
            paddingTop: '3rem',
            paddingBottom: '3rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
                `,
            }} />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#06b6d4'][i % 4],
                        borderRadius: '50%',
                        opacity: 0.6,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <div style={{
                maxWidth: '80rem',
                margin: '0 auto',
                padding: '0 1rem',
                position: 'relative'
            }}>
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        style={{
                            fontSize: '2.2rem',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '0.8rem',
                            background: 'linear-gradient(135deg, #fff, #e2e8f0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <EditableText
                            value={config.security.title}
                            onSave={() => { saveConfigToServer() }}
                            configPath="security.title"
                        >
                            {config.security.title}
                        </EditableText>
                    </motion.h2>
                    <motion.p
                        style={{
                            fontSize: '1.125rem',
                            color: '#cbd5e1',
                            maxWidth: '38rem',
                            margin: '0 auto'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <EditableText
                            value={config.security.subtitle}
                            onSave={() => { saveConfigToServer() }}
                            configPath="security.subtitle"
                            multiline
                        >
                            {config.security.subtitle}
                        </EditableText>
                    </motion.p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1.5rem',
                    marginTop: '1.5rem'
                }} className="md:grid-cols-3">
                    {config.security.features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                        const gradients = [
                            'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            'linear-gradient(135deg, #f59e0b, #d97706)',
                            'linear-gradient(135deg, #ef4444, #dc2626)'
                        ];
                        const glowColors = [
                            'rgba(59, 130, 246, 0.4)',
                            'rgba(245, 158, 11, 0.4)',
                            'rgba(239, 68, 68, 0.4)'
                        ];

                        return (
                            <motion.div
                                key={feature.title}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '1.2rem',
                                    padding: '2rem 1.5rem',
                                    textAlign: 'center',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    background: 'rgba(255, 255, 255, 0.12)',
                                    boxShadow: `0 16px 32px ${glowColors[index]}`
                                }}
                            >
                                {/* Background glow effect */}
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: gradients[index],
                                        borderRadius: '1.2rem',
                                        opacity: 0,
                                        transition: 'opacity 0.4s'
                                    }}
                                    whileHover={{ opacity: 0.1 }}
                                />

                                <motion.div
                                    style={{
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        background: gradients[index],
                                        borderRadius: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.2rem auto',
                                        boxShadow: `0 8px 25px ${glowColors[index]}`,
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                    whileHover={{
                                        rotate: [0, -5, 5, 0],
                                        scale: [1, 1.1, 1],
                                        boxShadow: `0 12px 30px ${glowColors[index]}`
                                    }}
                                    transition={{
                                        duration: 0.6, boxShadow: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    animate={{
                                        boxShadow: [
                                            `0 8px 25px ${glowColors[index]}`,
                                            `0 12px 35px ${glowColors[index]}`,
                                            `0 8px 25px ${glowColors[index]}`
                                        ]
                                    }}
                                >
                                    <IconComponent style={{
                                        color: 'white',
                                        width: '1.8rem',
                                        height: '1.8rem'
                                    }} />
                                </motion.div>

                                <motion.h3
                                    style={{
                                        fontSize: '1.125rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginBottom: '0.8rem',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <EditableText
                                        value={feature.title}
                                        onSave={() => { saveConfigToServer() }}
                                        configPath={`security.features.${index}.title`}
                                    >
                                        {feature.title}
                                    </EditableText>
                                </motion.h3>

                                <motion.p
                                    style={{
                                        color: '#cbd5e1',
                                        lineHeight: '1.5',
                                        position: 'relative',
                                        zIndex: 1,
                                        fontSize: '0.95rem'
                                    }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <EditableText
                                        value={feature.description}
                                        onSave={() => { saveConfigToServer() }}
                                        configPath={`security.features.${index}.description`}
                                        multiline
                                    >
                                        {feature.description}
                                    </EditableText>
                                </motion.p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    style={{
                        textAlign: 'center',
                        marginTop: '2.5rem'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.6rem 1.2rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '1.5rem',
                            color: '#10b981',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}
                        whileHover={{
                            scale: 1.05,
                            background: 'rgba(16, 185, 129, 0.15)'
                        }}
                    >
                        <Lock size={14} />
                        <EditableText
                            value="Bank-level security guarantee"
                            onSave={() => { saveConfigToServer() }}
                            configPath="security.guarantee"
                        >
                            <span>Bank-level security guarantee</span>
                        </EditableText>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}