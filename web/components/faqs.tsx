"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import EditableText from "@/components/admin/editableText";
import { useAdmin } from "@/components/admin/context";
import EditableFaqArray from "./admin/faqedit";

export default function FaqSection() {
    const { config, saveConfigToServer } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

    // Get FAQ data from config, with fallback to default structure
    const faqConfig = config?.faqs
    const faqs = faqConfig?.items || [];

    const filteredFaqs = faqs.filter(
        (faq: any) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <section
            id="faqs"
            style={{
                position: "relative",
                minHeight: "80vh",
                background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
                padding: "4rem 0",
                overflow: "hidden",
            }}
        >
            {/* Dynamic Background Grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                    opacity: 0.3,
                    animation: "gridPulse 8s ease-in-out infinite",
                }}
            />

            {/* Gradient Orbs */}
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    animation: "float 20s ease-in-out infinite",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "15%",
                    width: "250px",
                    height: "250px",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    animation: "float 15s ease-in-out infinite reverse",
                }}
            />

            {/* Floating Elements */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "absolute",
                        width: "3px",
                        height: "3px",
                        background: `linear-gradient(45deg, ${["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"][i % 4]
                            }, transparent)`,
                        borderRadius: "50%",
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        boxShadow: `0 0 15px ${["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"][i % 4]}`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 15 - 7, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut",
                    }}
                />
            ))}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#06b6d4'][i % 4],
                        borderRadius: '50%',
                        opacity: 0.6,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '3px',
                        height: '3px',
                        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#06b6d4'][i % 4],
                        borderRadius: '50%',
                        opacity: 0.5,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 2.5 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 1.5,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <style jsx>{`
                @keyframes gridPulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }
                @keyframes float {
                    0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(120deg); }
                    66% { transform: translate(-20px, 20px) rotate(240deg); }
                }
            `}</style>

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                {/* Header Section */}
                <motion.div
                    style={{
                        textAlign: "center",
                        marginBottom: "2.5rem",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(59, 130, 246, 0.1)",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            borderRadius: "50px",
                            padding: "0.4rem 1.2rem",
                            marginBottom: "1.5rem",
                            backdropFilter: "blur(10px)",
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <HelpCircle size={14} style={{ color: "#3b82f6" }} />
                        <span style={{ color: "#93c5fd", fontSize: "0.8rem", fontWeight: "300" }}>
                            Support Center
                        </span>
                    </motion.div>

                    <motion.h2
                        style={{
                            fontSize: "2.8rem",
                            fontWeight: "600",
                            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            lineHeight: "1.1",
                            marginBottom: "1rem",
                            letterSpacing: "-0.02em",
                        }}
                        className="md:text-4xl lg:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <EditableText
                            value={faqConfig?.title}
                            onSave={() => saveConfigToServer()}
                            configPath="faqs.title"
                        >
                            {faqConfig?.title}
                        </EditableText>
                    </motion.h2>

                    <EditableText
                        value={faqConfig?.subtitle}
                        onSave={() => saveConfigToServer()}
                        configPath="faqs.subtitle"
                        multiline
                    >
                        <motion.p
                            style={{
                                fontSize: "1.1rem",
                                color: "#94a3b8",
                                maxWidth: "550px",
                                margin: "0 auto",
                                lineHeight: "1.6",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {faqConfig?.subtitle}
                        </motion.p>
                    </EditableText>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "2.5rem",
                        alignItems: "start",
                    }}
                    className="lg:grid-cols-5"
                >
                    {/* FAQ Content - Takes 3 columns */}
                    <motion.div
                        style={{ gridColumn: "1 / -1" }}
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Enhanced Search Bar */}
                        <motion.div
                            style={{
                                position: "relative",
                                marginBottom: "2rem",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    backdropFilter: "blur(20px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    padding: "3px",
                                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.2)",
                                }}
                            >
                                <Search
                                    style={{
                                        position: "absolute",
                                        left: "1.2rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#64748b",
                                        width: "1.1rem",
                                        height: "1.1rem",
                                        zIndex: 2,
                                    }}
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search your questions..."
                                    style={{
                                        width: "100%",
                                        padding: "1rem 1.2rem 1rem 3rem",
                                        background: "transparent",
                                        border: "none",
                                        borderRadius: "17px",
                                        fontSize: "1rem",
                                        color: "#ffffff",
                                        outline: "none",
                                        fontWeight: "400",
                                        letterSpacing: "0.01em",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        right: "1rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.4rem",
                                        color: "#64748b",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    <Sparkles size={12} />
                                    <span>AI-powered</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* FAQ Items */}
                        <EditableFaqArray
                            items={faqs}
                            onSave={() => saveConfigToServer()}
                            configPath="faqs.items"
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                                {filteredFaqs.map((faq: { question: string; answer: string }, index: number) => (
                                    <motion.div
                                        key={index}
                                        style={{
                                            background: expandedFaq === index
                                                ? "rgba(59, 130, 246, 0.1)"
                                                : "rgba(255, 255, 255, 0.03)",
                                            backdropFilter: "blur(20px)",
                                            borderRadius: "16px",
                                            border: expandedFaq === index
                                                ? "1px solid rgba(59, 130, 246, 0.3)"
                                                : "1px solid rgba(255, 255, 255, 0.08)",
                                            overflow: "hidden",
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                        whileHover={{
                                            scale: 1.01,
                                            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.12)",
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            style={{
                                                width: "100%",
                                                padding: "1.5rem 1.5rem",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                textAlign: "left",
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "1.1rem",
                                                fontWeight: "600",
                                                color: "#ffffff",
                                                transition: "all 0.3s ease",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            <EditableText
                                                value={faq.question}
                                                onSave={() => saveConfigToServer()}
                                                configPath={`faqs.items.${index}.question`}
                                            >
                                                <span style={{ paddingRight: "1rem" }}>{faq.question}</span>
                                            </EditableText>
                                            <motion.div
                                                animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                style={{
                                                    minWidth: "22px",
                                                    height: "22px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    background: expandedFaq === index
                                                        ? "rgba(59, 130, 246, 0.2)"
                                                        : "rgba(255, 255, 255, 0.1)",
                                                    borderRadius: "50%",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                <ChevronDown
                                                    size={14}
                                                    style={{
                                                        color: expandedFaq === index ? "#3b82f6" : "#94a3b8",
                                                    }}
                                                />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                    style={{ overflow: "hidden" }}
                                                >
                                                    <div
                                                        style={{
                                                            padding: "0 1.5rem 1.5rem 1.5rem",
                                                            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                                            marginTop: "0.8rem",
                                                            paddingTop: "1.2rem",
                                                        }}
                                                    >
                                                        <EditableText
                                                            value={faq.answer}
                                                            onSave={() => saveConfigToServer()}
                                                            configPath={`faqs.items.${index}.answer`}
                                                            multiline
                                                        >
                                                            <p
                                                                style={{
                                                                    color: "#cbd5e1",
                                                                    lineHeight: "1.7",
                                                                    fontSize: "1rem",
                                                                    margin: 0,
                                                                    letterSpacing: "0.01em",
                                                                }}
                                                            >
                                                                {faq.answer}
                                                            </p>
                                                        </EditableText>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </EditableFaqArray>

                        {filteredFaqs.length === 0 && (
                            <motion.div
                                style={{
                                    textAlign: "center",
                                    padding: "3rem 1.5rem",
                                    background: "rgba(255, 255, 255, 0.03)",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(20px)",
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        background: "rgba(59, 130, 246, 0.1)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 1rem",
                                    }}
                                >
                                    <Search size={24} style={{ color: "#3b82f6" }} />
                                </div>
                                <h3
                                    style={{
                                        color: "#ffffff",
                                        fontSize: "1.3rem",
                                        fontWeight: "600",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    No Results Found
                                </h3>
                                <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
                                    Try adjusting your search terms or browse our complete FAQ list.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Visual Element - Takes 2 columns */}
                    <motion.div
                        style={{ gridColumn: "1 / -1" }}
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div
                            style={{
                                position: "sticky",
                                top: "2rem",
                                background: "rgba(255, 255, 255, 0.03)",
                                backdropFilter: "blur(20px)",
                                borderRadius: "24px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                padding: "2rem",
                                textAlign: "center",
                                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 1.5rem",
                                    boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)",
                                }}
                            >
                                <HelpCircle size={28} style={{ color: "white" }} />
                            </div>
                            <h3
                                style={{
                                    color: "#ffffff",
                                    fontSize: "1.5rem",
                                    fontWeight: "500",
                                    marginBottom: "0.8rem",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                Still Have Questions?
                            </h3>
                            <p
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "1rem",
                                    lineHeight: "1.5",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Our support team is available 24/7 to help you with any questions or concerns.
                            </p>
                            <motion.button
                                style={{
                                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50px",
                                    padding: "0.8rem 1.8rem",
                                    fontSize: "1rem",
                                    fontWeight: "300",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    window.location.href = "mailto:contact.dockly@gmail.com";
                                }}
                            >
                                Contact Support
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}