import React, { useRef, useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Building2, CreditCard, Bitcoin, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

// --- Visual Components ---

interface IntegrationNodeProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  delay: number;
}

const IntegrationNode: React.FC<IntegrationNodeProps> = ({ icon, label, sublabel, x, y, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      // Continuous floating animation
      animate={{ 
        y: [0, -3, 0], 
      }}
      // @ts-ignore
      transition={{
        duration: 7 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }}
      className="absolute flex items-center gap-3 p-3 rounded-xl mirror-glass z-20 group cursor-default shadow-lg"
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)' 
      }}
      whileHover={{ scale: 1.05, borderColor: color, y: -2 }}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner mirror-glass border border-white/20"
        style={{ color: color }}
      >
        {icon}
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <span className="text-xs font-bold text-gray-200">{label}</span>
        <span className="text-[10px] text-gray-400 font-mono">{sublabel}</span>
      </div>
      
      {/* Status Dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center border border-white/10">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
    </motion.div>
  );
};

const ConnectionBeam = ({ x, y, color, delay }: { x: number, y: number, color: string, delay: number }) => {
  return (
    <svg className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none z-10" style={{ transform: 'translate(-50%, -50%)' }}>
      <motion.path
        d={`M ${x} ${y} L 0 0`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay }}
      />
      <motion.circle
        r="2" // Small particle
        fill={color}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        style={{ offsetPath: `path('M ${x} ${y} L 0 0')` }}
        transition={{ 
          duration: 4, // Slower travel time
          repeat: Infinity, 
          ease: "linear",
          delay: delay + 1.5,
          repeatDelay: 1 
        }}
      />
    </svg>
  );
};

const CentralHub = () => {
  const [balance, setBalance] = useState(124000);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + Math.floor(Math.random() * 50));
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
    >
      <div className="relative w-40 h-40 rounded-full mirror-glass flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/20">
        {/* Pulsing Rings */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-brand-500/30"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute inset-0 rounded-full border border-brand-500/10"
        />

        {/* Content */}
        <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white mb-2 shadow-lg ring-1 ring-white/20">
           <span className="font-logo text-2xl pt-1">R</span>
        </div>
        <div className="text-[10px] text-gray-300 uppercase tracking-widest font-medium">Net Worth</div>
        <div className="text-xl font-display font-bold text-white tabular-nums drop-shadow-md">
           ${balance.toLocaleString()}
        </div>
      </div>
    </motion.div>
  );
};

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  const steps = [
    {
      number: "01",
      title: "Sync your world",
      description: "Connect your bank accounts, crypto wallets, and credit cards in one click. Read-only access ensures your security."
    },
    {
      number: "02",
      title: "Activate Autopilot",
      description: "Define your goals and risk tolerance. Our AI builds a personalized 'Track' that automatically rebalances for you."
    },
    {
      number: "03",
      title: "Watch it Compound",
      description: "Sit back as Rail harvests yield, reinvests dividends, and optimizes your tax exposure 24/7."
    }
  ];

  // Tighter spread
  const nodes = [
    { id: 1, label: "Chase Bank", sublabel: "Checking ••4291", icon: <Building2 size={20} />, x: -120, y: -75, color: "#3b82f6", delay: 0 },
    { id: 2, label: "Coinbase", sublabel: "Wallet Connect", icon: <Bitcoin size={20} />, x: 120, y: -75, color: "#f59e0b", delay: 0.2 },
    { id: 3, label: "Amex Platinum", sublabel: "Credit ••8821", icon: <CreditCard size={20} />, x: -120, y: 75, color: "#0ea5e9", delay: 0.4 },
    { id: 4, label: "Metamask", sublabel: "ETH Mainnet", icon: <Wallet size={20} />, x: 120, y: 75, color: "#ec4899", delay: 0.6 },
  ];

  return (
    <Section id="how-it-works" className="relative overflow-visible">
       <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          
          {/* Left Side: Content Steps */}
          <div className="space-y-12 relative z-10 order-2 lg:order-1">
              <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white drop-shadow-md">Built for simplicity.<br/>Engineered for wealth.</h2>
                  <p className="text-gray-300 mb-12 text-lg">Consolidate your entire financial life into a single, intelligent dashboard. No spreadsheets. No manual transfers.</p>
                  
                  <div className="relative pl-8 space-y-12">
                    {/* Animated Timeline Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10 overflow-hidden rounded-full">
                        <motion.div 
                            style={{ height: lineHeight }}
                            className="w-full bg-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                        />
                    </div>

                    {steps.map((step, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative flex gap-8 group"
                      >
                        <div className="absolute -left-[45px] w-10 h-10 rounded-full border border-white/10 mirror-glass z-20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-brand-500 transition-colors duration-300" />
                        </div>
                        
                        <div>
                          <span className="font-mono text-brand-400 text-xs mb-1 block">STEP {step.number}</span>
                          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-300 transition-colors">{step.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
              </div>
          </div>

          {/* Right Side: Interactive Visual */}
          <div className="relative order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px] w-full">
             <div className="absolute inset-0 rounded-3xl mirror-glass overflow-hidden shadow-2xl border border-white/20">
                
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
                
                {/* Visual Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                   
                   <div className="relative w-full h-full flex items-center justify-center scale-[0.5] sm:scale-[0.75] md:scale-[0.85] lg:scale-100 transition-transform duration-500 origin-center">
                       <CentralHub />

                       {nodes.map((node) => (
                          <React.Fragment key={node.id}>
                            <ConnectionBeam x={node.x} y={node.y} color={node.color} delay={node.delay} />
                            <IntegrationNode {...node} />
                          </React.Fragment>
                       ))}
                   </div>

                </div>

                {/* Floating "Success" Toast */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 mirror-glass px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-40 w-auto max-w-[90%] justify-center border border-white/20"
                >
                   <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-green-500" />
                   </div>
                   <span className="text-sm text-white font-medium text-center leading-tight">4 sources connected successfully</span>
                </motion.div>

             </div>
          </div>

       </div>
    </Section>
  );
};