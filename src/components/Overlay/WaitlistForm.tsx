import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Founder');
  const options = ['Founder', 'Investor', 'Creator', 'Mentor'];

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div 
        className="glass-panel" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: '20px 24px', 
          color: '#FFF', 
          background: 'rgba(0,0,0,0.4)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          fontWeight: 600, 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '160px',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}
      >
        <span>{selected}</span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ marginTop: '2px' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel"
            style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              width: '100%', 
              marginTop: '8px', 
              background: 'rgba(15,15,25,0.95)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '8px',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {options.map(opt => (
              <div 
                key={opt}
                onClick={() => { setSelected(opt); setIsOpen(false); }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  background: selected === opt ? 'rgba(255,255,255,0.1)' : 'transparent',
                  fontWeight: selected === opt ? 700 : 500,
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = selected === opt ? 'rgba(255,255,255,0.1)' : 'transparent'}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const WaitlistForm = ({ isHero = false }: { isHero?: boolean }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    // Mock network request for visual polish
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', marginTop: isHero ? '48px' : '0', width: '100%', maxWidth: isHero ? '800px' : '600px', position: 'relative', pointerEvents: 'auto' }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ padding: isHero ? '20px 40px' : '16px 24px', width: '100%', color: '#4ADE80', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)' }}
          >
            ✓ You're on the priority list!
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: isHero ? 'nowrap' : 'wrap', justifyContent: isHero ? 'flex-start' : 'center' }}>
            {isHero && <CustomDropdown />}
            <input 
              type="email" 
              placeholder="you@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="glass-panel" 
              style={{ flex: isHero ? 'none' : 1, width: isHero ? '300px' : 'auto', minWidth: '200px', padding: isHero ? '20px 24px' : '16px 24px', color: '#FFF', outline: 'none', fontSize: '1rem', background: 'rgba(0,0,0,0.4)' }} 
            />
            <motion.button 
              whileHover={{ scale: status === 'loading' ? 1 : 1.05 }} 
              whileTap={{ scale: status === 'loading' ? 1 : 0.95 }} 
              className="btn-primary" 
              disabled={status === 'loading'}
              style={{ padding: isHero ? '20px 40px' : '16px 32px', opacity: status === 'loading' ? 0.7 : 1, width: isHero ? 'auto' : '100%' }}
            >
              {status === 'loading' ? 'Connecting...' : (isHero ? 'Join the Network' : 'Join Waitlist')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
