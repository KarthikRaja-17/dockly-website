import React from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImagePreviewProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

export default function ImagePreview({ isOpen, onClose, imageUrl = '', title = '' }: ImagePreviewProps) {
    const [zoom, setZoom] = React.useState(1);
    const [rotation, setRotation] = React.useState(0);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case '=':
                case '+':
                    e.preventDefault();
                    handleZoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    handleZoomOut();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    handleRotate();
                    break;
                case '0':
                    e.preventDefault();
                    handleReset();
                    break;
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const handleRotate = () => setRotation(prev => prev + 90);
    const handleReset = () => {
        setZoom(1);
        setRotation(0);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-preview.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download image:', error);
            // Fallback method
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-preview.jpg`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Controls */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                        {/* <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-105 border border-white/20"
                            title="Zoom Out (-)"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-105 border border-white/20"
                            title="Zoom In (+)"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={(e) => { e.stopPropagation(); handleRotate(); }}
                            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-105 border border-white/20"
                            title="Rotate (R)"
                        >
                            <RotateCw className="w-5 h-5" />
                        </motion.button> */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                            className="p-3 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-105 border border-green-500/30"
                            title="Download"
                        >
                            <Download className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={onClose}
                            className="p-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md rounded-full text-white transition-all duration-200 hover:scale-105 border border-red-500/30"
                            title="Close (ESC)"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Reset button */}
                    {/* <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={(e) => { e.stopPropagation(); handleReset(); }}
                        className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105 border border-white/20"
                        title="Reset View (0)"
                    >
                        Reset View
                    </motion.button> */}

                    {/* Keyboard shortcuts info */}
                    {/* <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-20 left-4 z-10 px-3 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white text-xs space-y-1"
                    >
                        <div className="font-medium mb-2">Keyboard Shortcuts:</div>
                        <div>ESC - Close</div>
                        <div>+/- - Zoom</div>
                        <div>R - Rotate</div>
                        <div>0 - Reset</div>
                    </motion.div> */}

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white border border-white/20"
                    >
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-sm text-gray-300 mt-1">Click outside to close</p>
                    </motion.div>

                    {/* Zoom indicator */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-sm border border-white/20"
                    >
                        <span className="font-mono">{Math.round(zoom * 100)}%</span>
                        {rotation !== 0 && (
                            <span className="ml-2 text-gray-300">
                                {rotation}°
                            </span>
                        )}
                    </motion.div> */}

                    {/* Image */}
                    <div className="flex items-center justify-center h-full p-8">
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={imageUrl}
                            alt={title}
                            style={{
                                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease',
                                borderRadius: '12px',
                                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onLoad={() => console.log('Image loaded successfully')}
                            onError={() => console.error('Failed to load image')}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}