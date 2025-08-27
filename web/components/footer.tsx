"use client";

import { motion } from "framer-motion";
import { Twitter, Facebook } from "lucide-react";
import { useAdmin } from "./admin/context";

interface FooterProps {
  config?: {
    siteName?: string;
    footer?: {
      description?: string;
      copyright?: string;
      socialLinks?: {
        twitter?: string;
        facebook?: string;
        pinterest?: string;
      };
      links?: {
        Product?: string[];
      };
    };
  };
}

export default function Footer() {
  const { config } = useAdmin();
  const footerConfig = { ...config };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const getSectionId = (item: string) => {
    const sectionMap: { [key: string]: string } = {
      'Features': 'features', // Maps to hubs section
      'Pricing': 'pricing',
      'Security': 'security',
      'Integrations': 'boards' // Maps to boards section
    };
    return sectionMap[item] || item.toLowerCase();
  };

  return (
    <footer style={{
      backgroundColor: '#1a1b23',
      color: 'white',
      paddingTop: '3rem',
      paddingBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'flex-start',
          marginBottom: '2.5rem'
        }} className="md:grid-cols-2">

          {/* Left Section - Brand & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: 40,
                height: 40, // make it square for circle
                borderRadius: "50%", // ensures circle container if you want CSS circle
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0,
                // backgroundColor: "#EEF2FF" // optional background
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
                {footerConfig.siteName}
              </span>
            </div>

            <p style={{
              color: '#9ca3af',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              maxWidth: '320px'
            }}>
              {footerConfig.footer.description}
            </p>

            {/* Social Icons */}
            {/* <div style={{ display: 'flex', gap: '0.75rem' }}>
              <motion.a
                href={footerConfig.footer.socialLinks.twitter}
                style={{
                  color: '#6b7280',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={{
                  backgroundColor: '#374151',
                  color: '#ffffff',
                  scale: 1.1
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={18} />
              </motion.a>

              <motion.a
                href={footerConfig.footer.socialLinks.facebook}
                style={{
                  color: '#6b7280',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={{
                  backgroundColor: '#374151',
                  color: '#ffffff',
                  scale: 1.1
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={18} />
              </motion.a>

              <motion.a
                href={footerConfig.footer.socialLinks.pinterest}
                style={{
                  color: '#6b7280',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={{
                  backgroundColor: '#374151',
                  color: '#ffffff',
                  scale: 1.1
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.11.22.081.343-.09.353-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </motion.a>
            </div> */}
          </motion.div>

          {/* Right Section - Product Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 style={{
              fontWeight: '600',
              marginBottom: '1.25rem',
              fontSize: '1rem',
              color: '#ffffff'
            }}>
              Product
            </h4>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {footerConfig.footer.links.Product.map((item, index) => (
                <motion.li key={item}>
                  <motion.button
                    onClick={() => scrollToSection(getSectionId(item))}
                    style={{
                      color: '#9ca3af',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      display: 'block',
                      paddingRight: '1rem',
                      textAlign: 'left',
                      padding: '0'
                    }}
                    whileHover={{
                      color: '#ffffff',
                      x: 4
                    }}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          style={{
            borderTop: '1px solid #2d3748',
            paddingTop: '1.5rem',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
          }}>
            {footerConfig.footer.copyright}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}