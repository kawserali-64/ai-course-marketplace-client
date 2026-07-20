"use client";

import { motion } from "framer-motion";
import { FaBookOpen, FaChalkboardTeacher, FaUsers, FaHeadset, FaCertificate, FaRobot } from "react-icons/fa";

const features = [
  { title: "Premium Courses", icon: FaBookOpen },
  { title: "Expert Mentors", icon: FaChalkboardTeacher },
  { title: "Global Community", icon: FaUsers },
  { title: "24/7 Support", icon: FaHeadset },
  { title: "Certified Skills", icon: FaCertificate },
  { title: "Latest AI Stack", icon: FaRobot },
];

export default function Features() {
  return (
    <section className="bg-[#050505] py-32">
      <div className="mx-auto max-w-7xl px-5">
        
        {/* Header - Minimalist */}
        <div className="mb-24">
          <p className="text-cyan-500 font-mono text-sm mb-4">// System capabilities</p>
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">
            Precision Built.
          </h2>
        </div>

        {/* Blueprint Grid - No Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-10 border-b border-r border-gray-900 hover:border-cyan-500/30 transition-colors duration-500"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-cyan-500 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className="w-full h-px bg-gray-900 group-hover:bg-cyan-500/20" />
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  High-performance modules optimized for rapid deployment.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}