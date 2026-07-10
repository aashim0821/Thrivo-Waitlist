import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  return (
    <>
      <motion.nav 
        className="glass-panel main-nav"
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" }
        }}
        initial="visible"
        animate={navHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontWeight: '900', fontSize: '1.4rem', letterSpacing: '4px', color: '#FFF', fontFamily: 'Outfit' }}>THRIVO</div>
        </Link>
        <div className="desktop-nav-links" style={{ display: 'flex', gap: '40px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <Link to="/platform" style={{ textDecoration: 'none', color: 'inherit' }}><motion.span whileHover={{ y: -2, color: 'var(--text-primary)' }} style={{cursor:'pointer'}}>Platform</motion.span></Link>
          <Link to="/solutions" style={{ textDecoration: 'none', color: 'inherit' }}><motion.span whileHover={{ y: -2, color: 'var(--text-primary)' }} style={{cursor:'pointer'}}>Solutions</motion.span></Link>
          <Link to="/community" style={{ textDecoration: 'none', color: 'inherit' }}><motion.span whileHover={{ y: -2, color: 'var(--text-primary)' }} style={{cursor:'pointer'}}>Community</motion.span></Link>
          <a href="/#pricing" style={{ textDecoration: 'none', color: 'inherit' }}><motion.span whileHover={{ y: -2, color: 'var(--text-primary)' }} style={{cursor:'pointer'}}>Pricing</motion.span></a>
        </div>
        <div className="desktop-auth-links" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/signup">
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>Get Access</button>
          </Link>
        </div>
        
        {/* Mobile Hamburger Toggle */}
        <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-nav-overlay">
          <Link to="/platform" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#FFF' }}><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Platform</span></Link>
          <Link to="/solutions" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#FFF' }}><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Solutions</span></Link>
          <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#FFF' }}><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Community</span></Link>
          <a href="/#pricing" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#FFF' }}><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Pricing</span></a>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '16px 0' }}></div>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="btn-primary" style={{ marginTop: '16px' }}>Join Waitlist</button>
          </Link>
        </motion.div>
      )}
    </>
  );
};
