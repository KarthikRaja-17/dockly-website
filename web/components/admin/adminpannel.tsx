import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Edit, Eye } from 'lucide-react';
import { useAdmin } from './context';

export default function AdminBar() {
    const { isAdmin, logout } = useAdmin();

    if (!isAdmin) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3rem',
                backgroundColor: '#1f2937',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1rem',
                zIndex: 100,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <Edit size={16} />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    Admin Mode - Hover over content to edit
                </span>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Press Ctrl+Shift+A to exit
                </span>
                <button
                    onClick={logout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.3rem 0.6rem',
                        backgroundColor: '#374151',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.3rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                >
                    <LogOut size={14} />
                    Exit
                </button>
            </div>
        </motion.div>
    );
}