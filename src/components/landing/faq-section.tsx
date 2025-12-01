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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#4FD1D0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#89CFEB]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 text-[#4FD1D0]" />
            <span className="text-sm font-medium text-[#4FD1D0]">FAQ</span>
          </div>

          <h2 className="mb-6 text-4xl md:text-5xl font-bold text-white tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1D0] to-[#89CFEB]">Questions</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Everything you need to know about the event, registration, and participation.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="group border border-white/5 bg-white/5 backdrop-blur-md rounded-2xl px-6 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#4FD1D0]/30 hover:shadow-[0_0_20px_rgba(79,209,208,0.1)]"
                >
                  <AccordionTrigger className="text-left text-lg font-medium text-white hover:no-underline hover:text-[#4FD1D0] py-6 [&[data-state=open]]:text-[#4FD1D0]">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-gray-300 text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mx-auto mt-20 max-w-2xl rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 p-12 text-center shadow-2xl relative overflow-hidden group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[#4FD1D0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <MessageCircle className="w-8 h-8 text-[#4FD1D0]" />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-white">
              Still have questions?
            </h3>
            <p className="mb-8 text-gray-400 text-lg">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <Button
              size="lg"
              className="bg-[#4FD1D0] hover:bg-[#3bc2c1] text-black font-semibold rounded-full px-8 h-12 shadow-[0_0_20px_rgba(79,209,208,0.3)] hover:shadow-[0_0_30px_rgba(79,209,208,0.5)] transition-all transform hover:-translate-y-1"
            >
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
