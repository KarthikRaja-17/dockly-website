import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface ImageGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (imagePath: string) => void;
    currentImage?: string;
}

// Dummy image gallery - replace with actual gallery API later
const dummyImages = [
    '/dashboard.jpg',
    '/dashboard1.jpg',
    '/home.jpg',
    '/family.jpg',
    '/finance.jpg',
    '/health.jpg',
    '/planner.jpg',
    '/pay.jpg',
    '/dockly-logo.png'
];

export default function ImageGallery({ isOpen, onClose, onSelect, currentImage }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(currentImage || '');

    const handleSelect = () => {
        onSelect(selectedImage);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9999,
                            backdropFilter: 'blur(4px)'
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '2rem',
                            width: '80vw',
                            maxWidth: '800px',
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            zIndex: 10000,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Select Image</h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    color: '#6b7280'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            {dummyImages.map((image) => (
                                <motion.div
                                    key={image}
                                    onClick={() => setSelectedImage(image)}
                                    style={{
                                        position: 'relative',
                                        aspectRatio: '16/9',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: selectedImage === image ? '3px solid #3b82f6' : '2px solid #e5e7eb'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img
                                        src={image}
                                        alt="Gallery"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    {selectedImage === image && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            style={{
                                                position: 'absolute',
                                                top: '0.5rem',
                                                right: '0.5rem',
                                                backgroundColor: '#3b82f6',
                                                borderRadius: '50%',
                                                padding: '0.25rem',
                                                color: 'white'
                                            }}
                                        >
                                            <Check size={16} />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={onClose}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSelect}
                                disabled={!selectedImage}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: selectedImage ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#d1d5db',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: selectedImage ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Select Image
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}