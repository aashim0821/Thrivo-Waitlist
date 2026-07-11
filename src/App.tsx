import { useEffect } from 'react';
import Lenis from 'lenis';
import { Scene } from './components/Canvas/Scene';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Platform, Solutions, Community, Signup } from './pages/StubPages';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

function App() {
  // Initialize native physics-based smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // 2026 Liquid Glass Physics
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const velocity = Math.abs(currentY - lastY);
          lastY = currentY;
          
          // Drop blur dramatically when scrolling fast (Liquid effect)
          const dynamicBlur = Math.max(5, 40 - velocity * 0.5);
          document.documentElement.style.setProperty('--dynamic-blur', `${dynamicBlur}px`);
          
          // Smoothly return to hard glass when stopped
          setTimeout(() => {
            document.documentElement.style.setProperty('--dynamic-blur', `40px`);
          }, 150);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <Scene />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/community" element={<Community />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
