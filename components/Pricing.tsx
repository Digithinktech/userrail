import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
  return (
    <Section id="pricing">
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white drop-shadow-md">Simple, transparent pricing</h2>
        <p className="text-gray-300">Start for free, scale as you grow. Based on monthly active users (MAU).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {/* Free Plan */}
        <div className="p-8 rounded-3xl mirror-glass hover:bg-white/10 transition-colors border border-white/10">
           <h3 className="text-xl font-bold mb-2 text-white">Starter</h3>
           <div className="text-4xl font-display font-bold mb-4 text-white">$0 <span className="text-base font-normal text-gray-400">/mo</span></div>
           <p className="text-sm text-gray-300 mb-6">For MVPs and hobby projects.</p>
           <Button variant="secondary" className="w-full mb-8 border border-white/10">Get Started</Button>
           <ul className="space-y-3 text-sm text-gray-300">
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Up to 500 MAU</li>
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> 3 Active Flows</li>
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Basic Analytics</li>
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Rail branding</li>
           </ul>
        </div>

        {/* Pro Plan - High Glass */}
        <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl relative overflow-hidden group mirror-glass border-white/20"
        >
           {/* Moving Gradient Border */}
           <div className="absolute inset-0 bg-gradient-to-r from-brand-500 via-purple-500 to-brand-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-[shimmer_3s_linear_infinite]" />
           
           <div className="relative z-10">
             <div className="absolute top-0 right-0 px-3 py-1 bg-brand-500/20 text-brand-300 text-xs font-bold rounded-full border border-brand-500/30 backdrop-blur-md">
               POPULAR
             </div>
             <h3 className="text-xl font-bold mb-2 text-white">Growth</h3>
             <div className="text-4xl font-display font-bold mb-4 text-white">$49 <span className="text-base font-normal text-gray-400">/mo</span></div>
             <p className="text-sm text-gray-300 mb-6">For growing SaaS teams.</p>
             <Button className="w-full mb-8 shadow-brand-500/20 shadow-lg">Start Free Trial</Button>
             <ul className="space-y-3 text-sm text-white">
               <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Up to 5,000 MAU</li>
               <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Unlimited Flows</li>
               <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Advanced Audience Targeting</li>
               <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Remove Branding</li>
             </ul>
           </div>
        </motion.div>

        {/* Enterprise */}
        <div className="p-8 rounded-3xl mirror-glass hover:bg-white/10 transition-colors border border-white/10">
           <h3 className="text-xl font-bold mb-2 text-white">Scale</h3>
           <div className="text-4xl font-display font-bold mb-4 text-white">Custom</div>
           <p className="text-sm text-gray-300 mb-6">For high-volume products.</p>
           <Button variant="ghost" className="w-full mb-8 border border-white/10 hover:border-white/30 text-white">Contact Sales</Button>
           <ul className="space-y-3 text-sm text-gray-300">
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Unlimited MAU</li>
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Dedicated Success Manager</li>
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> SSO & SAML</li>
             <li className="flex gap-2"><Check size={16} className="text-brand-400" /> Custom Contracts</li>
           </ul>
        </div>
      </div>
    </Section>
  );
};