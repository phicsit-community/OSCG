"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import { MessageCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I register for the event?",
    answer:
      "Registration is simple! Click the 'Register Now' button on our homepage, fill out the registration form with your details, and you'll receive a confirmation email with your ticket and event details.",
  },
  {
    question: "Is there a code of conduct for participants?",
    answer:
      "Yes, we have a comprehensive code of conduct that ensures a safe, inclusive, and respectful environment for all participants.",
  },
  {
    question: "What kind of projects will be showcased?",
    answer:
      "We showcase a diverse range of open source projects including cloud infrastructure, developer tools, AI/ML frameworks, and community-driven initiatives.",
  },
  {
    question: "Can I submit my own project for consideration?",
    answer:
      "Absolutely! We encourage participants to submit their open source projects through our submission portal.",
  },
  {
    question: "Are there networking opportunities at the event?",
    answer:
      "Yes! We have dedicated networking sessions, workshops, and social events designed to help you connect with other developers and industry leaders.",
  },
  {
    question: "Will I get a certificate of participation?",
    answer:
      "Yes, all registered participants will receive a digital certificate of participation upon completion of the event.",
  },
  {
    question: "What are the career opportunities available?",
    answer:
      "Our hiring partners are actively recruiting open source developers. You'll have access to exclusive job opportunities and career counseling sessions.",
  },
  {
    question: "Is there a refund policy for registration?",
    answer:
      "Yes, we offer full refunds up to 14 days before the event. Please refer to our terms and conditions for more details.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const FAQ = () => {
  return (
    <section className="section-container bg-transparent">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent-secondary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--accent-tertiary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 text-[var(--accent-secondary)]" />
            <span className="text-sm font-medium text-[var(--accent-secondary)]">FAQ</span>
          </div>
          <h2>
            Frequently Asked <span className="text-accent-gradient">Questions</span>
          </h2>
          <p>
            Everything you need to know about the event, registration, and participation.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="group unified-card px-6 overflow-hidden data-[state=open]:border-[var(--accent-secondary)]/30"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline hover:text-[var(--accent-secondary)] py-5 [&[data-state=open]]:text-[var(--accent-secondary)]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--text-secondary)] text-base leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 unified-card p-10 text-center group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <MessageCircle className="w-7 h-7 text-[var(--accent-secondary)]" />
          </div>

          <h3 className="mb-3 text-2xl font-bold text-white">
            Still have questions?
          </h3>
          <p className="mb-6 text-[var(--text-secondary)] text-lg max-w-md mx-auto">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <Button
            size="lg"
            className="bg-[var(--accent-secondary)] hover:bg-[#3bc2c1] text-black font-semibold rounded-2xl px-8 h-12 shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all"
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
