import { motion } from 'framer-motion';
import { WaitlistForm } from '../components/Overlay/WaitlistForm';

const StubPage = ({ title, desc }: { title: string, desc: string }) => (
  <section className="section" style={{ pointerEvents: 'auto', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '64px', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', fontFamily: 'Outfit', fontWeight: 900, marginBottom: '24px' }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '48px', lineHeight: 1.6 }}>{desc}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WaitlistForm />
      </div>
    </motion.div>
  </section>
);

export const Platform = () => <StubPage title="Platform" desc="The central nervous system of your startup. Manage your cap table, legal docs, and team all in one unified ecosystem." />;
export const Solutions = () => <StubPage title="Solutions" desc="Custom-tailored pipelines for Founders, Investors, and Creators to connect seamlessly." />;
export const Community = () => <StubPage title="Community" desc="Join 4,800+ active check writers and 12,000+ founders shipping at lightning speed." />;
export const Signup = () => <StubPage title="Get Access" desc="Request access to the Thrivo beta. We review applications on a rolling basis." />;
