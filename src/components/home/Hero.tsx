"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const slides = [
  {
    title: "Master AI Skills for the Future",
    subtitle: "Learn ChatGPT, Prompt Engineering, Machine Learning, Generative AI and more from industry experts.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Become an AI Professional",
    subtitle: "Build real-world AI projects and earn industry-recognized certificates.",
    image: "https://images.unsplash.com/photo-1696258686454-60082b2c3c52?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Learn • Practice • Get Hired",
    subtitle: "Start your AI journey today with premium courses and hands-on learning.",
    image: "https://images.unsplash.com/photo-1655635922054-65089f417534?q=80&w=2000&auto=format&fit=crop",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-[#050505] pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main Slider */}
        <div className="relative overflow-hidden rounded-none shadow-2xl border border-gray-900 h-[600px]">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            navigation={{ nextEl: ".btn-next", prevEl: ".btn-prev" }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              bulletClass: "swiper-pagination-bullet !w-2 !h-2 !bg-gray-700 !opacity-100 !mx-1",
              bulletActiveClass: "!bg-cyan-500",
            }}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image src={slide.image} alt={slide.title} fill priority={index === 0} className="object-cover" />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 w-full max-w-[700px] px-8 text-center text-white">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1]">{slide.title}</h1>
                          <p className="text-base md:text-lg text-gray-400 mb-10">{slide.subtitle}</p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/courses" className="px-8 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all">Browse Courses</Link>
                            <Link href="/courses/add" className="px-8 py-3 bg-transparent border border-gray-700 text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">Instructor</Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <button className="btn-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-cyan-500"><FiChevronLeft size={40} /></button>
            <button className="btn-next absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-cyan-500"><FiChevronRight size={40} /></button>
          </Swiper>
        </div>

        {/* NEW FEATURE PILLARS - Pro Level Architecture */}
        <div className="relative z-30 -mt-8 mx-0 md:mx-20 grid grid-cols-1 md:grid-cols-3 border-l border-b border-gray-900">
          {[
            { title: "SYSTEM ARCHITECTURE", desc: "Build scalable AI models from the ground up." },
            { title: "PRODUCTION READY", desc: "Learn to deploy models to real-world environments." },
            { title: "INDUSTRY STANDARDS", desc: "Master the tools used by elite AI engineers." },
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border-t border-r border-gray-900 p-8 hover:bg-[#0f0f0f] transition-all">
              <div className="w-8 h-8 border border-cyan-500 mb-6"></div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;