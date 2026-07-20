"use client";

import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUsers,
  FaChalkboardTeacher,
  FaStar,
} from "react-icons/fa";

const stats = [
  { id: 1, value: "500+", label: "AI Courses", icon: FaBookOpen },
  { id: 2, value: "10K+", label: "Active Students", icon: FaUsers },
  { id: 3, value: "120+", label: "Expert Instructors", icon: FaChalkboardTeacher },
  { id: 4, value: "4.9", label: "Avg Rating", icon: FaStar },
];

export default function Statistics() {
  return (
    <section className="bg-[#050505] py-24 border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-5">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500">
            Platform Metrics
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Scaling Intelligence
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative p-8 bg-[#0a0a0a] border border-gray-900 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="mb-6 flex justify-between items-start">
                  <Icon className="text-2xl text-cyan-500 group-hover:scale-110 transition-transform" />
                  <div className="h-1 w-8 bg-gray-900 group-hover:bg-cyan-500 transition-colors" />
                </div>

                <h3 className="text-4xl font-black text-white mb-2">
                  {item.value}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-cyan-500 transition-colors">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}