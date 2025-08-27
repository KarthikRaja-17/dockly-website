import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Star, Zap, Shield, Clock } from "lucide-react";
import ImagePreview from "./imagePreview";

interface PreviewData {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    gradient: string;
    textColor: string;
    features?: string[] | Array<{ icon: string; text: string }>;
    badges?: string[];
}

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: PreviewData | null;
}

export default function PreviewModal({
    isOpen,
    onClose,
    data,
}: PreviewModalProps) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!data) return null;

    const handleImageClick = () => {
        if (data.image) {
            setIsImageModalOpen(true);
        }
    };

    const handleImageModalClose = () => {
        setIsImageModalOpen(false);
    };

    const handleModalBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getFeatureIcon = (index: number) => {
        const icons = [Star, Zap, Shield, Clock];
        const Icon = icons[index % icons.length];
        return <Icon className="w-3.5 h-3.5" />;
    };

    // Calculate modal width based on content
    const hasImage = !!data.image;
    const hasFeatures = data.features && data.features.length > 0;
    const hasBadges = data.badges && data.badges.length > 0;

    // Determine layout and width
    const shouldUseHorizontalLayout = hasImage && (window.innerWidth >= 1024);
    const modalWidth = "max-w-4xl";

    return (
        <>
            {/* Main Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{
                            background: "radial-gradient(circle at center, rgba(79, 70, 229, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)",
                            backdropFilter: "blur(16px)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleModalBackdropClick}
                    >
                        <motion.div
                            className={`relative bg-white rounded-2xl overflow-hidden shadow-xl border border-white/20 w-full ${modalWidth} max-h-[90vh]`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-pink-400/10 to-orange-600/10 rounded-full blur-2xl"></div>
                            </div>

                            {/* Header Controls */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                {/* View Image Button */}
                                {data.image && (
                                    <motion.button
                                        onClick={handleImageClick}
                                        className="group relative w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-200"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Eye className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
                                    </motion.button>
                                )}

                                {/* Close Button */}
                                <motion.button
                                    onClick={onClose}
                                    className="group relative w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-200"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-4 h-4 text-gray-700 group-hover:text-red-600 transition-colors" />
                                </motion.button>
                            </div>

                            {/* Content Container */}
                            <div className={`flex h-full ${shouldUseHorizontalLayout ? 'flex-row' : 'flex-col'} overflow-hidden`}>
                                {/* Image Section */}
                                {hasImage && (
                                    <div className={`relative ${shouldUseHorizontalLayout ? 'w-3/5' : 'w-full h-48'} flex items-center justify-center p-4`}>
                                        <motion.div
                                            className="relative w-full h-full rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                                            style={{
                                                background: data.gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            }}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.1 }}
                                            onClick={handleImageClick}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                                                <div className="text-white flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>View Full</span>
                                                </div>
                                            </div>

                                            <img
                                                src={data.image}
                                                alt={`${data.title} Preview`}
                                                className="w-full h-full object-cover"
                                                draggable={false}
                                            />
                                        </motion.div>
                                    </div>
                                )}

                                {/* Content Section */}
                                <div className={`relative ${shouldUseHorizontalLayout ? 'w-2/5' : 'w-full'} bg-white flex flex-col overflow-y-auto`}>
                                    <motion.div
                                        className="p-5 space-y-4"
                                        initial={{ opacity: 0, x: shouldUseHorizontalLayout ? 20 : 0, y: shouldUseHorizontalLayout ? 0 : 20 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                    >
                                        {/* Header */}
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                                {data.title}
                                            </h2>
                                            <p
                                                className="text-sm font-medium"
                                                style={{ color: data.textColor || "#6b7280" }}
                                            >
                                                {data.subtitle}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {data.description}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        {hasFeatures && (
                                            <div className="space-y-3">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Key Features
                                                </h3>
                                                <div className="space-y-2">
                                                    {data.features!.map((feature, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                                                        >
                                                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                                                                {getFeatureIcon(index)}
                                                            </div>
                                                            <span className="text-xs text-gray-700 font-medium">
                                                                {typeof feature === "string" ? feature : feature.text}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Badges */}
                                        {hasBadges && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {data.badges!.map((badge, index) => (
                                                    <motion.span
                                                        key={index}
                                                        className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: 0.4 + index * 0.05,
                                                        }}
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {badge}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Preview Modal */}
            <ImagePreview
                isOpen={isImageModalOpen}
                onClose={handleImageModalClose}
                imageUrl={data?.image ?? ''}
                title={data?.title ?? ''}
            />
        </>
    );
}