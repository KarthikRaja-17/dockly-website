import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Plus, Trash2, Check, X } from 'lucide-react';
import { useAdmin } from './context';

interface FaqItem {
    question: string;
    answer: string;
}

interface EditableFaqArrayProps {
    items: FaqItem[];
    onSave: (items: FaqItem[]) => void;
    configPath: string;
    children: React.ReactNode;
}

export default function EditableFaqArray({
    items,
    onSave,
    configPath,
    children
}: EditableFaqArrayProps) {
    const { isAdmin, updateConfig } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [editItems, setEditItems] = useState<FaqItem[]>(items);
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
        setEditItems([...editItems, { question: '', answer: '' }]);
    };

    const removeItem = (index: number) => {
        setEditItems(editItems.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
        const newItems = [...editItems];
        newItems[index] = { ...newItems[index], [field]: value };
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
                            top: '1rem',
                            right: '1rem',
                            width: '2.5rem',
                            height: '2.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        <Edit3 size={16} />
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
                                padding: '2rem',
                                width: '90%',
                                maxWidth: '800px',
                                maxHeight: '80vh',
                                overflow: 'auto'
                            }}
                        >
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                color: '#111827'
                            }}>
                                Edit FAQ Items
                            </h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                {editItems.map((item, index) => (
                                    <div key={index} style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        padding: '1.5rem',
                                        marginBottom: '1rem',
                                        backgroundColor: '#f9fafb'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1rem'
                                        }}>
                                            <h4 style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                color: '#374151',
                                                margin: 0
                                            }}>
                                                FAQ #{index + 1}
                                            </h4>
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
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }}>
                                                Question
                                            </label>
                                            <input
                                                type="text"
                                                value={item.question}
                                                onChange={(e) => updateItem(index, 'question', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.5rem',
                                                    fontSize: '1rem',
                                                    backgroundColor: 'white'
                                                }}
                                                placeholder="Enter the question..."
                                            />
                                        </div>

                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }}>
                                                Answer
                                            </label>
                                            <textarea
                                                value={item.answer}
                                                onChange={(e) => updateItem(index, 'answer', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.5rem',
                                                    fontSize: '1rem',
                                                    backgroundColor: 'white',
                                                    minHeight: '100px',
                                                    resize: 'vertical'
                                                }}
                                                placeholder="Enter the answer..."
                                            />
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addItem}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.75rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={20} />
                                    Add New FAQ
                                </button>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                justifyContent: 'flex-end',
                                borderTop: '1px solid #e5e7eb',
                                paddingTop: '1.5rem'
                            }}>
                                <button
                                    onClick={handleCancel}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#6b7280',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '1rem'
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