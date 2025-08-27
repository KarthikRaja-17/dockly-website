import React, { useState } from "react";
import { Play, Volume2, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "./config";
import { useAdmin } from "./admin/context";
import EditableText from "./admin/editableText";
import EditableImage from "./admin/editableImages";

export default function VideoSection() {
    const { config, saveConfigToServer } = useAdmin();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section style={{
            paddingTop: '3.5rem',
            paddingBottom: '3.5rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0f9ff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Professional background effects */}
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
            {[...Array(18)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: `${3 + Math.random() * 4}px`,
                        height: `${3 + Math.random() * 4}px`,
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][i % 4],
                        borderRadius: '50%',
                        opacity: 0.4,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 4,
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
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        style={{
                            fontSize: '2.2rem',
                            fontWeight: 'bold',
                            color: '#111827',
                            marginBottom: '0.8rem'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <EditableText
                            value={config.video.title}
                            onSave={() => { saveConfigToServer() }}
                            configPath="video.title"
                        >
                            {config.video.title}
                        </EditableText>
                    </motion.h2>
                    <motion.p
                        style={{
                            fontSize: '1.125rem',
                            color: '#4b5563',
                            maxWidth: '38rem',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <EditableText
                            value={config.video.subtitle}
                            onSave={() => { saveConfigToServer() }}
                            configPath="video.subtitle"
                            multiline
                        >
                            {config.video.subtitle}
                        </EditableText>
                    </motion.p>
                </motion.div>

                <motion.div
                    style={{
                        maxWidth: '52rem',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '1.5rem',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
                        background: 'linear-gradient(135deg, #1e293b, #334155)'
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: 0,
                            cursor: isPlaying ? 'default' : 'pointer',
                            background: isPlaying ? 'transparent' : 'linear-gradient(135deg, #1e293b, #334155)'
                        }}
                        onClick={() => !isPlaying && setIsPlaying(true)}
                    >
                        <AnimatePresence mode="wait">
                            {!isPlaying ? (
                                <motion.div
                                    key="thumbnail"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        color: 'white',
                                        backgroundImage: `url(${config.video.thumbnailImage || '/dashboard'})`,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        style={{
                                            position: 'relative',
                                            marginBottom: '1.5rem'
                                        }}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <motion.div
                                            style={{
                                                width: '7rem',
                                                height: '7rem',
                                                borderRadius: '50%',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)',
                                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                                boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.3)'
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                background: 'rgba(255, 255, 255, 0.15)'
                                            }}
                                        >
                                            <motion.div
                                                style={{
                                                    width: '4rem',
                                                    height: '4rem',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Play style={{
                                                    width: '1.8rem',
                                                    height: '1.8rem',
                                                    marginLeft: '0.2rem',
                                                    fill: 'white'
                                                }} />
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    <motion.h3
                                        style={{
                                            fontSize: '1.8rem',
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            marginBottom: '0.6rem',
                                            color: 'black',
                                            WebkitBackgroundClip: 'text',
                                            zIndex: 1000,
                                            backgroundClip: 'text'
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        {/* <EditableText
                                            value={config.video.thumbnailText}
                                            onSave={() => { saveConfigToServer() }}
                                            configPath="video.thumbnailText"
                                        >
                                            {config.video.thumbnailText}
                                        </EditableText> */}
                                    </motion.h3>

                                    <motion.p
                                        style={{
                                            color: '#cbd5e1',
                                            textAlign: 'center',
                                            fontSize: '1rem'
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        {/* <EditableText
                                            value="Click to watch our product demo"
                                            onSave={() => { saveConfigToServer() }}
                                            configPath="video.playText"
                                        >
                                            Click to watch our product demo
                                        </EditableText> */}
                                    </motion.p>

                                    <EditableImage
                                        src={config.video.thumbnailImage}
                                        alt="Video thumbnail"
                                        onSave={() => { saveConfigToServer() }}
                                        configPath="video.thumbnailImage"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            zIndex: -1
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.iframe
                                    key="video"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                    }}
                                    src={`https://www.youtube.com/embed/${config.video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                                    title="Dockly Demo Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {isHovered && !isPlaying && (
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: '0.8rem',
                                    left: '0.8rem',
                                    right: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.8rem 1.2rem',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    borderRadius: '0.8rem',
                                    backdropFilter: 'blur(10px)'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}>
                                    <Volume2 size={16} />
                                    <span>HD Quality</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    color: '#cbd5e1',
                                    fontSize: '0.9rem'
                                }}>
                                    <Maximize size={16} />
                                    <span>Full Screen Available</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}