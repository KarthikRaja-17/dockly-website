import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart, Home, TrendingUp, Activity, ArrowRight } from "lucide-react";
import { HeartFilled, HeartOutlined, DollarOutlined, HomeOutlined, TeamOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { siteConfig } from "./config";
import { useAdmin } from "./admin/context";
import EditableText from "./admin/editableText";
import PreviewModal from "./previewModal";

interface SelectedData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  textColor: string;
  features?: string[];
  badges?: string[];
}

export default function BoardsSection() {
  const { config, saveConfigToServer } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<SelectedData | null>(null);

  const iconMap = {
    Heart,
    Home,
    TrendingUp,
    Activity,
    HeartFilled,
    HeartOutlined,
    DollarOutlined,
    HomeOutlined,
    TeamOutlined
  };

  const getButtonText = (title: string) => ({
    Family: "Explore Family",
    Home: "Explore Home",
    Finance: "Explore Finances",
    Health: "Explore Health",
    Finances: "Explore Finances",
    "Digital Life": "Organize Digital Life",
  }[title] || "Get Started");

  // Function to get matching color from hero cycleWords
  const getBoardColor = (boardTitle: string) => {
    const cycleWords = config.hero?.cycleWords || [];
    const matchingWord = cycleWords.find(word =>
      word.word.toLowerCase() === boardTitle.toLowerCase() ||
      (boardTitle.toLowerCase() === 'finance' && word.word.toLowerCase() === 'finances')
    );
    return matchingWord?.color || '#3b82f6';
  };

  const handleButtonClick = (board: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const boardColor = getBoardColor(board.title);
    const imageUrl = board.image || `https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200`;

    setSelectedData({
      title: board.title,
      subtitle: getButtonText(board.title),
      description: board.description,
      image: imageUrl,
      gradient: `linear-gradient(135deg, ${boardColor}, ${boardColor}cc)`,
      textColor: boardColor,
      features: board.features || [],
      badges: []
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const cardBaseStyle = {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "1.2rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    padding: "1.4rem",
    backdropFilter: "blur(20px)",
    position: "relative" as const,
    overflow: "hidden",
    transition: "all 0.3s",
  };

  return (
    <>
      <section
        id="boards"
        style={{
          padding: "3rem 0",
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              backgroundColor: ["#3b82f6", "#8b5cf6", "#10b981", "#06b6d4"][i % 4],
              borderRadius: "50%",
              opacity: 0.3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem", position: "relative" }}>
          <motion.div
            style={{ textAlign: "center", marginBottom: "3rem" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: "bold",
              background: "linear-gradient(135deg, #111827, #374151)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
              letterSpacing: "-0.02em"
            }}>
              <EditableText
                value={config.boards.title}
                onSave={() => { saveConfigToServer() }}
                configPath="boards.title"
              >
                {config.boards.title}
              </EditableText>
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#6b7280",
              maxWidth: "42rem",
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 400
            }}>
              <EditableText
                value={config.boards.subtitle}
                onSave={() => { saveConfigToServer() }}
                configPath="boards.subtitle"
                multiline
              >
                {config.boards.subtitle}
              </EditableText>
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-2">
            {config.boards.items.map((board, index) => {
              const Icon = iconMap[board.icon as keyof typeof iconMap];
              const boardColor = getBoardColor(board.title);

              return (
                <motion.div
                  key={board.title}
                  style={{
                    ...cardBaseStyle,
                    border: `2px solid ${boardColor}20`,
                    background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
                    boxShadow: `0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px ${boardColor}10`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -12,
                    boxShadow: `0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px ${boardColor}20`,
                    scale: 1.02
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${boardColor}10, ${boardColor}05)`,
                      borderRadius: "1.2rem",
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 0.05 }}
                  />

                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      background: `linear-gradient(135deg, ${boardColor}, ${boardColor}cc)`,
                      borderRadius: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: `0 12px 30px ${boardColor}35, inset 0 1px 0 rgba(255,255,255,0.2)`,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {Icon && <Icon style={{ color: "white", width: "1.5rem", height: "1.5rem" }} />}
                  </div>

                  <h3 style={{ fontSize: "1.35rem", fontWeight: "bold", color: "#111827", marginBottom: "0.8rem" }}>
                    <EditableText
                      value={board.title}
                      onSave={() => { saveConfigToServer() }}
                      configPath={`boards.items.${index}.title`}
                    >
                      {board.title}
                    </EditableText>
                  </h3>

                  <p style={{ color: "#4b5563", marginBottom: "1.5rem", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    <EditableText
                      value={board.description}
                      onSave={() => { saveConfigToServer() }}
                      configPath={`boards.items.${index}.description`}
                      multiline
                    >
                      {board.description}
                    </EditableText>
                  </p>

                  <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "#6b7280" }}>
                    {board.features.map((feature, featureIdx) => (
                      <div key={feature} style={{ marginBottom: "0.4rem", display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: boardColor,
                            marginRight: "0.75rem",
                            marginTop: "2px",
                            flexShrink: 0
                          }}
                        />
                        <EditableText
                          value={feature}
                          onSave={() => { saveConfigToServer() }}
                          configPath={`boards.items.${index}.features.${featureIdx}`}
                        >
                          {feature}
                        </EditableText>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    onClick={(e) => handleButtonClick(board, e)}
                    style={{
                      background: `linear-gradient(135deg, ${boardColor}15, ${boardColor}08)`,
                      color: boardColor,
                      border: `1px solid ${boardColor}25`,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.75rem 1.25rem",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      borderRadius: "0.75rem",
                      transition: "all 0.2s ease",
                      width: "100%",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 10,
                    }}
                    className="hover:shadow-lg"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${boardColor}25, ${boardColor}15)`;
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = `0 8px 25px ${boardColor}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${boardColor}15, ${boardColor}08)`;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {getButtonText(board.title)}
                    <ArrowRight style={{ width: "1.1rem", height: "1.1rem" }} />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          data={selectedData}
        />
      </section>
    </>
  );
}