import { motion, type Variants } from 'framer-motion';
import { WaitlistForm } from './Overlay/WaitlistForm';
import { Link } from 'react-router-dom';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export const Footer = () => {
  return (
    <footer className="section footer-section" style={{ pointerEvents: 'auto' }}>
      <motion.h2 className="section-title" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', width: '100%' }}>Ready to build?</motion.h2>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" style={{ display: 'flex', gap: '16px', marginTop: '48px', justifyContent: 'center', width: '100%' }}>
        <WaitlistForm />
      </motion.div>
      
      <div className="footer-bottom" style={{ marginTop: '120px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '40px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <div style={{ fontWeight: '900', color: '#FFF', letterSpacing: '2px', fontFamily: 'Outfit' }}>THRIVO</div>
        <div className="footer-links" style={{ display: 'flex', gap: '32px', fontWeight: 500 }}>
          <Link to="/platform" style={{ textDecoration: 'none', color: 'inherit' }}><span style={{cursor:'pointer'}}>Platform</span></Link>
          <a href="/#pricing" style={{ textDecoration: 'none', color: 'inherit' }}><span style={{cursor:'pointer'}}>Pricing</span></a>
          <Link to="/community" style={{ textDecoration: 'none', color: 'inherit' }}><span style={{cursor:'pointer'}}>Community</span></Link>
          <a href="https://twitter.com" style={{ textDecoration: 'none', color: 'inherit' }}><span style={{cursor:'pointer'}}>Twitter</span></a>
        </div>
        <div>© 2026 Thrivo. The Generative Web.</div>
      </div>
    </footer>
  );
};
