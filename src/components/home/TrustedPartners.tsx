"use client";

import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUsers,
  FaHeadset,
  FaCertificate,
  FaRobot,
} from "react-icons/fa";

const partners = [
  {
    id: 1,
    title: "Premium Courses",
    icon: FaBookOpen,
  },
  {
    id: 2,
    title: "Expert Instructors",
    icon: FaChalkboardTeacher,
  },
  {
    id: 3,
    title: "Active Students",
    icon: FaUsers,
  },
  {
    id: 4,
    title: "24/7 Support",
    icon: FaHeadset,
  },
  {
    id: 5,
    title: "Certified Learning",
    icon: FaCertificate,
  },
  {
    id: 6,
    title: "Latest AI Skills",
    icon: FaRobot,
  },
];

export default function TrustedPartners() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
            Why Learn With Us
          </span>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Everything You Need To Master AI
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Learn modern Artificial Intelligence through practical courses,
            experienced instructors, and hands-on projects.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => {
            const Icon = partner.icon;

            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition duration-300 group-hover:bg-cyan-600 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-center text-sm font-bold text-gray-700">
                  {partner.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}