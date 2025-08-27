import React, { useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "./config";
import HeroSection, { WishlistFormRef } from "./hero-section";
import { Button } from "./ui/button";

interface FancyHeartButtonProps {
  text: string;
  onClick?: () => void;
}

const FancyHeartButton: React.FC<FancyHeartButtonProps> = ({ text, onClick }) => {
  const [indigoMode, setIndigoMode] = useState(false);

  const handleMouseEnter = () => {
    setIndigoMode(true);
  };

  const handleMouseLeave = () => {
    setIndigoMode(false);
  };

  const handleClick = () => {
    // Add click animation
    setIndigoMode(true);
    setTimeout(() => setIndigoMode(false), 300);

    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        onClick={handleClick}
        style={{
          background: indigoMode ? "#6366F1" : "white",
          color: indigoMode ? "white" : "#6366F1",
          padding: "0.6rem 1.2rem",
          borderRadius: "0.8rem",
          border: "2px solid #6366F1",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: indigoMode
            ? "0 8px 20px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.4)"
            : "0 3px 10px rgba(0, 0, 0, 0.08)",
          display: "flex",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "15px",
          overflow: "hidden",
          position: "relative"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ whiteSpace: "nowrap" }}>
          {text}
        </span>
        {indigoMode && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0] }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
              borderRadius: "0.8rem",
              pointerEvents: "none"
            }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export interface HeaderProps {
  wishlistFormRef: React.RefObject<WishlistFormRef>;
}

export default function Header({ wishlistFormRef }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleHeaderButtonClick = () => {
    // Enhanced focus and glow with scroll behavior
    if (wishlistFormRef.current) {
      wishlistFormRef.current.focusAndGlow();
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "-20px",
            padding: "0.5rem 0"
          }}
        >
          {/* Logo */}
          <motion.div
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              cursor: "pointer"
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection("hero-section")}
          >
            <div
              style={{
                width: 40,
                height: 40, // make it square for circle
                borderRadius: "50%", // ensures circle container if you want CSS circle
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0,
                backgroundColor: "#EEF2FF", // optional background
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80%"
                height="80%"
                viewBox="0 0 128 128"
                aria-hidden="true"
              >
                <circle cx="64" cy="64" r="64" fill="#E0E7FF" />

                <g fill="#6366F1">
                  <rect x="34" y="28" width="60" height="16" rx="8" />
                  <rect x="26" y="56" width="76" height="16" rx="8" />
                  <rect x="18" y="84" width="92" height="16" rx="8" />
                </g>
              </svg>
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
              {siteConfig.siteName}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            style={{ display: "none", alignItems: "center", gap: "1.5rem" }}
            className="md:flex"
          >
            {siteConfig.header.menus.map((menu) =>
              menu.subMenu ? (
                <div
                  key={menu.key}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setActiveDropdown(menu.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button
                    style={{
                      color: "#4b5563",
                      fontWeight: "600",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      transition: "color 0.3s",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "0.4rem"
                    }}
                    whileHover={{
                      color: "#3b82f6",
                      backgroundColor: "rgba(59, 130, 246, 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {menu.label}
                    <motion.div
                      animate={{
                        rotate: activeDropdown === menu.key ? 180 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={13} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {activeDropdown === menu.key && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          top: "2.2rem",
                          left: 0,
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.6rem",
                          boxShadow:
                            "0 8px 12px -3px rgba(0,0,0,0.1), 0 3px 5px -2px rgba(0,0,0,0.05)",
                          padding: "0.4rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.15rem",
                          minWidth: "140px"
                        }}
                      >
                        {menu.subMenu.map((sub) => (
                          <motion.button
                            key={sub.key}
                            onClick={() => scrollToSection(sub.sectionId)}
                            style={{
                              padding: "0.4rem 0.8rem",
                              textAlign: "left",
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              color: "#4b5563",
                              borderRadius: "0.4rem",
                              transition: "all 0.2s",
                              fontWeight: "500"
                            }}
                            whileHover={{
                              backgroundColor: "#f3f4f6",
                              color: "#3b82f6",
                              x: 2
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {sub.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  key={menu.key}
                  onClick={() => scrollToSection(menu.sectionId!)}
                  style={{
                    color: "#4b5563",
                    fontWeight: "600",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.3s",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.4rem"
                  }}
                  whileHover={{
                    color: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {menu.label}
                </motion.button>
              )
            )}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            style={{ display: "none", alignItems: "center", gap: "0.8rem" }}
            className="md:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FancyHeartButton text={siteConfig.header.buttons.waitlist} onClick={handleHeaderButtonClick} />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            style={{
              display: "block",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "0.4rem"
            }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X style={{ width: "1.4rem", height: "1.4rem" }} />
              ) : (
                <Menu style={{ width: "1.4rem", height: "1.4rem" }} />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                display: "block",
                borderTop: "1px solid #e5e7eb",
                paddingTop: "0.8rem",
                paddingBottom: "0.8rem"
              }}
              className="md:hidden"
            >
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem"
                }}
              >
                {siteConfig.header.menus.map((menu, index) =>
                  menu.subMenu ? (
                    <motion.div
                      key={menu.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        style={{
                          color: "#4b5563",
                          fontWeight: "500",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          padding: "0.4rem"
                        }}
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === menu.key ? null : menu.key
                          )
                        }
                      >
                        {menu.label}
                        <motion.div
                          animate={{
                            rotate: mobileDropdown === menu.key ? 180 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={13} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileDropdown === menu.key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.4rem",
                              paddingLeft: "0.8rem",
                              paddingTop: "0.4rem"
                            }}
                          >
                            {menu.subMenu.map((sub) => (
                              <button
                                key={sub.key}
                                onClick={() =>
                                  scrollToSection(sub.sectionId)
                                }
                                style={{
                                  color: "#6b7280",
                                  textAlign: "left",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: "0.2rem 0"
                                }}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={menu.key}
                      onClick={() => scrollToSection(menu.sectionId!)}
                      style={{
                        color: "#4b5563",
                        fontWeight: "500",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.4rem"
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {menu.label}
                    </motion.button>
                  )
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ marginTop: "0.8rem" }}
                >
                  <Button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(79, 70, 229) 100%)", // indigo gradient
                      color: "white",
                      padding: "10px 7px",
                      borderRadius: "1rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                      whiteSpace: "nowrap",
                      boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)", // indigo shadow
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onClick={handleHeaderButtonClick}
                  >
                    {siteConfig.header.buttons.waitlist}
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pass the ref to HeroSection */}
      {/* <HeroSection ref={wishlistFormRef} /> */}
    </motion.header>
  );
}