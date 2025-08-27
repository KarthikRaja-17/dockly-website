import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { useVerifyOTPMutation } from '@/store/apiSlice';
import { setIsOTPModalOpen, clearOTPData } from '@/store/authSlice';
import { RootState } from '@/store';

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    setShowConfetti: (value: boolean) => void;
    setEmail: (value: string) => void;
    setIsSubmitted: (value: boolean) => void;
    onVerify: (otp: string) => Promise<boolean>;
    onResend?: () => Promise<void>;
}

export default function OTPModal({
    isOpen,
    onClose,
    email,
    onVerify,
    onResend,
    setIsSubmitted,
    setShowConfetti,
    setEmail
}: OTPModalProps) {
    const dispatch = useDispatch();
    const { otpData } = useSelector((state: RootState) => state.auth);
    const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();

    const [otp, setOtp] = useState(['', '', '', '']);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Focus first box when modal opens
    useEffect(() => {
        if (isOpen && inputRefs.current[0]) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(['', '', '', '']);
            setIsVerified(false);
            setError('');
        }
    }, [isOpen]);

    const handleInputChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // only digits
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // only last digit
        setOtp(newOtp);
        setError('');

        // Auto focus next
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto verify
        if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
        if (pastedData.length === 4) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            setError('');
            handleVerify(pastedData);
        }
    };

    const handleVerify = async (otpCode: string) => {
        if (!otpData) return;
        try {
            const result = await verifyOTP({
                userId: otpData.userId,
                email: otpData.email,
                otp: otpCode,
                storedOtp: otpData.otp
            }).unwrap();

            if (result.status === 1) {
                setIsVerified(true);
                setShowConfetti(true);
                setIsSubmitted(true);
                setEmail('');
                setTimeout(() => {
                    handleClose();
                }, 1500);
            } else {
                setError('Invalid code. Please try again.');
                setOtp(['', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (err: any) {
            setError(err?.data?.message || 'Verification failed. Please try again.');
            setOtp(['', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    const handleResend = async () => {
        if (!onResend || resendCooldown > 0) return;
        setIsResending(true);
        try {
            await onResend();
            setResendCooldown(30);
            setOtp(['', '', '', '']);
            setError('');
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    const handleClose = () => {
        dispatch(setIsOTPModalOpen(false));
        dispatch(clearOTPData());
        onClose();
    };

    const maskEmail = (email: string): string => {
        if (!email) return '';
        const [name, domain] = email.split('@');
        if (!name || !domain) return email;
        const visiblePart = name.slice(0, 2);
        const maskedPart = '*'.repeat(Math.max(name.length - 2, 0));
        return `${visiblePart}${maskedPart}@${domain}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(16px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden"
                        style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <div className="absolute top-4 right-4 z-10">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClose}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 0, 0, 0.1)',

                                    border: 'none',
                                    color: '#6b7280'
                                }}
                                className="hover:bg-gray-200 transition-all duration-200"
                            >
                                <X className="w-4 h-4" style={{ marginLeft: 8 }} />
                            </Button>
                        </div>

                        {!isVerified ? (
                            <motion.div
                                className="p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <motion.div
                                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        <Mail className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Email</h3>
                                    <p className="text-sm text-gray-600">
                                        Enter the 4-digit code sent to<br />
                                        <span className="font-medium text-gray-900">{maskEmail(email)}</span>
                                    </p>
                                </div>

                                {/* OTP Inputs */}
                                <div className="mb-6">
                                    <div className="flex justify-center space-x-3">
                                        {otp.map((digit, index) => (
                                            <motion.input
                                                key={index}
                                                ref={(el) => {
                                                    inputRefs.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                className="w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0"
                                                style={{
                                                    borderColor: error ? '#ef4444' : digit ? '#3b82f6' : '#e5e7eb',
                                                    backgroundColor: digit ? '#eff6ff' : '#ffffff',
                                                    color: '#111827',
                                                }}
                                                disabled={isVerifying || isVerified}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                                whileFocus={{ scale: 1.05, borderColor: '#3b82f6' }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            className="mb-4 p-3 rounded-xl flex items-center space-x-2"
                                            style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                            <span className="text-sm text-red-700">{error}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Loading */}
                                {isVerifying && (
                                    <motion.div
                                        className="text-center mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="inline-flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm text-gray-600">Verifying...</span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Resend */}
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-3">
                                        Didn't receive the code?
                                    </p>
                                    <Button
                                        variant="ghost"
                                        onClick={handleResend}
                                        disabled={resendCooldown > 0 || isResending}
                                        className="text-sm text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-200"
                                        style={{ border: 'none', minHeight: '36px' }}
                                    >
                                        {isResending ? (
                                            <div className="flex items-center space-x-2">
                                                <RotateCcw className="w-4 h-4 animate-spin" />
                                                <span>Sending...</span>
                                            </div>
                                        ) : resendCooldown > 0 ? (
                                            `Resend in ${resendCooldown}s`
                                        ) : (
                                            <div className="flex items-center space-x-1">
                                                <RotateCcw className="w-4 h-4" />
                                                <span>Resend Code</span>
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="p-6 text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                                >
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Verified!</h3>
                                <p className="text-sm text-gray-600">
                                    Email verification completed successfully
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}