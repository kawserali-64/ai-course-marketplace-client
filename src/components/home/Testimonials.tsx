"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The system architecture is remarkably clean. It's rare to see this level of abstraction.",
    user: "David Chen",
    role: "Staff Engineer @ CloudScale",
  },
  {
    quote: "Depth of technical insight provided here surpasses most enterprise-level training.",
    user: "Sarah Jenkins",
    role: "Lead Architect @ AI Labs",
  },
  {
    quote: "A masterclass in UI/UX efficiency. Truly professional grade.",
    user: "Marcus Thorne",
    role: "Senior Dev @ QuantStream",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#050505] py-24 relative">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="mx-auto max-w-7xl px-5 relative z-10">
        
        <div className="mb-20">
          <h2 className="text-sm font-bold tracking-[0.4em] text-cyan-500 uppercase mb-4">Technical Endorsements</h2>
          <p className="text-5xl md:text-7xl font-black text-white italic tracking-tight">Verified by Peers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative p-8 bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-800 rounded-sm hover:border-cyan-500 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-50" />
              
              <p className="text-white text-lg font-light leading-relaxed mb-8">
                “{t.quote}”
              </p>
              
              <div className="mt-auto">
                <h4 className="text-white font-bold text-sm tracking-widest uppercase">{t.user}</h4>
                <p className="text-cyan-700 text-[10px] font-mono mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}