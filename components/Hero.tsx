import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, ShieldCheck, Globe, Zap, PieChart } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Section Scroll Progress for animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Page Scroll Progress for the dashboard bottom bar
  const { scrollYProgress: pageScroll } = useScroll();
  const smoothPageScroll = useSpring(pageScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Text Reveal Variants
  const revealContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const revealItem = {
    hidden: { y: "100%" },
    show: { 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={targetRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden selection:bg-brand-500/30">
      {/* Background is handled by index.html global gradient, we add a subtle radial shine here */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mirror-glass mb-8 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wide uppercase text-brand-100 group-hover:text-white transition-colors">AI-Managed Portfolios Live</span>
        </motion.div>

        <motion.div 
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="mb-8 relative z-20"
        >
          <div className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white drop-shadow-xl">
            <div className="overflow-hidden">
              <motion.div variants={revealItem}>Wealth on Autopilot.</motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={revealItem} className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">Life on Full Speed.</motion.div>
            </div>
          </div>
          
          <motion.p 
            variants={fadeIn}
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
          >
            The old financial system is broken. Rail is the upgrade. AI-managed portfolios, global stablecoin access, and automatic wealth building. Welcome to the new standard.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button icon={<ArrowRight size={18} />} onClick={() => scrollToSection('pricing')}>Start investing</Button>
            <Button variant="secondary" icon={<Play size={16} />} onClick={() => scrollToSection('how-it-works')}>See how it works</Button>
          </motion.div>
        </motion.div>

        {/* Feature Highlights Mockup - The "Holographic Command Center" */}
        <motion.div
          style={{ opacity, scale, y }}
          initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-5xl mx-auto mt-4 md:mt-12 perspective-1000"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mirror-glass aspect-[16/9] md:aspect-[21/9] group border border-white/20">
            
            {/* Fake App Header */}
            <div className="absolute top-0 left-0 right-0 h-12 border-b border-white/10 flex items-center px-6 gap-4 z-20 justify-between bg-white/5 backdrop-blur-md">
              <div className="flex gap-4">
                 <div className="h-2 w-2 rounded-full bg-red-500/50" />
                 <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                 <div className="h-2 w-2 rounded-full bg-green-500/50" />
              </div>
              <div className="flex gap-4 items-center">
                 <div className="h-2 w-20 bg-white/10 rounded-full" />
                 <div className="h-8 w-8 mirror-glass rounded flex items-center justify-center">
                    <span className="font-logo text-xl text-white pt-0.5">R</span>
                 </div>
              </div>
            </div>

            {/* Main Command Center Content */}
            <div className="absolute inset-0 pt-12 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/40">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

              {/* Central Holographic Globe */}
              <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
                {/* Rotating Rings */}
                {[...Array(3)].map((_, i) => (
                   <motion.div 
                      key={i}
                      className="absolute inset-0 rounded-full border border-brand-500/20 border-dashed"
                      style={{ 
                        width: `${100 - i * 15}%`, 
                        height: `${100 - i * 15}%`,
                        margin: 'auto'
                      }}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                      transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                   />
                ))}
                
                {/* Core Sphere */}
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(20,184,166,0.2)", "0 0 50px rgba(20,184,166,0.5)", "0 0 20px rgba(20,184,166,0.2)"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-blue-600 blur-sm opacity-50 absolute"
                />
                <div className="w-20 h-20 rounded-full mirror-glass flex items-center justify-center relative z-20 border border-white/20">
                   <Globe className="text-white w-10 h-10 animate-pulse" />
                </div>
              </div>

              {/* Orbiting Asset Cards */}
              <FloatingAsset 
                icon={<img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026" className="w-6 h-6" alt="BTC" />}
                label="Bitcoin" 
                value="+5.2%" 
                color="text-green-400"
                x="-180px" y="-80px" delay={0} 
              />
               <FloatingAsset 
                icon={<PieChart className="text-purple-400 w-6 h-6" />}
                label="S&P 500" 
                value="+1.4%" 
                color="text-green-400"
                x="180px" y="-40px" delay={1.5} 
              />
               <FloatingAsset 
                icon={<Zap className="text-yellow-400 w-6 h-6" />}
                label="Yield" 
                value="4.8% APY" 
                color="text-yellow-400"
                x="-120px" y="100px" delay={3} 
              />

              {/* Activity Feed Overlay */}
              <div className="absolute right-6 top-20 bottom-10 w-64 hidden lg:flex flex-col gap-3 pointer-events-none">
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Live Activity</div>
                 <ActivityItem text="Portfolio Rebalanced" time="2m ago" />
                 <ActivityItem text="Dividend Received: $42.50" time="15m ago" />
                 <ActivityItem text="Auto-Invest Executed" time="1h ago" />
              </div>

            </div>

            {/* Scanner Line Effect */}
            <motion.div 
               className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-brand-500 to-transparent opacity-50 z-20"
               animate={{ left: ["0%", "100%", "0%"] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               style={{ boxShadow: "0 0 15px rgba(20,184,166,0.5)" }}
            />

            {/* Reflection/Glare Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none mix-blend-overlay" />

            {/* Bottom Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
               <motion.div 
                 className="h-full bg-gradient-to-r from-brand-500 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                 style={{ scaleX: smoothPageScroll, transformOrigin: "left" }}
               />
            </div>

          </div>
        </motion.div>

        {/* Logos */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 pt-10 border-t border-white/5 w-full max-w-5xl"
        >
            <p className="text-sm text-gray-400 mb-8 uppercase tracking-widest text-center font-medium">Trusted by investors at</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 mix-blend-overlay">
                 {['Coinbase', 'Binance', 'Kraken', 'Gemini', 'Circle'].map((logo) => (
                   <span key={logo} className="text-xl font-display font-bold hover:text-white transition-colors cursor-default text-white">{logo}</span>
                 ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Helper Components ---

const FloatingAsset = ({ icon, label, value, color, x, y, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{ 
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() }
    }}
    style={{ x, y }}
    className="absolute z-20 mirror-glass px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg border border-white/20 backdrop-blur-xl"
  >
    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
      {icon}
    </div>
    <div>
      <div className="text-xs font-bold text-white">{label}</div>
      <div className={`text-[10px] font-mono ${color}`}>{value}</div>
    </div>
  </motion.div>
);

const ActivityItem = ({ text, time }: { text: string, time: string }) => (
  <motion.div 
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm"
  >
     <span className="text-xs text-gray-300 font-medium">{text}</span>
     <span className="text-[10px] text-gray-500">{time}</span>
  </motion.div>
);
