import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  BarChart3,
  Calendar,
  StickyNote,
  FolderOpen,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Cloud,
  Search,
  Bookmark,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "./config";
import { useAdmin } from "./admin/context";
import EditableText from "./admin/editableText";
import EditableImage from "./admin/editableImages";
import PreviewModal from "./previewModal";
import ImagePreview from "./imagePreview";
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
export default function HubsSection() {
  const { config, saveConfigToServer } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<SelectedData | null>(null);

  const iconMap = {
    BarChart3,
    Calendar,
    StickyNote,
    FolderOpen,
    BookOpen,
    CheckCircle,
    Cloud,
    Search,
    Bookmark,
    Lock
  };

  const getButtonText = (title: string) => {
    switch (title) {
      case 'Dashboard': return 'Explore Dashboard';
      case 'Planner': return 'Explore Planner';
      case 'Notes': return 'Explore Notes';
      case 'Files': return 'Explore Files';
      case 'Accounts': return 'Explore Accounts';
      default: return 'Get Started';
    }
  };

  const handleExploreClick = (hub: any) => {
    setSelectedData({
      ...hub,
      image: hub.image || `/hub-screenshot-${config.hubs.items.findIndex(h => h.title === hub.title) + 1}.png`
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .hubs-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .dashboard-content {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .dashboard-card {
            padding: 1.5rem !important;
          }
          .hub-card {
            padding: 1.5rem !important;
          }
          .dashboard-image {
            height: 200px !important;
            order: -1;
          }
          .floating-particles {
            display: none !important;
          }
          .hub-icon {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
          .hub-icon svg {
            width: 1.1rem !important;
            height: 1.1rem !important;
          }
          .dashboard-icon {
            width: 3rem !important;
            height: 3rem !important;
          }
          .dashboard-icon svg {
            width: 1.5rem !important;
            height: 1.5rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .section-container {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          .section-title {
            font-size: 1.8rem !important;
          }
          .section-subtitle {
            font-size: 1rem !important;
          }
          .dashboard-title {
            font-size: 1.4rem !important;
          }
          .hub-title {
            font-size: 1.1rem !important;
          }
        }
      `}</style>

      <section id="hubs" style={{
        paddingTop: '3rem',
        paddingBottom: '3rem',
        background: 'linear-gradient(135deg, #f9fafb, #eff6ff)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Professional background effects */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
          `,
        }} />

        {/* Floating particles */}
        <div className="floating-particles">
          {[...Array(22)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#06b6d4'][i % 4],
                borderRadius: '50%',
                opacity: 0.3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="section-container" style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative'
        }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.8rem'
            }}>
              <EditableText
                value={config.hubs.title}
                onSave={() => { saveConfigToServer() }}
                configPath="hubs.title"
              >
                {config.hubs.title}
              </EditableText>
            </h2>
            <p className="section-subtitle" style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              maxWidth: '38rem',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              <EditableText
                value={config.hubs.subtitle}
                onSave={() => { saveConfigToServer() }}
                configPath="hubs.subtitle"
                multiline
              >
                {config.hubs.subtitle}
              </EditableText>
            </p>
          </motion.div>

          <div className="hubs-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            gridTemplateRows: 'auto auto auto'
          }}>
            {/* Dashboard - spans 2 columns */}
            <motion.div
              className="dashboard-card"
              style={{
                gridColumn: '1 / -1',
                backgroundColor: 'white',
                borderRadius: '1.2rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                padding: '2.5rem',
                transition: 'all 0.3s',
                background: config.hubs.items[0]?.bgGradient || 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(20px)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="dashboard-content" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2.5rem',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div className="dashboard-icon" style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      background: config.hubs.items[0]?.gradient,
                      borderRadius: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.2rem',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}>
                      <BarChart3 style={{ color: 'white', width: '1.8rem', height: '1.8rem' }} />
                    </div>
                    <div>
                      <h3 className="dashboard-title" style={{
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        color: '#111827'
                      }}>
                        <EditableText
                          value={config.hubs.items[0]?.title}
                          onSave={() => { saveConfigToServer() }}
                          configPath="hubs.items.0.title"
                        >
                          {config.hubs.items[0]?.title}
                        </EditableText>
                      </h3>
                      <p style={{
                        color: config.hubs.items[0]?.textColor,
                        fontWeight: '500',
                        fontSize: '1rem'
                      }}>
                        <EditableText
                          value={config.hubs.items[0]?.subtitle}
                          onSave={() => { saveConfigToServer() }}
                          configPath="hubs.items.0.subtitle"
                        >
                          {config.hubs.items[0]?.subtitle}
                        </EditableText>
                      </p>
                    </div>
                  </div>

                  <p style={{
                    color: '#4b5563',
                    marginBottom: '1.2rem',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    <EditableText
                      value={config.hubs.items[0]?.description}
                      onSave={() => { saveConfigToServer() }}
                      configPath="hubs.items.0.description"
                      multiline
                    >
                      {config.hubs.items[0]?.description}
                    </EditableText>
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                    marginBottom: '1.5rem'
                  }}>
                    {(config.hubs.items[0]?.features as string[]).map((feature, idx) => (
                      <Badge key={feature} style={{
                        backgroundColor: '#dbeafe',
                        color: '#1d4ed8',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '0.6rem',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        <EditableText
                          value={feature}
                          onSave={() => { saveConfigToServer() }}
                          configPath={`hubs.items.0.features.${idx}`}
                        >
                          {feature}
                        </EditableText>
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => handleExploreClick(config.hubs.items[0])}
                    style={{
                      color: config.hubs.items[0].textColor,
                      fontWeight: '600',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.8rem 1.2rem',
                      fontSize: '1rem'
                    }}
                  >
                    {getButtonText(config.hubs.items[0].title)}
                    <ArrowRight style={{ marginLeft: '0.4rem', width: '1.3rem', height: '1.3rem' }} />
                  </Button>
                </div>

                <div
                  className="dashboard-image"
                  style={{
                    height: '260px',
                    background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)',
                    borderRadius: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <EditableImage
                    src={config.hubs.items[0].image || '/dashboard1.png'}
                    alt="Dashboard"
                    onSave={() => { saveConfigToServer() }}
                    configPath="hubs.items.0.image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '0.8rem',
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Other 4 hubs in 2x2 grid */}
            {config.hubs.items.slice(1).map((hub, index) => {
              const IconComponent = iconMap[hub.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={hub.title}
                  className="hub-card"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '1.2rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    padding: '2rem',
                    transition: 'all 0.3s',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div className="hub-icon" style={{
                      width: '3rem',
                      height: '3rem',
                      background: hub?.gradient,
                      borderRadius: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '0.8rem',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
                    }}>
                      <IconComponent style={{ color: 'white', width: '1.3rem', height: '1.3rem' }} />
                    </div>
                    <div>
                      <h3 className="hub-title" style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#111827'
                      }}>
                        <EditableText
                          value={hub.title}
                          onSave={() => { saveConfigToServer() }}
                          configPath={`hubs.items.${index + 1}.title`}
                        >
                          {hub.title}
                        </EditableText>
                      </h3>
                      <p style={{
                        color: hub.textColor,
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>
                        <EditableText
                          value={hub.subtitle}
                          onSave={() => { saveConfigToServer() }}
                          configPath={`hubs.items.${index + 1}.subtitle`}
                        >
                          {hub.subtitle}
                        </EditableText>
                      </p>
                    </div>
                  </div>

                  <p style={{
                    color: '#4b5563',
                    marginBottom: '1.2rem',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    <EditableText
                      value={hub.description}
                      onSave={() => { saveConfigToServer() }}
                      configPath={`hubs.items.${index + 1}.description`}
                      multiline
                    >
                      {hub.description}
                    </EditableText>
                  </p>

                  {hub.features && typeof hub.features[0] === 'object' && (
                    <div style={{ marginBottom: '1.2rem' }}>
                      {(hub.features as Array<{ icon: string, text: string }>).map((feature, featureIdx) => {
                        const FeatureIcon = iconMap[feature.icon as keyof typeof iconMap];
                        return (
                          <div key={feature.text} style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.85rem',
                            color: '#6b7280',
                            marginBottom: '0.6rem'
                          }}>
                            <FeatureIcon style={{
                              color: '#10b981',
                              marginRight: '0.6rem',
                              width: '0.9rem',
                              height: '0.9rem'
                            }} />
                            <EditableText
                              value={feature.text}
                              onSave={() => { saveConfigToServer() }}
                              configPath={`hubs.items.${index + 1}.features.${featureIdx}.text`}
                            >
                              {feature.text}
                            </EditableText>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {hub.badges && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1.2rem'
                      }}
                    >
                      {hub.badges.map((badge, badgeIdx) => {
                        const BadgeIcon = Bookmark;

                        return (
                          <div
                            key={badge}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.6rem',
                              padding: '0.3rem 0.6rem',
                              fontSize: '0.8rem',
                              color: '#374151',
                              backgroundColor: '#f9fafb'
                            }}
                          >
                            <BadgeIcon
                              style={{
                                marginRight: '0.3rem',
                                width: '0.9rem',
                                height: '0.9rem',
                                color: '#10b981'
                              }}
                            />
                            <EditableText
                              value={badge}
                              onSave={() => {
                                saveConfigToServer();
                              }}
                              configPath={`hubs.items.${index + 1}.badges.${badgeIdx}`}
                            >
                              {badge}
                            </EditableText>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => handleExploreClick(hub)}
                    style={{
                      color: hub.textColor,
                      fontWeight: '600',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.6rem',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = hub.textColor + '10';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {getButtonText(hub.title)}
                    <ArrowRight style={{ marginLeft: '0.4rem', width: '1rem', height: '1rem' }} />
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

        {/* <ImagePreview
          isOpen={isModalOpen}
          onClose={handleModalClose}
          imageUrl={selectedData?.image ?? ''}
          title={selectedData?.title ?? ''}
        /> */}
      </section>
    </>
  );
}