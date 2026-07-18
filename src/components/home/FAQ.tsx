"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { motion } from "framer-motion";

const faqs = [
  {
    key: "1",
    title: "How do I enroll in a course?",
    content:
      "Browse our AI courses, open the course details page, and enroll to start learning from expert instructors.",
  },
  {
    key: "2",
    title: "Are the courses beginner friendly?",
    content:
      "Yes. We offer courses for Beginner, Intermediate, and Advanced learners, so everyone can start at the right level.",
  },
  {
    key: "3",
    title: "Who teaches the courses?",
    content:
      "All courses are created by experienced AI engineers, instructors, and industry professionals with practical experience.",
  },
  {
    key: "4",
    title: "Can I publish my own AI course?",
    content:
      "Yes. After signing in, you can add, manage, and publish your own AI courses from your dashboard.",
  },
  {
    key: "5",
    title: "Will I have lifetime access?",
    content:
      "Yes. Once you enroll, you can access your courses anytime and continue learning at your own pace.",
  },
];

export default function FAQ() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-50/50 via-white to-white" />

      <div className="mx-auto max-w-3xl px-5">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-600">
            FAQ
          </span>

          <h2 className="mt-5 text-5xl font-extrabold tracking-tight text-gray-900">
            Frequently Asked <span className="text-cyan-600">Questions</span>
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Everything you need to know about our AI Course Marketplace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Accordion
            variant="surface"
            className="flex flex-col gap-4"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.key}
                aria-label={faq.title}
                className="group rounded-3xl border border-gray-100 bg-white px-6 py-2 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:shadow-cyan-500/5"
              >
                <span
                  slot="title"
                  className="text-lg font-bold text-gray-800"
                >
                  {faq.title}
                </span>

                <p className="pb-4 leading-relaxed text-gray-500">
                  {faq.content}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
}