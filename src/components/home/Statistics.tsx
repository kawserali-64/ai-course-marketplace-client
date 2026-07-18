"use client";

import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUsers,
  FaChalkboardTeacher,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    value: "500+",
    label: "AI Courses",
    icon: FaBookOpen,
  },
  {
    id: 2,
    value: "10K+",
    label: "Active Students",
    icon: FaUsers,
  },
  {
    id: 3,
    value: "120+",
    label: "Expert Instructors",
    icon: FaChalkboardTeacher,
  },
  {
    id: 4,
    value: "4.9★",
    label: "Average Rating",
    icon: FaStar,
  },
];

export default function Statistics() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 p-10 shadow-2xl md:p-14"
        >
          {/* Heading */}
          <div className="text-center text-white">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              Our Impact
            </span>

            <h2 className="mt-5 text-3xl font-extrabold md:text-5xl">
              Empowering Future AI Professionals
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Thousands of learners are mastering Artificial Intelligence
              through our high-quality courses and hands-on projects.
            </p>
          </div>

          {/* Statistics */}
          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-md transition hover:bg-white/20"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                    <Icon className="text-3xl text-white" />
                  </div>

                  <h3 className="text-4xl font-black text-white">
                    {item.value}
                  </h3>

                  <p className="mt-3 text-sm font-medium text-white/80">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}