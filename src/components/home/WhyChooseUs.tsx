"use client";

import { motion } from "framer-motion";
import { FiZap, FiTarget, FiLayers } from "react-icons/fi";

export default function WhyChooseUs() {
  const highlights = [
    { title: "Precision Learning", desc: "AI-driven curriculum that adapts to your speed.", icon: <FiZap /> },
    { title: "Industry Blueprint", desc: "Master architectures used by top-tier tech giants.", icon: <FiTarget /> },
    { title: "Full-Stack Mastery", desc: "Bridge the gap between model training and deployment.", icon: <FiLayers /> },
  ];

  return (
    <section className="bg-[#050505] py-24 relative overflow-hidden">
      {/* Cinematic Accent Line */}
      <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Side */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Beyond<br />
              <span className="text-cyan-500 italic">Education</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We aren't just teaching syntax; we are building architects of the next AI revolution. Experience a curriculum forged in high-scale production environments.
            </p>
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300">
              Explore Our Philosophy
            </button>
          </div>

          {/* Unique Grid Side */}
          <div className="lg:col-span-7 grid gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group relative flex items-center p-6 bg-[#0a0a0a] border border-gray-900 hover:border-cyan-900 transition-all cursor-crosshair"
              >
                <div className="w-16 h-16 flex items-center justify-center text-cyan-500 bg-[#111] text-2xl">
                  {item.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
                {/* Active Hover Effect */}
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-700">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}