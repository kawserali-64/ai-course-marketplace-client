"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { id: "1", title: "How do I enroll?", content: "Browse our AI courses, open the course details page, and enroll to start learning from expert instructors." },
  { id: "2", title: "Are they beginner friendly?", content: "Yes. We offer courses for all levels: Beginner, Intermediate, and Advanced." },
  { id: "3", title: "Who teaches the courses?", content: "All courses are created by industry-leading AI engineers and researchers." },
  { id: "4", title: "Can I publish my own?", content: "Yes. Once signed in, use your creator dashboard to manage and publish your content." },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(faqs[0].id);

  return (
    <section className="bg-[#050505] py-24 border-t border-gray-900">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid md:grid-cols-12 gap-16">
          
          {/* Left Side: Navigation */}
          <div className="md:col-span-5">
            <h2 className="text-sm font-bold text-cyan-500 tracking-[0.3em] uppercase mb-6"> Knowledge Base</h2>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => setActiveId(faq.id)}
                  className={`w-full text-left p-6 transition-all border ${
                    activeId === faq.id 
                    ? "bg-[#0a0a0a] border-cyan-500/50 text-white" 
                    : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className={`text-xl font-bold ${activeId === faq.id ? "text-cyan-500" : ""}`}>
                    0{faq.id}
                  </span>
                  <span className="ml-6">{faq.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Dynamic Content */}
          <div className="md:col-span-7 flex items-center">
            <div className="p-10 bg-[#0a0a0a] border border-gray-900 w-full min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-cyan-500 font-mono mb-4 text-sm">/ {faqs.find(f => f.id === activeId)?.title}</p>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    {faqs.find(f => f.id === activeId)?.content}
                  </h3>
                  <div className="h-1 w-20 bg-cyan-500" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}