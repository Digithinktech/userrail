import React, { useRef } from 'react';
import { Section } from './ui/Section';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ShieldCheck, Users, CreditCard, Zap } from 'lucide-react';

interface BorderBeamProps {
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

const BorderBeam: React.FC<BorderBeamProps> = ({ 
  duration = 10, 
  delay = 0,
  colorFrom = '#14b8a6', // Teal
  colorTo = '#a855f7'    // Purple
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${colorFrom} 60deg, transparent 120deg)`,
          offsetPath: 'rect(0% 0% 100% 100% round 24px)', // Follows the border radius
        }}
        animate={{
          offsetDistance: ['0%', '100%']
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          delay: delay
        }}
      />
      <motion.div 
         animate={{ rotate: [0, 360] }}
         transition={{ duration: duration, ease: "linear", repeat: Infinity, delay: delay }}
         className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30 blur-sm"
         style={{
           background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 10deg, transparent 50deg, transparent 360deg)`
         }}
      />
    </div>
  );
};

interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  beamColor?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ title, description, icon, delay = 0, beamColor }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      initial={{ opacity: 0, y: 100, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative h-full w-full"
    >
      <div 
        style={{ transform: "translateZ(0)" }}
        className="group relative h-full w-full overflow-hidden rounded-3xl mirror-glass px-8 py-10 transition-all duration-500 hover:bg-white/10 hover:shadow-2xl hover:shadow-brand-500/10"
      >
        {/* Active Border Beam for Highlight */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <BorderBeam colorFrom={beamColor} delay={delay * 2} />
        </div>

        {/* Spotlight Gradient on Hover (Glass Shine) */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX.get() * 500 + 200}px ${mouseY.get() * 500 + 200}px,
                rgba(255, 255, 255, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between gap-10">
          {/* Floating Icon with Glass Glow */}
          <div 
             style={{ transform: "translateZ(40px)" }}
             className="w-16 h-16 rounded-2xl mirror-glass flex items-center justify-center text-white shadow-lg backdrop-blur-md group-hover:scale-110 transition-transform duration-500 border border-white/20"
          >
             {/* Inner Icon Glow */}
             <div className="absolute inset-0 rounded-2xl opacity-40 blur-lg" style={{ backgroundColor: beamColor }} />
             <div className="relative z-10">{icon}</div>
          </div>

          <div style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{title}</h3>
            <p className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for columns
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <Section id="features" className="overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 relative">
        
        <div className="text-center mb-24 relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
             whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 1, ease: "easeOut" }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-white tracking-tight drop-shadow-lg">Analysis Paralysis is over</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              The market is too noisy. The research is too long. We built Rail to eliminate the friction that keeps you on the sidelines. Investing should feel like riding shotgun, not navigating rush hour.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          
          {/* Left Column - Slower Parallax */}
          <motion.div style={{ y: yLeft }} className="flex flex-col gap-6 lg:gap-8">
            <TiltCard 
              title="Set it. Forget it" 
              description="Our Ai curates smart diversified investment 'TRACKS' for you. You never have to pick a single stock again. Just choose a destination."
              icon={<ShieldCheck size={32} className="text-emerald-400" />}
              beamColor="#34d399"
              delay={0}
            />
            <TiltCard 
              title="Reinvest Your Spare Change" 
              description="Purchase your card and turn every round-up or cashback reward into investments on Rail. Wealth accumulation happens automatically, in the background."
              icon={<CreditCard size={32} className="text-blue-400" />}
              beamColor="#60a5fa"
              delay={0.2}
            />
          </motion.div>

          {/* Right Column - Faster Parallax */}
          <motion.div style={{ y: yRight }} className="flex flex-col gap-6 lg:gap-8 md:mt-16">
            <TiltCard 
              title="Copy the Winning Signal" 
              description="Why learn the hard way? See the real-time portfolios of top traders and mirror their moves instantly. We call them Conductors. You just enjoy the ride."
              icon={<Users size={32} className="text-purple-400" />}
              beamColor="#c084fc"
              delay={0.1}
            />
            <TiltCard 
              title="Zero Friction, Borderless Money." 
              description="Built on Stablecoin, not old bank tech. Your funds move instantly, globally, without the waiting game. If the market is open, Rail is ready."
              icon={<Zap size={32} className="text-amber-400" />}
              beamColor="#fbbf24"
              delay={0.3}
            />
          </motion.div>

        </div>
      </div>
    </Section>
  );
};