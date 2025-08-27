'use client';
import LoginModal from '@/components/admin/adminmodal';
import AdminBar from '@/components/admin/adminpannel';
import { AdminProvider } from '@/components/admin/context';
import BoardsSection from '@/components/boards-section';
import FaqSection from '@/components/faqs';
import FeaturesSection from '@/components/features-section';
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection, { WishlistFormRef } from '@/components/hero-section';
import HubsSection from '@/components/hubs-section';
import PricingSection from '@/components/pricingSection';
import SecuritySection from '@/components/securitySection';
import VideoSection from '@/components/video-section';
import { store } from '@/store';
import { FloatButton } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { ArrowUpOutlined, UpCircleFilled } from "@ant-design/icons";


function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [hover, setHover] = useState(false);
  const wishlistFormRef = useRef<WishlistFormRef>({ focusAndGlow: () => { } });

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;

      const heroBottom = hero.getBoundingClientRect().bottom;

      // Show button only when scrolled past hero
      setShowScroll(heroBottom < 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Provider store={store}>
      <AdminProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
          <AdminBar />
          <div style={{ paddingTop: 'var(--admin-bar-height, 0)' }}>
            <Header wishlistFormRef={wishlistFormRef} />
            <HeroSection ref={wishlistFormRef} />
            <FeaturesSection />
            {/* <VideoSection /> */}
            <HubsSection />
            <BoardsSection />
            <SecuritySection />
            <PricingSection wishlistFormRef={wishlistFormRef} />
            <FaqSection />
            <Footer />
            {showScroll && (
              <FloatButton
                icon={
                  <UpCircleFilled
                    style={{ fontSize: "20px", color: hover ? "#fff" : "#6366F1" }}
                  />
                }
                style={{
                  right: 24,
                  bottom: 24,
                  boxShadow: "0 4px 20px #6366F1",
                  borderRadius: "50%",
                  width: 38,
                  height: 38,
                  background: "#6366F1",
                  color: "#fff",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={scrollToHero}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
            )}
          </div>
          <LoginModal />
        </div>
      </AdminProvider>
    </Provider>
  );
}

export default App;