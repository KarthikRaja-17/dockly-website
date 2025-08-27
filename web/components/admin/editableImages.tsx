import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Image, Check, X } from 'lucide-react';
import { useAdmin } from './context';

interface EditableImageProps {
    src: string;
    alt: string;
    onSave: (src: string) => void;
    configPath: string;
    style?: React.CSSProperties;
    className?: string;
}

const IMAGE_GALLERY = [
    { src: '/dashboard.jpg', name: 'Dashboard' },
    { src: '/dashboard1.jpg', name: 'Dashboard Alt' },
    { src: '/home.jpg', name: 'Home' },
    { src: '/family.jpg', name: 'Family' },
    { src: '/finance.jpg', name: 'Finance' },
    { src: '/health.jpg', name: 'Health' },
    { src: '/planner.jpg', name: 'Planner' },
    { src: '/pay.jpg', name: 'Payment' },
    { src: '/dockly-logo.png', name: 'Logo' },
];

export default function EditableImage({
    src,
    alt,
    onSave,
    configPath,
    style,
    className
}: EditableImageProps) {
    const { isAdmin, updateConfig } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(src);

    const handleSave = () => {
        updateConfig(configPath, selectedImage);
        onSave(selectedImage);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setSelectedImage(src);
        setIsEditing(false);
    };

    if (!isAdmin) {
        return <img src={src} alt={alt} style={style} className={className} />;
    }

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={src} alt={alt} style={style} className={className} />

            <AnimatePresence>
                {isHovered && !isEditing && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true);
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '0.5rem',
                            right: '0.5rem',
                            width: '2rem',
                            height: '2rem',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <Image size={14} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            backdropFilter: 'blur(4px)'
                        }}
                        onClick={handleCancel}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                width: '90%',
                                maxWidth: '600px',
                                maxHeight: '80vh',
                                overflow: 'auto',
                                position: 'relative'
                            }}
                        >
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                color: '#111827'
                            }}>
                                Select Image
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                {IMAGE_GALLERY.map((image) => (
                                    <div
                                        key={image.src}
                                        onClick={() => setSelectedImage(image.src)}
                                        style={{
                                            cursor: 'pointer',
                                            border: selectedImage === image.src ? '3px solid #3b82f6' : '2px solid #e5e7eb',
                                            borderRadius: '0.5rem',
                                            overflow: 'hidden',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.name}
                                            style={{
                                                width: '100%',
                                                height: '80px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{
                                            padding: '0.5rem',
                                            fontSize: '0.8rem',
                                            textAlign: 'center',
                                            backgroundColor: selectedImage === image.src ? '#eff6ff' : '#f9fafb'
                                        }}>
                                            {image.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    onClick={handleCancel}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#6b7280',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}
                                >
                                    <Check size={16} />
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}