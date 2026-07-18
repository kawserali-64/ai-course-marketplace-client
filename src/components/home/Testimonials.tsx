"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "AI Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "The courses are well structured and very easy to follow. I built my first AI project after completing just one course.",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    role: "Machine Learning Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "The practical projects and real-world examples helped me improve my AI skills and prepare for technical interviews.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "University Student",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    review:
      "I loved the hands-on learning experience. The instructors explain complex AI concepts in a simple and engaging way.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-600">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            What Our Students Say
          </h2>

          <p className="mt-4 text-gray-600">
            Thousands of learners are building AI skills through our
            practical, project-based courses.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                  <FaQuoteLeft size={20} />
                </div>

                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <FaStar key={index} size={16} />
                  ))}
                </div>
              </div>

              <p className="flex-1 leading-7 text-gray-600">
                "{testimonial.review}"
              </p>

              <div className="my-6 border-t border-gray-200" />

              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-cyan-500 object-cover"
                />

                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}