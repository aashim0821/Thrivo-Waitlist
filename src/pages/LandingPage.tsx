import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { WaitlistForm } from '../components/Overlay/WaitlistForm';
import { Link } from 'react-router-dom';

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let iterations = 0;
        const interval = setInterval(() => {
          setDisplayText(text.split('').map((_, index) => {
            if (index < iterations) return text[index];
            return String.fromCharCode(33 + Math.floor(Math.random() * 94));
          }).join(''));
          if (iterations >= text.length) clearInterval(interval);
          iterations += 1 / 3; 
        }, 30);
      }}
    >
      {displayText}
    </motion.span>
  );
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 12 } }
};

export const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "3.2× faster fundraising.",
      desc: "One canonical profile that follows you across investors, creators, and mentors. Verified traction, cap table, and open roles — always up to date."
    },
    {
      title: "Verified Cap Tables.",
      desc: "Instantly share your equity structure with potential investors. Auto-updating ledgers linked directly to your incorporation documents."
    },
    {
      title: "Real-time Traction.",
      desc: "Sync your Stripe, Google Analytics, and bank feeds. Give investors a live dashboard of your MRR, churn, and burn rate with zero manual data entry."
    }
  ];

  return (
    <div style={{ pointerEvents: 'none', width: '100vw' }}>
      {/* Hero Section */}
      <section className="section hero-section" style={{ pointerEvents: 'auto' }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="glass-panel" style={{ marginBottom: '24px', padding: '10px 24px', width: 'fit-content', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
          ✨ Live on Product Hunt
        </motion.div>
        
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <ScrambleText text="The OS for" /> <br/><span className="text-gradient"><ScrambleText text="Modern Startups." /></span>
        </motion.h1>
        
        <motion.p className="section-desc" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          Stop juggling 12 different tools. Connect with verified investors, hire vetted creators, and manage your entire cap table in one unified ecosystem.
        </motion.p>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" style={{ display: 'flex', gap: '16px', marginTop: '48px', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
          <WaitlistForm isHero={true} />
        </motion.div>
      </section>

      {/* Infinite Testimonial Marquee */}
      <section style={{ pointerEvents: 'auto', padding: '40px 0 80px 0', overflow: 'hidden', width: '100vw', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="marquee-container">
          <div className="marquee-track">
            {["Raised our Seed round in 14 days.", "The AI intros are insanely accurate.", "Creator CAC dropped by 40%.", "Best Cap Table tool period.", "Replaced our entire marketing stack.", "Raised our Seed round in 14 days.", "The AI intros are insanely accurate.", "Creator CAC dropped by 40%.", "Best Cap Table tool period.", "Replaced our entire marketing stack."].map((text, i) => (
              <div key={i} className="testimonial-pill glass-panel">{text}</div>
            ))}
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-track reverse">
            {["Finally, one unified profile.", "The ecosystem is unmatched.", "Found a technical cofounder here.", "Booked 12 creator campaigns instantly.", "A game-changer for solo founders.", "Finally, one unified profile.", "The ecosystem is unmatched.", "Found a technical cofounder here.", "Booked 12 creator campaigns instantly.", "A game-changer for solo founders."].map((text, i) => (
              <div key={i} className="testimonial-pill glass-panel">{text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Problem/Solution */}
      <section className="section" style={{ pointerEvents: 'auto' }}>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          The Ecosystem. <br/> <span style={{ color: 'var(--text-secondary)' }}>Reimagined.</span>
        </motion.h2>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="bento-grid">
          
          {/* Main Feature - Span 8 */}
          <motion.div variants={fadeUpItem} className="bento-item glass-panel" style={{ gridColumn: 'span 8', minHeight: '400px', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: '#FF79C6', fontWeight: '800', letterSpacing: '2px', marginBottom: '16px', zIndex: 2 }}>STARTUP PROFILES</div>
            
            <div style={{ position: 'relative', height: '140px', zIndex: 2 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
                >
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', fontFamily: 'Outfit' }}>{slides[activeSlide].title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '80%' }}>{slides[activeSlide].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '8px', opacity: 0.8, zIndex: 2 }}>
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  style={{ 
                    width: activeSlide === idx ? '80px' : '30px', 
                    height: '8px', 
                    background: activeSlide === idx ? '#FF79C6' : 'rgba(255,255,255,0.2)', 
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                ></div>
              ))}
            </div>
          </motion.div>

          {/* Side Feature - Span 4 */}
          <motion.div variants={fadeUpItem} className="bento-item glass-panel" style={{ gridColumn: 'span 4', minHeight: '400px', background: 'rgba(139, 92, 246, 0.1)' }}>
             <div style={{ color: 'var(--accent-purple)', fontWeight: '800', letterSpacing: '2px', marginBottom: '16px' }}>INVESTOR NETWORK</div>
             <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px', fontFamily: 'Outfit' }}>4,800+</h3>
             <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Active check writers. Warm intros generated by AI based on stage, sector, and check size.</p>
             <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(45deg, #FF79C6, #8BE9FD)' }}></div>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(45deg, #FFB86C, #FF79C6)', marginLeft: '-16px' }}></div>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(45deg, #8BE9FD, #50FA7B)', marginLeft: '-16px' }}></div>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginLeft: '-16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>+4k</div>
             </div>
          </motion.div>

          {/* Lower features - Span 6 each */}
          <motion.div variants={fadeUpItem} className="bento-item glass-panel" style={{ gridColumn: 'span 6', minHeight: '300px' }}>
            <div style={{ color: '#8BE9FD', fontWeight: '800', letterSpacing: '2px', marginBottom: '16px' }}>CREATOR MARKETPLACE</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', fontFamily: 'Outfit' }}>Match with vetted creators.</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Book campaigns, track performance, and pay in one click. Average $0.42 CPM across the network.</p>
            <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Campaign ROI</span>
              <span style={{ color: '#4ADE80', fontWeight: 'bold' }}>+340%</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="bento-item glass-panel" style={{ gridColumn: 'span 6', minHeight: '300px' }}>
            <div style={{ color: '#FFB86C', fontWeight: '800', letterSpacing: '2px', marginBottom: '16px' }}>THRIVO AI</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', fontFamily: 'Outfit' }}>An operating partner in your pocket.</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '24px' }}>Ask for investors, creators, mentors, or launch playbooks — get real answers, instantly.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', marginBottom: '16px' }}>
              <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '16px 16px 0 16px', fontSize: '0.85rem' }}>Find me a Seed investor in FinTech.</div>
              <div style={{ alignSelf: 'flex-start', background: 'var(--accent-purple)', padding: '10px 16px', borderRadius: '16px 16px 16px 0', fontSize: '0.85rem' }}>Found 3 active partners. Warm intro?</div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '8px 16px', alignItems: 'center' }}>
              <input type="text" placeholder="Ask Thrivo AI..." style={{ background: 'transparent', border: 'none', color: '#FFF', outline: 'none', flex: 1, fontSize: '0.9rem' }} />
              <div style={{ background: '#FFB86C', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Full screen cinematic pause */}
      <section className="section" style={{ pointerEvents: 'auto', alignItems: 'center', textAlign: 'center', paddingTop: '100px', paddingBottom: '100px' }}>
        <motion.h2 className="section-title" initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.2 }}>
          Your entire startup, <br/> one dashboard.
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
          style={{ marginTop: '64px', width: '100%', maxWidth: '1200px', perspective: '1000px' }}
        >
          <img 
            src="/assets/dashboard-ui.png" 
            alt="Thrivo Dashboard UI" 
            style={{ 
              width: '100%', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 80px rgba(0, 206, 209, 0.2)',
              transform: 'rotateX(5deg) scale(0.95)',
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'rotateX(0deg) scale(1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'rotateX(5deg) scale(0.95)'}
          />
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section" style={{ height: 'auto', pointerEvents: 'auto', alignItems: 'center', textAlign: 'center' }}>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}>Pricing that scales.</motion.h2>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="pricing-grid">
          
          <motion.div variants={fadeUpItem} whileHover={{ y: -10 }} className="glass-panel pricing-card">
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Free</h3>
            <div style={{ fontSize: '4rem', fontWeight: '900', margin: '24px 0', fontFamily: 'Outfit' }}>$0</div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Explore the ecosystem.</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', listStyle: 'none', color: 'var(--text-secondary)' }}>
              <li><span style={{color: '#FFF'}}>✓</span> Founder profile</li>
              <li><span style={{color: '#FFF'}}>✓</span> Community access</li>
              <li><span style={{color: '#FFF'}}>✓</span> Basic AI queries</li>
            </ul>
            <Link to="/signup" style={{ marginTop: 'auto', width: '100%' }}><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary" style={{ width: '100%' }}>Start free</motion.button></Link>
          </motion.div>

          <motion.div variants={fadeUpItem} whileHover={{ y: -10 }} className="glass-panel pricing-card premium">
            <div style={{ display: 'inline-block', background: '#FFF', color: '#000', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '24px' }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Premium</h3>
            <div style={{ fontSize: '4rem', fontWeight: '900', margin: '24px 0', fontFamily: 'Outfit' }}>$29<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/mo</span></div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>For founders shipping fast.</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', listStyle: 'none', color: 'var(--text-secondary)' }}>
              <li><span style={{color: '#FFF'}}>✓</span> Warm intros</li>
              <li><span style={{color: '#FFF'}}>✓</span> Creator marketplace</li>
              <li><span style={{color: '#FFF'}}>✓</span> Thrivo AI (unlimited)</li>
              <li><span style={{color: '#FFF'}}>✓</span> Priority mentors</li>
            </ul>
            <Link to="/signup" style={{ marginTop: 'auto', width: '100%' }}><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ width: '100%' }}>Go premium</motion.button></Link>
          </motion.div>

          <motion.div variants={fadeUpItem} whileHover={{ y: -10 }} className="glass-panel pricing-card">
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Enterprise</h3>
            <div style={{ fontSize: '4rem', fontWeight: '900', margin: '24px 0', fontFamily: 'Outfit' }}>Custom</div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>For scale-ups and funds.</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', listStyle: 'none', color: 'var(--text-secondary)' }}>
              <li><span style={{color: '#FFF'}}>✓</span> Dedicated partner</li>
              <li><span style={{color: '#FFF'}}>✓</span> API access</li>
              <li><span style={{color: '#FFF'}}>✓</span> Custom deal-flow</li>
              <li><span style={{color: '#FFF'}}>✓</span> SOC2 Compliance</li>
            </ul>
            <a href="mailto:sales@thrivo.com" style={{ marginTop: 'auto', width: '100%', display: 'block' }}><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary" style={{ width: '100%' }}>Contact sales</motion.button></a>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
};
