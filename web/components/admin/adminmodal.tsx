import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useAdmin } from './context';
import { authenticateAdmin } from '@/services/api';

export default function LoginModal() {
    const { isLoginModalOpen, setIsLoginModalOpen, setIsAdmin } = useAdmin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authenticateAdmin({ username, password });

            if (response.data.status === 1) {
                setIsAdmin(true);
                setIsLoginModalOpen(false);
                setUsername('');
                setPassword('');
                setError('');
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsLoginModalOpen(false);
        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <AnimatePresence>
            {isLoginModalOpen && (
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
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '2rem',
                            width: '100%',
                            maxWidth: '400px',
                            margin: '1rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={handleClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
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

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                backgroundColor: '#3b82f6',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto'
                            }}>
                                <Lock size={20} style={{ color: 'white' }} />
                            </div>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#111827',
                                marginBottom: '0.5rem'
                            }}>
                                Admin Login
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                Enter your credentials to access admin mode
                            </p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <User size={20} style={{
                                        position: 'absolute',
                                        left: '0.75rem',
                                        color: '#6b7280',
                                        zIndex: 1
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            opacity: isLoading ? 0.5 : 1
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Lock size={20} style={{
                                        position: 'absolute',
                                        left: '0.75rem',
                                        color: '#6b7280',
                                        zIndex: 1
                                    }} />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            opacity: isLoading ? 0.5 : 1
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#fee2e2',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '0.5rem',
                                    color: '#dc2626',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}>
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isLoading) {
                                        e.currentTarget.style.backgroundColor = '#2563eb';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isLoading) {
                                        e.currentTarget.style.backgroundColor = '#3b82f6';
                                    }
                                }}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>

                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '0.5rem',
                            fontSize: '0.8rem',
                            color: '#6b7280'
                        }}>
                            <strong>For Demo:</strong> Contact admin for credentials
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}