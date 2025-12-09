import React, { useRef } from 'react';
import { Section } from './ui/Section';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap gap-16" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export const Integrations: React.FC = () => {
  const tools = ["Linear", "Jira", "Slack", "GitHub", "Notion", "Trello", "Asana", "Zapier"];

  return (
    <Section id="integrations" className="py-24 border-y border-white/5 overflow-hidden mirror-glass">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-display font-bold mb-4 text-white drop-shadow-md">Integrates with your workflow</h2>
        <p className="text-gray-300">Connect Rail to the tools you already use.</p>
      </div>

      <div className="relative flex flex-col gap-8 opacity-80 hover:opacity-100 transition-opacity duration-500">
         <div className="absolute z-10 left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
         <div className="absolute z-10 right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent pointer-events-none" />
         
         <ParallaxText baseVelocity={2}>
            {tools.map((tool, i) => (
              <span key={i} className="flex items-center gap-3 text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default px-4 drop-shadow-sm">
                 <div className="w-8 h-8 rounded mirror-glass border border-white/20" />
                 {tool}
              </span>
            ))}
         </ParallaxText>
         
         <ParallaxText baseVelocity={-2}>
             {tools.map((tool, i) => (
              <span key={i} className="flex items-center gap-3 text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default px-4 drop-shadow-sm">
                 <div className="w-8 h-8 rounded mirror-glass border border-white/20" />
                 {tool}
              </span>
            ))}
         </ParallaxText>
      </div>
    </Section>
  );
};