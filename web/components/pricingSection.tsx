import React, { useState } from "react";
import { Button } from "./ui/button";
import { Activity, Calendar, DollarSign, Heart, Home, Link, TrendingUp, Users, Check, Edit3, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "./config";
import { useAdmin } from "./admin/context";
import EditableText from "./admin/editableText";
import { HeaderProps } from "./header";

const iconMap = {
    Link: Link,
    Users: Users,
    Home: Home,
    Heart: Heart,
    DollarSign: DollarSign,
    Calendar: Calendar,
    Activity: Activity,
    TrendingUp: TrendingUp,
} as const;

// Card colors that match the background gradients
const cardColors = [
    '#6366F1',     // Primary card color (matches first card gradient)
    '#8B5CF6',     // Purple
    '#EC4899',     // Pink  
    '#3B82F6',     // Blue
    '#EF4444',     // Red
    '#10B981'      // Green
];

export default function PricingSection({ wishlistFormRef }: HeaderProps) {
    const { config, saveConfigToServer, isAdmin } = useAdmin();
    const [selectedPlan, setSelectedPlan] = useState("Yearly");
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const [isFeaturesHovered, setIsFeaturesHovered] = useState(false);
    const handleHeaderButtonClick = () => {
        // Enhanced focus and glow with scroll behavior
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        if (wishlistFormRef.current) {
            wishlistFormRef.current.focusAndGlow();
        }
    };

    return (
        <section id="pricing" style={{
            paddingTop: '40px',
            paddingBottom: '4rem',
            // background: 'linear-gradient(135deg, #fafaff 0%, #f0f4ff 25%, #e8f2ff 50%, #f5f8ff 75%, #ffffff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Enhanced brighter background decorations */}
            {/* <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 60% 20%, rgba(99, 102, 241, 0.18) 0%, transparent 50%),
                    radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 50%)
                `,
            }} /> */}

            {/* More animated floating elements with brighter colors */}
            {[...Array(window.innerWidth < 768 ? 15 : 25)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: `${4 + Math.random() * 10}px`,
                        height: `${4 + Math.random() * 10}px`,
                        backgroundColor: ['#6366F1', '#8B5CF6', '#10B981', '#EC4899', '#06B6D4'][i % 5],
                        borderRadius: '50%',
                        opacity: 0.4 + Math.random() * 0.5,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: 'blur(0.5px)'
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.3, 0.8],
                        rotate: [0, 360, 0]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Custom CSS to hide all scrollbars */}
            <style jsx>{`
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .features-container {
                    overflow: hidden;
                }
                .features-container:hover {
                    overflow-y: auto;
                }
                .features-container::-webkit-scrollbar {
                    display: none;
                }
                .features-container {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Header Section */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginBottom: "40px",
                    maxWidth: "80rem",
                    padding: "0 1rem", // Add horizontal padding for mobile
                }}
            >
                <motion.h2
                    style={{
                        fontSize: window.innerWidth < 640 ? "1.75rem" : "2rem", // Responsive font size
                        fontWeight: "bold",
                        color: "#111827",
                        marginBottom: "0.8rem",
                        textAlign: "center", // Center on mobile
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <EditableText
                        value={config.pricing.title}
                        onSave={() => {
                            saveConfigToServer();
                        }}
                        configPath="pricing.title"
                    >
                        {config.pricing.title}
                    </EditableText>
                </motion.h2>

                <motion.p
                    style={{
                        fontSize: window.innerWidth < 640 ? "0.9rem" : "1rem", // Responsive font size
                        color: "#4b5563",
                        marginBottom: "0.4rem",
                        lineHeight: "1.6",
                        textAlign: "center", // Center on mobile
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <EditableText
                        value={config.pricing.subtitle}
                        onSave={() => {
                            saveConfigToServer();
                        }}
                        configPath="pricing.subtitle"
                        multiline
                    >
                        {config.pricing.subtitle}
                    </EditableText>
                </motion.p>
                <motion.p
                    style={{
                        fontSize: window.innerWidth < 640 ? "0.85rem" : "0.95rem", // Responsive font size
                        color: '#6b7280',
                        textAlign: "center", // Center on mobile
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <EditableText
                        value={config.pricing.subtext}
                        onSave={() => { saveConfigToServer() }}
                        configPath="pricing.subtext"
                        multiline
                    >
                        {config.pricing.subtext}
                    </EditableText>
                </motion.p>
            </div>

            {/* Main Content - Responsive Layout */}
            <div style={{
                maxWidth: '78rem',
                margin: '0 auto',
                padding: '0 1rem',
                position: 'relative'
            }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '70% 30%',
                        gap: window.innerWidth < 1024 ? '3rem' : '2rem'
                    }}
                >
                    {/* Left side - Enhanced Features Section */}
                    <motion.div
                        initial={{ opacity: 0, x: window.innerWidth < 1024 ? 0 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            position: 'relative',
                            order: window.innerWidth < 1024 ? 2 : 1,
                        }}
                        onMouseEnter={() => setIsFeaturesHovered(true)}
                        onMouseLeave={() => setIsFeaturesHovered(false)}
                    >
                        {/* Enhanced background for features container */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: '-10px',
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.06) 50%, rgba(99, 102, 241, 0.08) 100%)',
                                borderRadius: '2rem',
                                filter: 'blur(20px)',
                                zIndex: -1
                            }}
                            animate={isFeaturesHovered ? {
                                scale: [1, 1.02, 1],
                                opacity: [0.6, 0.9, 0.6]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        <div className="features-container no-scrollbar" style={{
                            width: '100%',
                            height: '100%',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(99, 102, 241, 0.1)',
                            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.15)',
                            position: 'relative',
                        }}>
                            {/* Animated background patterns */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `
                                    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                                    radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
                                `,
                                zIndex: -1
                            }} />

                            {/* First feature full width - Enhanced */}
                            <div className="grid grid-cols-1 gap-4">
                                {config.pricing.features.slice(0, 1).map((item, index) => {
                                    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                                    const iconColor = cardColors[0]; // Use first card color

                                    return (
                                        <motion.div
                                            key={index}
                                            className="group cursor-pointer col-span-1"
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.6,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{
                                                y: -5,
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <motion.div
                                                className="rounded-xl border-none shadow-lg flex items-center transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                                                style={{
                                                    background: item.color || 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                                    border: "2px solid rgba(255, 255, 255, 0.2)",
                                                    padding: window.innerWidth < 640 ? "1.2rem" : "1.8rem",
                                                    minHeight: window.innerWidth < 640 ? "120px" : "140px",
                                                    flexDirection: window.innerWidth < 480 ? "column" : "row",
                                                    textAlign: window.innerWidth < 480 ? "center" : "left",
                                                }}
                                                whileHover={{
                                                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)',
                                                }}
                                            >
                                                {/* Animated background shine effect */}
                                                <motion.div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                                                        transform: 'translateX(-100%)'
                                                    }}
                                                    animate={{
                                                        transform: ['translateX(-100%)', 'translateX(100%)']
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: 3,
                                                        ease: "easeInOut"
                                                    }}
                                                />

                                                <motion.div
                                                    className={window.innerWidth < 480 ? "mb-3 flex-shrink-0" : "mr-4 flex-shrink-0"}
                                                    transition={{ duration: 0.6 }}
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                >
                                                    {IconComponent && (
                                                        <motion.div
                                                            style={{
                                                                background: "rgba(255, 255, 255, 0.95)",
                                                                borderRadius: "1rem",
                                                                padding: window.innerWidth < 640 ? "0.6rem" : "0.8rem",
                                                                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                                                            }}
                                                            animate={{
                                                                boxShadow: ['0 8px 25px rgba(99, 102, 241, 0.3)', '0 12px 35px rgba(99, 102, 241, 0.5)', '0 8px 25px rgba(99, 102, 241, 0.3)']
                                                            }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        >
                                                            <IconComponent size={window.innerWidth < 640 ? 24 : 28} style={{ color: iconColor }} />
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                                <div className="flex-1" style={{ position: 'relative', zIndex: 1 }}>
                                                    <h4
                                                        className="font-bold text-white mb-2 leading-tight"
                                                        style={{
                                                            fontSize: window.innerWidth < 640 ? "1.1rem" : "1.25rem",
                                                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <EditableText
                                                            value={item.title}
                                                            onSave={() => saveConfigToServer()}
                                                            configPath={`pricing.features.${index}.title`}
                                                        >
                                                            {item.title}
                                                        </EditableText>
                                                    </h4>
                                                    <p
                                                        className="text-white/90 leading-relaxed"
                                                        style={{
                                                            fontSize: window.innerWidth < 640 ? "0.85rem" : "0.95rem",
                                                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <EditableText
                                                            value={item.desc}
                                                            onSave={() => saveConfigToServer()}
                                                            configPath={`pricing.features.${index}.desc`}
                                                            multiline
                                                        >
                                                            {item.desc}
                                                        </EditableText>
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Remaining features - Enhanced responsive grid */}
                            <div
                                className="gap-4 mt-4"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: window.innerWidth < 640 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)'
                                }}
                            >
                                {config.pricing.features.slice(1).map((item, index) => {
                                    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                                    const iconColor = cardColors[(index + 1) % cardColors.length]; // Use corresponding card color

                                    return (
                                        <motion.div
                                            key={index + 1}
                                            className="group cursor-pointer"
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                delay: (index + 1) * 0.1,
                                                duration: 0.6,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{
                                                y: -3,
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <motion.div
                                                className="rounded-xl border-none shadow-lg flex items-center transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                                                style={{
                                                    background: item.color || `linear-gradient(135deg, ${cardColors[(index + 1) % cardColors.length]} 0%, ${cardColors[(index + 1) % cardColors.length]} 100%)`,
                                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                                    padding: window.innerWidth < 640 ? "1rem" : "1.25rem",
                                                    minHeight: window.innerWidth < 640 ? "100px" : "110px",
                                                    flexDirection: window.innerWidth < 480 ? "column" : "row",
                                                    textAlign: window.innerWidth < 480 ? "center" : "left",
                                                }}
                                                whileHover={{
                                                    boxShadow: '0 15px 45px rgba(99, 102, 241, 0.3)',
                                                }}
                                            >
                                                {/* Animated pulse effect */}
                                                <motion.div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                                                        opacity: 0
                                                    }}
                                                    animate={{
                                                        opacity: [0, 0.5, 0],
                                                        scale: [0.8, 1.2, 0.8]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: index * 0.5
                                                    }}
                                                />

                                                <motion.div
                                                    className={window.innerWidth < 480 ? "mb-2 flex-shrink-0" : "mr-3 flex-shrink-0"}
                                                    transition={{ duration: 0.6 }}
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                >
                                                    {IconComponent && (
                                                        <motion.div
                                                            style={{
                                                                background: "rgba(255, 255, 255, 0.95)",
                                                                borderRadius: "0.8rem",
                                                                padding: window.innerWidth < 640 ? "0.5rem" : "0.6rem",
                                                                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                                                            }}
                                                            animate={{
                                                                y: [0, -2, 0]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                delay: index * 0.3
                                                            }}
                                                        >
                                                            <IconComponent size={window.innerWidth < 640 ? 20 : 24} style={{ color: iconColor }} />
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                                <div className="flex-1" style={{ position: 'relative', zIndex: 1 }}>
                                                    <h4
                                                        className="font-bold text-white mb-1 leading-tight"
                                                        style={{
                                                            fontSize: window.innerWidth < 640 ? "0.95rem" : "1.05rem",
                                                            textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                        }}
                                                    >
                                                        <EditableText
                                                            value={item.title}
                                                            onSave={() => saveConfigToServer()}
                                                            configPath={`pricing.features.${index + 1}.title`}
                                                        >
                                                            {item.title}
                                                        </EditableText>
                                                    </h4>
                                                    <p
                                                        className="text-white/90 leading-relaxed"
                                                        style={{
                                                            fontSize: window.innerWidth < 640 ? "0.8rem" : "0.85rem",
                                                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <EditableText
                                                            value={item.desc}
                                                            onSave={() => saveConfigToServer()}
                                                            configPath={`pricing.features.${index + 1}.desc`}
                                                            multiline
                                                        >
                                                            {item.desc}
                                                        </EditableText>
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side - Pricing Section (30% on desktop, full width on mobile) */}
                    <motion.div
                        initial={{ opacity: 0, x: window.innerWidth < 1024 ? 0 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{
                            position: 'relative',
                            order: window.innerWidth < 1024 ? 1 : 2, // Pricing goes first on mobile
                        }}
                    >
                        {/* Enhanced Toggle */}
                        <motion.div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '2rem'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '1rem',
                                padding: '0.3rem',
                                display: 'flex',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                                width: window.innerWidth < 640 ? '100%' : 'auto', // Full width on mobile
                                maxWidth: window.innerWidth < 640 ? '400px' : 'none', // Limit max width on mobile
                            }}>
                                {config.pricing.plans.map((plan) => (
                                    <motion.button
                                        key={plan.name}
                                        onClick={() => setSelectedPlan(plan.name)}
                                        style={{
                                            padding: window.innerWidth < 640 ? '0.7rem 1rem' : '0.8rem 1.5rem', // Responsive padding
                                            borderRadius: '0.8rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: '700',
                                            fontSize: window.innerWidth < 640 ? '0.8rem' : '0.9rem', // Responsive font size
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            background: selectedPlan === plan.name
                                                ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                                : 'transparent',
                                            color: selectedPlan === plan.name ? 'white' : '#6b7280',
                                            boxShadow: selectedPlan === plan.name
                                                ? '0 8px 25px rgba(59, 130, 246, 0.5)'
                                                : 'none',
                                            position: 'relative',
                                            flex: 1, // Equal width on mobile
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: selectedPlan === plan.name
                                                ? '0 12px 30px rgba(59, 130, 246, 0.6)'
                                                : '0 4px 15px rgba(0, 0, 0, 0.1)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <EditableText
                                            value={plan.name}
                                            onSave={() => { saveConfigToServer(); }}
                                            configPath={`pricing.plans.${config.pricing.plans.findIndex(p => p.name === plan.name)}.name`}
                                        >
                                            {plan.name}
                                        </EditableText>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Selected Plan Details */}
                        <AnimatePresence mode="wait">
                            {config.pricing.plans
                                .filter(plan => plan.name === selectedPlan)
                                .map((plan) => (
                                    <motion.div
                                        key={plan.name}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        style={{
                                            textAlign: 'center',
                                            padding: window.innerWidth < 640 ? '2rem' : '2.5rem', // Responsive padding
                                            background: plan.popular
                                                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
                                                : 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '1.5rem',
                                            boxShadow: plan.popular
                                                ? '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 2px #3b82f6'
                                                : '0 10px 30px rgba(0, 0, 0, 0.12)',
                                            border: plan.popular ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.3)',
                                            position: 'relative',
                                            height: window.innerWidth < 640 ? 'auto' : '380px', // Auto height on mobile
                                            minHeight: window.innerWidth < 640 ? '320px' : '380px', // Min height on mobile
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={() => setIsHovered(plan.name)}
                                        onMouseLeave={() => setIsHovered(null)}
                                    >

                                        {/* Enhanced background effects */}
                                        {plan.popular && (
                                            <motion.div
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05))',
                                                    borderRadius: '1.5rem'
                                                }}
                                                animate={{
                                                    opacity: [0.5, 0.8, 0.5]
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        )}

                                        <motion.div
                                            style={{
                                                fontSize: window.innerWidth < 640 ? '2.8rem' : '3.5rem', // Responsive font size
                                                fontWeight: 'bold',
                                                background: 'linear-gradient(135deg, #111827, #374151)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                marginBottom: '0.5rem',
                                                position: 'relative',
                                                zIndex: 1
                                            }}
                                            animate={isHovered === plan.name ? {
                                                scale: [1, 1.1, 1]
                                            } : {}}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <EditableText
                                                value={plan.price}
                                                onSave={() => { saveConfigToServer(); }}
                                                configPath={`pricing.plans.${config.pricing.plans.findIndex(p => p.name === plan.name)}.price`}
                                            >
                                                {plan.price}
                                            </EditableText>
                                        </motion.div>

                                        <div style={{
                                            color: '#6b7280',
                                            marginBottom: '2rem',
                                            fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem', // Responsive font size
                                            position: 'relative',
                                            zIndex: 1
                                        }}>
                                            <EditableText
                                                value={`(${plan.period})`}
                                                onSave={() => { saveConfigToServer(); }}
                                                configPath={`pricing.plans.${config.pricing.plans.findIndex(p => p.name === plan.name)}.period`}
                                            >
                                                ({plan.period})
                                            </EditableText>
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{ position: 'relative', zIndex: 1 }}
                                        >
                                            <Button
                                                onClick={() => handleHeaderButtonClick()}
                                                style={{
                                                    width: '100%',
                                                    padding: window.innerWidth < 640 ? '0.875rem' : '1rem', // Responsive padding
                                                    fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem', // Responsive font size
                                                    fontWeight: '700',
                                                    borderRadius: '1rem',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    background: plan.popular
                                                        ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                                                        : 'linear-gradient(135deg, #f97316, #ea580c)',
                                                    color: 'white',
                                                    marginBottom: '1.5rem',
                                                    boxShadow: plan.popular
                                                        ? '0 10px 30px rgba(16, 185, 129, 0.4)'
                                                        : '0 10px 30px rgba(249, 115, 22, 0.4)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                                    e.currentTarget.style.boxShadow = plan.popular
                                                        ? '0 15px 35px rgba(16, 185, 129, 0.6)'
                                                        : '0 15px 35px rgba(249, 115, 22, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = plan.popular
                                                        ? '0 10px 30px rgba(16, 185, 129, 0.4)'
                                                        : '0 10px 30px rgba(249, 115, 22, 0.4)';
                                                }}
                                            >
                                                <EditableText
                                                    value={plan.buttonText}
                                                    onSave={() => { saveConfigToServer(); }}
                                                    configPath={`pricing.plans.${config.pricing.plans.findIndex(p => p.name === plan.name)}.buttonText`}
                                                >
                                                    {plan.buttonText}
                                                </EditableText>
                                            </Button>
                                        </motion.div>

                                        <div style={{
                                            fontSize: window.innerWidth < 640 ? '0.8rem' : '0.9rem', // Responsive font size
                                            color: '#6b7280',
                                            marginBottom: '0.5rem',
                                            position: 'relative',
                                            zIndex: 1
                                        }}>
                                            <EditableText
                                                value={plan.billingNote}
                                                onSave={() => { saveConfigToServer(); }}
                                                configPath={`pricing.plans.${config.pricing.plans.findIndex(p => p.name === plan.name)}.billingNote`}
                                            >
                                                {plan.billingNote}
                                            </EditableText>
                                        </div>

                                        <div style={{
                                            fontSize: window.innerWidth < 640 ? '0.75rem' : '0.8rem', // Responsive font size
                                            color: '#9ca3af',
                                            position: 'relative',
                                            zIndex: 1
                                        }}>
                                            <EditableText
                                                value={config.pricing.taxNote}
                                                onSave={() => { saveConfigToServer(); }}
                                                configPath="pricing.taxNote"
                                            >
                                                {config.pricing.taxNote}
                                            </EditableText>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Enhanced Bottom guarantee */}
                <motion.div
                    style={{
                        textAlign: 'center',
                        marginTop: '3rem'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: window.innerWidth < 640 ? '0.8rem 1.5rem' : '1rem 2rem', // Responsive padding
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))',
                            border: '2px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '2rem',
                            color: '#047857',
                            fontSize: window.innerWidth < 640 ? '0.9rem' : '1rem', // Responsive font size
                            fontWeight: '700',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)',
                            maxWidth: window.innerWidth < 640 ? '90%' : 'none', // Limit width on mobile
                        }}
                        whileHover={{
                            scale: 1.05,
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15))',
                            boxShadow: '0 12px 35px rgba(16, 185, 129, 0.3)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Check size={window.innerWidth < 640 ? 18 : 20} />
                        </motion.div>
                        <EditableText
                            value={config.pricing.guaranteeText}
                            onSave={() => { saveConfigToServer(); }}
                            configPath="pricing.guaranteeText"
                        >
                            {config.pricing.guaranteeText}
                        </EditableText>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}