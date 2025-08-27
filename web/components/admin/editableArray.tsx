import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Plus, Trash2, Check, X } from 'lucide-react';
import { useAdmin } from './context';

interface EditableArrayProps {
    items: string[];
    onSave: (items: string[]) => void;
    configPath: string;
    children: React.ReactNode;
}

export default function EditableArray({
    items,
    onSave,
    configPath,
    children
}: EditableArrayProps) {
    const { isAdmin, updateConfig } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [editItems, setEditItems] = useState(items);
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = () => {
        updateConfig(configPath, editItems);
        onSave(editItems);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditItems(items);
        setIsEditing(false);
    };

    const addItem = () => {
        setEditItems([...editItems, '']);
    };

    const removeItem = (index: number) => {
        setEditItems(editItems.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, value: string) => {
        const newItems = [...editItems];
        newItems[index] = value;
        setEditItems(newItems);
    };

    if (!isAdmin) {
        return <>{children}</>;
    }

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
                            right: '0.5rem',
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
                                width: '90%',
                                maxWidth: '500px',
                                maxHeight: '80vh',
                                overflow: 'auto'
                            }}
                        >
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                color: '#111827'
                            }}>
                                Edit Items
                            </h3>

                            <div style={{ marginBottom: '1rem' }}>
                                {editItems.map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        alignItems: 'center'
                                    }}>
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => updateItem(index, e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: '0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.9rem'
                                            }}
                                            placeholder={`Item ${index + 1}`}
                                        />
                                        <button
                                            onClick={() => removeItem(index)}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    onClick={addItem}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem'
                                    }}
                                >
                                    <Plus size={16} />
                                    Add Item
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