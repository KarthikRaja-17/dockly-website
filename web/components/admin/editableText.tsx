import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X } from 'lucide-react';
import { useAdmin } from './context';

interface EditableTextProps {
    value: string;
    onSave: (value: string) => void;
    multiline?: boolean;
    className?: string;
    style?: React.CSSProperties;
    configPath: string;
    children: React.ReactNode;
}

export default function EditableText({
    value,
    onSave,
    multiline = false,
    className,
    style,
    configPath,
    children
}: EditableTextProps) {
    const { isAdmin, updateConfig } = useAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setEditValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        updateConfig(configPath, editValue);
        onSave(editValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
            e.preventDefault();
            handleSave();
        }
    };

    if (!isAdmin) {
        return <>{children}</>;
    }

    if (isEditing) {
        return (
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            ...style,
                            width: '100%',
                            minHeight: '100px',
                            padding: '0.5rem',
                            border: '2px solid #3b82f6',
                            borderRadius: '0.5rem',
                            fontSize: 'inherit',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                        className={className}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            ...style,
                            width: '100%',
                            padding: '0.5rem',
                            border: '2px solid #3b82f6',
                            borderRadius: '0.5rem',
                            fontSize: 'inherit',
                            fontFamily: 'inherit',
                            fontWeight: 'inherit',
                            background: 'white'
                        }}
                        className={className}
                    />
                )}

                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    display: 'flex',
                    gap: '0.25rem',
                    marginTop: '0.25rem',
                    zIndex: 10
                }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '0.25rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Check size={14} />
                    </button>
                    <button
                        onClick={handleCancel}
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
                        <X size={14} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{ position: 'relative', display: 'inline-block', width: '100%' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

            <AnimatePresence>
                {isHovered && (
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
                            top: '-0.5rem',
                            right: '-0.5rem',
                            width: '1.5rem',
                            height: '1.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <Edit3 size={10} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}