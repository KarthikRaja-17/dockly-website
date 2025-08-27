"use client";

import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { HeartFilled, HeartOutlined, DollarOutlined, HomeOutlined, TeamOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Row, Tooltip, message } from "antd";
import EditableText from "./admin/editableText";
import EditableImage from "./admin/editableImages";
import ConfettiEffect from "./effect";
import { useAdmin } from "./admin/context";
import {
  Calendar,
  TrendingUp,
  Percent,
  Shield,
  Gift,
  Settings,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  Shuffle
} from "lucide-react";
import { useAddToWishlistMutation } from "@/store/apiSlice";
import { setOTPData, setIsOTPModalOpen } from "@/store/authSlice";
import { RootState } from "@/store";
// import FlipText from "./FlipText";
import OTPModal from "./otpModal";
import FlipText from "./typewriter";

export interface WishlistFormRef {
  focusAndGlow: () => void;
}

const HeroSection = forwardRef<WishlistFormRef>((props, ref) => {
  const dispatch = useDispatch();
  const { config, saveConfigToServer } = useAdmin();
  const { otpData, isOTPModalOpen } = useSelector((state: RootState) => state.auth);

  const [addToWishlist, { isLoading: isSubmitting }] = useAddToWishlistMutation();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(config.hero.cycleWords[0]?.image);
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hasCompletedOneCycle, setHasCompletedOneCycle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusAndGlow: () => {
      if (inputRef.current) {
        inputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Enhanced glow effect
        setIsGlowing(true);

        setTimeout(() => {
          inputRef.current?.focus();
          // Add cursor blinking effect by setting selection
          inputRef.current?.setSelectionRange(email.length, email.length);
        }, 800);

        setTimeout(() => {
          setIsGlowing(false);
        }, 4000); // Extended glow duration
      }
    },
  }));

  // Enhanced auto-play functionality - automatically pauses at last word
  React.useEffect(() => {
    if (!isAutoPlay || isImageHovered) return;

    const interval = setInterval(() => {
      const nextIndex = (currentWordIndex + 1) % config.hero.cycleWords.length;

      // If we're at the last word, pause auto-play
      if (currentWordIndex === config.hero.cycleWords.length - 1) {
        setIsAutoPlay(false);
        setHasCompletedOneCycle(true);
        return;
      }

      handleWordChange(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isImageHovered, currentWordIndex, config.hero.cycleWords.length]);

  const handleWordChange = (index: number) => {
    setCurrentWordIndex(index);
    setCurrentImage(config.hero.cycleWords[index]?.image);

    // If user manually changes and we're not at the end, resume auto-play
    if (index < config.hero.cycleWords.length - 1 && hasCompletedOneCycle) {
      setHasCompletedOneCycle(false);
      setIsAutoPlay(true);
    }
  };

  const handlePrevWord = () => {
    const prevIndex = (currentWordIndex - 1 + config.hero.cycleWords.length) % config.hero.cycleWords.length;
    handleWordChange(prevIndex);
  };

  const handleNextWord = () => {
    const nextIndex = (currentWordIndex + 1) % config.hero.cycleWords.length;
    handleWordChange(nextIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      message.error('Please enter a valid email address');
      return;
    }

    try {
      const result = await addToWishlist({
        email: email,
        first_name: "Dockly Explorer",
        isNewRequest: true,
        userId: 0
      }).unwrap();

      if (result.status !== 1) {
        message.error(result.message);
        return;
      }

      // Store OTP data in Redux store
      if (result.payload) {
        dispatch(setOTPData({
          userId: result.payload.userId,
          otp: result.payload.otp,
          email: result.payload.email
        }));
        dispatch(setIsOTPModalOpen(true));
      }

      message.success(result.message);
    } catch (error: any) {
      message.error(error?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleVerify = async (otp: string) => {
    if (!otpData) return false;

    try {
      const { useVerifyOTPMutation } = await import("@/store/apiSlice");
      const [verifyOTP] = useVerifyOTPMutation();

      const result = await verifyOTP({
        userId: otpData.userId,
        email: otpData.email,
        otp: otp,
        storedOtp: otpData.otp
      }).unwrap();

      if (result.status === 1) {
        message.success('🎉 Email verified successfully!');
        setIsSubmitted(true);
        setShowConfetti(true);
        setEmail("");

        // Clear OTP data and close modal
        dispatch(setOTPData(null));
        dispatch(setIsOTPModalOpen(false));

        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);

        return true;
      } else {
        message.error('❌ Email verification failed. Please try again.');
        return false;
      }
    } catch (error: any) {
      message.error(error?.data?.message || 'Verification failed. Please try again.');
      return false;
    }
  };

  const handleResend = async (): Promise<void> => {
    if (!otpData) return;

    try {
      const result = await addToWishlist({
        email: otpData.email,
        isNewRequest: false,
        userId: otpData.userId,
        first_name: "Dockly Explorer"
      }).unwrap();

      if (result.status === 1 && result.payload) {
        dispatch(setOTPData({
          userId: result.payload.userId,
          otp: result.payload.otp,
          email: result.payload.email
        }));
        message.success('New OTP sent successfully!');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw error;
    }
  };

  const iconMap = {
    Percent,
    Shield,
    RotateCcw,
    Gift,
    Settings
  };

  // Dynamic icons based on word
  const getFloatingIcon = () => {
    const currentWord = config.hero.cycleWords[currentWordIndex]?.word.toLowerCase();

    if (currentWord?.includes('finance') || currentWord?.includes('financial')) {
      return <DollarOutlined style={{ fontSize: '20px', color: "#fff" }} />;
    } else if (currentWord?.includes('home') || currentWord?.includes('house')) {
      return <HomeOutlined style={{ fontSize: '20px', color: "#fff" }} />;
    } else if (currentWord?.includes('health') || currentWord?.includes('medical')) {
      return <HeartOutlined style={{ fontSize: '20px', color: "#fff" }} />;
    } else if (currentWord?.includes('family') || currentWord?.includes('medical')) {
      return <TeamOutlined style={{ fontSize: '20px', color: "#fff" }} />;
    } else {
      return <Calendar style={{ color: "white", width: "20px", height: "20px" }} />;
    }
  };

  // Dynamic gradient based on current word
  const getFloatingGradient = () => {
    const currentWord = config.hero.cycleWords[currentWordIndex]?.word.toLowerCase();

    if (currentWord?.includes('finance') || currentWord?.includes('financial')) {
      return "linear-gradient(135deg, #13c2c2, #096dd9)";
    } else if (currentWord?.includes('home') || currentWord?.includes('house')) {
      return "linear-gradient(135deg, #fa8c16, #fa541c)";
    } else if (currentWord?.includes('health') || currentWord?.includes('medical')) {
      return "linear-gradient(135deg, #f5222d, #cf1322)";
    } else {
      return "linear-gradient(135deg, #10b981, #06b6d4)";
    }
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #eff6ff 0%, #f3e8ff 50%, #ecfeff 100%)",
        paddingTop: "3rem",
        paddingBottom: "4rem",
      }}
      id="hero-section"
    >
      <ConfettiEffect
        isActive={showConfetti}
        onComplete={handleConfettiComplete}
      />

      {/* Enhanced CSS for input blinking animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes inputBlink {
          0%, 50% { 
            border-color: #ff4d4f;
            box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.3), 0 0 25px rgba(255, 77, 79, 0.4), 0 8px 32px rgba(0, 0, 0, 0.12);
            transform: scale(1.02);
          }
          25%, 75% { 
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 25px rgba(59, 130, 246, 0.4), 0 8px 32px rgba(0, 0, 0, 0.12);
            transform: scale(1.02);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.1), 0 0 30px rgba(99, 102, 241, 0.3);
          }
        }

        @keyframes cursorBlink {
          0%, 50% { border-right: 2px solid #3b82f6; }
          51%, 100% { border-right: 2px solid transparent; }
        }
        
        .input-glowing {
          animation: inputBlink 0.8s ease-in-out 5, pulseGlow 2s ease-in-out infinite;
        }
        
        .input-glowing:focus {
          animation: cursorBlink 1s step-end infinite, pulseGlow 2s ease-in-out infinite;
          caret-color: #3b82f6;
        }
      `}</style>

      {/* Animated Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #06b6d4 50%, #10b981 75%, #f97316 100%)",
          backgroundSize: "400% 400%",
          opacity: 0.05,
          animation: "gradientShift 8s ease infinite",
        }}
      />

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][i % 4],
            borderRadius: '50%',
            opacity: 0.4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "center",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#111827',
                lineHeight: '1.1',
                marginBottom: '1.5rem'
              }}
              className="md:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <EditableText
                value={config.hero.title}
                onSave={() => { saveConfigToServer() }}
                configPath="hero.title"
              >
                {config.hero.title}
              </EditableText>{" "}
              <h1 style={{ marginBottom: "0", }}>
                <FlipText
                  words={config.hero.cycleWords}
                  currentIndex={currentWordIndex}
                  className="inline-block"
                />
              </h1>
              <div style={{ marginTop: '-0.5rem' }}>
                {" "} in One Place
              </div>
            </motion.h1>

            <EditableText
              value="Connect and manage everything that matters - from calendars and finances to family planning and personal projects. Dockly brings it all together in one beautiful, intelligent workspace."
              onSave={() => { saveConfigToServer() }}
              configPath="hero.subtitle"
              multiline
            >
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#4b5563",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                }}
              >
                {config.hero.subtitle}
              </p>
            </EditableText>

            {/* BUTTONS */}
            <motion.form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexDirection: 'column',
                position: 'relative'
              }}
              className="sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Enhanced Email Input with Attractive Blinking */}
              <motion.div
                style={{ flex: 1, position: 'relative' }}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <motion.input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Enter your email address'}
                  disabled={isSubmitting}
                  className={isGlowing ? 'input-glowing' : ''}
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '1rem',
                    border: isGlowing ? '3px solid #3b82f6' : '2px solid #e1e5e9',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isGlowing
                      ? '0 0 0 4px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.3), 0 8px 32px rgba(0, 0, 0, 0.12)'
                      : '0 4px 12px rgba(0, 0, 0, 0.08)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    caretColor: '#3b82f6',
                    transform: isGlowing ? 'scale(1.02)' : 'scale(1)',
                  }}
                  whileFocus={{
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.15), 0 12px 24px rgba(0, 0, 0, 0.12)',
                    caretColor: '#3b82f6'
                  }}
                  animate={isSubmitted ? {
                    borderColor: '#52c41a',
                    boxShadow: '0 0 0 4px rgba(82, 196, 26, 0.15), 0 12px 24px rgba(0, 0, 0, 0.12)'
                  } : {}}
                />

                {/* Enhanced email validation indicator with pulse */}
                <motion.div
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                  animate={{
                    backgroundColor: email.includes('@') && email.length > 5
                      ? '#52c41a'
                      : email.length > 0
                        ? '#faad14'
                        : 'transparent',
                    scale: email.includes('@') && email.length > 5
                      ? [1, 1.3, 1]
                      : 1
                  }}
                  transition={{
                    scale: { duration: 0.6, repeat: email.includes('@') && email.length > 5 ? Infinity : 0 }
                  }}
                />
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  style={{
                    background: "linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(79, 70, 229) 100%)",
                    color: "white",
                    padding: "17px 15px",
                    borderRadius: "1rem",
                    fontSize: "1rem",
                    fontWeight: "400",
                    border: "none",
                    cursor: isSubmitting || isSubmitted ? "default" : "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    whiteSpace: "nowrap",
                    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Button Background Effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                      transform: 'translateX(-100%)'
                    }}
                    animate={isHovered ? { transform: 'translateX(100%)' } : { transform: 'translateX(-100%)' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  {/* Button Content */}
                  <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}
                    animate={isSubmitting ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                  >
                    {isSubmitted ? (
                      <>
                        <motion.div
                          transition={{ duration: 0.5, type: 'spring' }}
                        >
                        </motion.div>
                        <span>Added!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                        </motion.div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <p style={{ marginLeft: '5px' }}>Add to Waitlist</p>
                        </motion.div>
                      </>
                    )}
                  </motion.div>

                  {/* Shimmer Effect */}
                  {!isSubmitted && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        transform: 'skewX(-25deg)'
                      }}
                      animate={{ left: ['100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Features */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.8rem',
                fontSize: '0.95rem',
                marginTop: '1.5rem',
                color: '#6b7280'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {config.hero.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={feature.text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backdropFilter: 'blur(10px)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <IconComponent style={{
                      color: feature.color,
                      marginRight: '0.3rem',
                      width: '0.9rem',
                      height: '0.9rem'
                    }} />
                    <EditableText
                      value={feature.text}
                      onSave={() => { }}
                      configPath={`hero.features.${index}.text`}
                    >
                      <span>{feature.text}</span>
                    </EditableText>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Enhanced Image with Premium Controls */}
          <motion.div
            style={{ position: "relative" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            {/* Main Image with Flip Effect */}
            <motion.div
              style={{
                width: '100%',
                height: '26rem',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1.5rem',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
                backgroundColor: "white",
                padding: '1.2rem'
              }}
              className="lg:h-[400px]"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  initial={{ y: '100%', opacity: 0, scale: 0.95 }}
                  animate={{ y: '0%', opacity: 1, scale: 1 }}
                  exit={{ y: '-100%', opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 }
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transformPerspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <EditableImage
                    src={currentImage}
                    alt="Dockly Preview"
                    onSave={(src) => setCurrentImage(src)}
                    configPath="hero.currentImage"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '1.2rem'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Enhanced Image Navigation Controls */}
            <AnimatePresence>
              {isImageHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none'
                  }}
                >
                  {/* Premium Navigation Arrows */}
                  <motion.button
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    onClick={handlePrevWord}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'auto'
                    }}
                    whileHover={{
                      scale: 1.15,
                      background: 'rgba(255, 255, 255, 1)',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)',
                      borderColor: 'rgba(59, 130, 246, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    onClick={handleNextWord}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'auto'
                    }}
                    whileHover={{
                      scale: 1.15,
                      background: 'rgba(255, 255, 255, 1)',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)',
                      borderColor: 'rgba(59, 130, 246, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </motion.button>

                  {/* Enhanced Control Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    style={{
                      position: "absolute",
                      bottom: "1.5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.6rem 1rem",
                      borderRadius: "2rem",
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
                      pointerEvents: "auto",
                    }}
                  >
                    {/* Word Indicator Dots */}
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      {config.hero.cycleWords.map((word, index) => {
                        const active = index === currentWordIndex;
                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleWordChange(index)}
                            style={{
                              width: active ? "1.2rem" : "0.6rem",
                              height: "0.6rem",
                              borderRadius: "1rem",
                              border: "none",
                              cursor: "pointer",
                              background: active ? word.color || "#3b82f6" : "rgba(0,0,0,0.25)",
                              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                              position: "relative",
                              overflow: "hidden",
                            }}
                            whileHover={{ scale: 1.2, backgroundColor: word.color || "#3b82f6" }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.08 }}
                          >
                            {active && (
                              <motion.div
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background:
                                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",
                                }}
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        width: "1px",
                        height: "1.2rem",
                        background:
                          "linear-gradient(to bottom, transparent, rgba(0,0,0,0.2), transparent)",
                      }}
                    />

                    {/* Play / Pause */}
                    <motion.button
                      onClick={() => {
                        setIsAutoPlay(!isAutoPlay);
                        if (hasCompletedOneCycle) setHasCompletedOneCycle(false);
                      }}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        background: isAutoPlay
                          ? "linear-gradient(135deg,#3b82f6,#1d4ed8)"
                          : "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
                        boxShadow: isAutoPlay
                          ? "0 4px 14px rgba(59,130,246,0.4)"
                          : "0 4px 12px rgba(0,0,0,0.1)",
                        position: "relative",
                        transition: "all 0.3s ease",
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isAutoPlay ? "pause" : "play"}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isAutoPlay ? (
                            <Pause className="w-4 h-4 text-white" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-700" />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {isAutoPlay && (
                        <motion.div
                          style={{
                            position: "absolute",
                            inset: "-3px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                            opacity: 0.25,
                          }}
                          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.1, 0.25] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    {/* Skip Button */}
                    <AnimatePresence>
                      {isAutoPlay && !hasCompletedOneCycle && (
                        <motion.button
                          onClick={() => {
                            handleWordChange(config.hero.cycleWords.length - 1);
                            setIsAutoPlay(false);
                            setHasCompletedOneCycle(true);
                          }}
                          initial={{ opacity: 0, scale: 0, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0, x: -10 }}
                          style={{
                            width: "2.2rem",
                            height: "2.2rem",
                            borderRadius: "50%",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            background: "linear-gradient(135deg,#f97316,#ea580c)",
                            boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
                            transition: "all 0.3s ease",
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SkipForward className="w-4 h-4 text-white" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Floating Elements */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`floating-main-${currentWordIndex}`}
                style={{
                  position: "absolute",
                  top: "-0.8rem",
                  right: "-0.8rem",
                  width: "3.5rem",
                  height: "3.5rem",
                  background: getFloatingGradient(),
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  y: [0, -10, 0]
                }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                  rotate: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {getFloatingIcon()}
              </motion.div>
            </AnimatePresence>

            <motion.div
              style={{
                position: "absolute",
                bottom: "-0.8rem",
                left: "-0.8rem",
                width: "2.8rem",
                height: "2.8rem",
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <TrendingUp
                style={{
                  color: "white",
                  width: "1.1rem",
                  height: "1.1rem",
                }}
              />
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "-1.5rem",
                width: "1.8rem",
                height: "1.8rem",
                background: "linear-gradient(135deg, #fbbf24, #f97316)",
                borderRadius: "50%",
                opacity: 0.8,
              }}
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.div
              style={{
                position: "absolute",
                top: "25%",
                right: "-1.5rem",
                width: "1.3rem",
                height: "1.3rem",
                background: "linear-gradient(135deg, #f472b6, #ef4444)",
                borderRadius: "50%",
                opacity: 0.8,
              }}
              animate={{
                x: [0, -8, 0],
                y: [0, 8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </motion.div>
        </div>
      </div>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => dispatch(setIsOTPModalOpen(false))}
        setShowConfetti={setShowConfetti}
        setIsSubmitted={setIsSubmitted}
        email={otpData?.email || ''}
        onVerify={handleVerify}
        onResend={handleResend}
        setEmail={setEmail}
      />
    </section>
  );
});

export default HeroSection;