"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiBookOpen,
  FiAward,
  FiUsers,
  FiCpu,
} from "react-icons/fi";

const features = [
  {
    icon: FiBookOpen,
    title: "Premium AI Courses",
    description:
      "Access carefully designed AI courses from beginner to advanced level.",
  },
  {
    icon: FiAward,
    title: "Expert Instructors",
    description:
      "Learn directly from experienced AI engineers and industry professionals.",
  },
  {
    icon: FiUsers,
    title: "Career Focused",
    description:
      "Build practical projects and gain skills that are ready for real-world jobs.",
  },
  {
    icon: FiCpu,
    title: "Latest AI Technology",
    description:
      "Stay updated with modern AI tools, LLMs, prompt engineering, and automation.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-cyan-600">
              Why Choose Us
            </span>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
              Learn AI With
              <br />
              <span className="text-cyan-600">
                Confidence
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg text-gray-500">
              Our platform provides practical AI education designed for
              students, developers, and professionals who want to build
              real-world skills.
            </p>

            <div className="mt-12 space-y-8">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="AI Learning"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white">
                  Join Thousands of AI Learners
                </h3>

                <p className="mt-2 text-gray-200">
                  Master Artificial Intelligence with practical,
                  project-based learning.
                </p>
              </div>
            </div>

            <div className="absolute -left-8 bottom-10 hidden rounded-3xl border bg-white p-6 shadow-2xl md:block">
              <h4 className="text-4xl font-black text-cyan-600">
                10K+
              </h4>

              <p className="text-sm font-medium text-gray-500">
                Active Students
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}