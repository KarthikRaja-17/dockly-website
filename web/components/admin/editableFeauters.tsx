import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Plus, Trash2, Check, X } from 'lucide-react';
import { useAdmin } from './context';

interface Feature {
    title: string;
    desc: string;
    icon: string;
    color: string;
}

interface EditableFeaturesProps {
    features: Feature[];
    onSave: (features: Feature[]) => void;
    configPath: string;
    children: React.ReactNode;
}

const iconOptions = ['Link', 'Users', 'Home', 'Heart', 'DollarSign', 'Calendar', 'Activity', 'TrendingUp'];
const colorOptions = [
    'linear-gradient(135deg, #fee2e2, #fecaca)',
    'linear-gradient(135deg, #ddd6fe, #e0e7ff)',
    'linear-gradient(135deg, #d1fae5, #dcfce7)',
    'linear-gradient(135deg, #fef3c7, #fde68a)',
    'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    'linear-gradient(135deg, #fde2e2, #fed7d7)'
];

export default function EditableFeatures({
    features,
    onSave,
    configPath,
    children
}: EditableFeaturesProps) {
    const { isAdmin, updateConfig } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [editFeatures, setEditFeatures] = useState(features);
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = () => {
        updateConfig(configPath, editFeatures);
        onSave(editFeatures);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditFeatures(features);
        setIsEditing(false);
    };

    const addFeature = () => {
        const newFeature: Feature = {
            title: 'New Feature',
            desc: 'Feature description',
            icon: 'Link',
            color: colorOptions[0]
        };
        setEditFeatures([...editFeatures, newFeature]);
    };

    const removeFeature = (index: number) => {
        setEditFeatures(editFeatures.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, field: keyof Feature, value: string) => {
        const newFeatures = [...editFeatures];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setEditFeatures(newFeatures);
    };

    // if (!isAdmin) {
    //     return <>{children}</>;
    // }

    return (
        <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

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
                            top: '0.5rem',
                            left: '0.5rem',
                            width: '2rem',
                            height: '2rem',
                            backgroundColor: '#3b82f6',
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
                        <Edit3 size={14} />
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
                                width: '95%',
                                maxWidth: '800px',
                                maxHeight: '85vh',
                                overflow: 'auto'
                            }}
                        >
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                color: '#111827'
                            }}>
                                Edit Features
                            </h3>

                            <div style={{ marginBottom: '1rem' }}>
                                {editFeatures.map((feature, index) => (
                                    <div key={index} style={{
                                        padding: '1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        marginBottom: '1rem',
                                        backgroundColor: '#f9fafb'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '0.75rem'
                                        }}>
                                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                                                Feature {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeFeature(index)}
                                                style={{
                                                    padding: '0.25rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.25rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '0.75rem',
                                            marginBottom: '0.75rem'
                                        }}>
                                            <div>
                                                <label style={{
                                                    display: 'block',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    marginBottom: '0.25rem',
                                                    color: '#374151'
                                                }}>
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={feature.title}
                                                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.375rem',
                                                        fontSize: '0.875rem'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{
                                                    display: 'block',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    marginBottom: '0.25rem',
                                                    color: '#374151'
                                                }}>
                                                    Icon
                                                </label>
                                                <select
                                                    value={feature.icon}
                                                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.375rem',
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    {iconOptions.map(icon => (
                                                        <option key={icon} value={icon}>{icon}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.25rem',
                                                color: '#374151'
                                            }}>
                                                Description
                                            </label>
                                            <textarea
                                                value={feature.desc}
                                                onChange={(e) => updateFeature(index, 'desc', e.target.value)}
                                                rows={2}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.875rem',
                                                    resize: 'vertical'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.25rem',
                                                color: '#374151'
                                            }}>
                                                Background Color
                                            </label>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                gap: '0.5rem'
                                            }}>
                                                {colorOptions.map((color, colorIndex) => (
                                                    <button
                                                        key={colorIndex}
                                                        onClick={() => updateFeature(index, 'color', color)}
                                                        style={{
                                                            height: '2rem',
                                                            border: feature.color === color ? '2px solid #3b82f6' : '1px solid #d1d5db',
                                                            borderRadius: '0.375rem',
                                                            background: color,
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addFeature}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={18} />
                                    Add New Feature
                                </button>
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
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}