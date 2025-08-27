import { Link, Brain, Users } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "./config";
import { useAdmin } from "./admin/context";
import EditableText from "./admin/editableText";

export default function FeaturesSection() {
  const { config, saveConfigToServer } = useAdmin();
  const iconMap = {
    Link,
    Brain,
    Users
  };

  return (
    <section id="features" style={{
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem',
      backgroundColor: 'white',
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
          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
        `,
      }} />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'][i % 3],
            borderRadius: '50%',
            opacity: 0.3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      <div style={{
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
          <motion.h2
            style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.8rem'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <EditableText
              value={config.features.title}
              onSave={() => { saveConfigToServer() }}
              configPath="features.title"
            >
              {config.features.title}
            </EditableText>
          </motion.h2>
          <motion.p
            style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              maxWidth: '70rem',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <EditableText
              value={config.features.subtitle}
              onSave={() => { saveConfigToServer() }}
              configPath="features.subtitle"
              multiline
            >
              {config.features.subtitle}
            </EditableText>
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          marginBottom: '3rem'
        }} className="md:grid-cols-3">
          {config.features.items.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.title}
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1.5rem',
                  borderRadius: '1.2rem',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Background glow effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: feature?.gradient,
                    borderRadius: '1.2rem',
                    opacity: 0,
                    transition: 'opacity 0.4s'
                  }}
                  whileHover={{ opacity: 0.05 }}
                />

                <motion.div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    background: feature?.gradient,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    position: 'relative',
                    zIndex: 1
                  }}
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent style={{ color: 'white', width: '1.8rem', height: '1.8rem' }} />
                </motion.div>

                <motion.h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '0.8rem',
                    position: 'relative',
                    zIndex: 1
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <EditableText
                    value={feature.title}
                    onSave={() => { saveConfigToServer() }}
                    configPath={`features.items.${index}.title`}
                  >
                    {feature.title}
                  </EditableText>
                </motion.h3>

                <motion.p
                  style={{
                    color: '#4b5563',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    position: 'relative',
                    zIndex: 1
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <EditableText
                    value={feature.description}
                    onSave={() => { saveConfigToServer() }}
                    configPath={`features.items.${index}.description`}
                    multiline
                  >
                    {feature.description}
                  </EditableText>
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}