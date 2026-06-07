import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface FAQItemProps {
  question: string;
  answer: string;
  isLast?: boolean;
}

const FAQItem = ({ question, answer, isLast }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`scroll-mt-24 ${isLast ? "border-b-2 border-[#4E4E6C]/60" : ""}`}>
      <summary
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full px-4 py-6 justify-between items-center border-t-2 border-[#4E4E6C]/60 text-left text-lg font-medium focus:outline-none cursor-pointer group list-none select-none [&::-webkit-details-marker]:hidden"
        style={{ listStyle: "none" }}
        aria-expanded={isOpen}
      >
        <h3 className="pr-2 text-xl font-semibold w-[95%] text-white transition-colors duration-200 group-hover:text-white/90">
          {question}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#B8B8C8"
          aria-hidden="true"
          className={`transform transition-transform duration-300 h-5 w-5 stroke-[2px] shrink-0 ${isOpen ? "rotate-180 text-white" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <section className="text-xl pb-6 px-4 font-medium text-[#B8B8C8]">
              <div className="faq-answer">
                {answer}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection({ items }: { items?: { question: string; answer: string }[] }) {
  const defaultFaqs = [
    {
      question: "How does Referr help scale my business?",
      answer: "Referr turns your existing customers and fans into a powerful referral engine. By incentivizing word-of-mouth, you can acquire high-quality users at a fraction of the cost of traditional ads.",
    },
    {
      question: "How do I track referral performance?",
      answer: "Our dashboard provides real-time analytics on every click, sign-up, and conversion. You can see exactly which advocates are driving the most value and optimize your campaigns accordingly.",
    },
    {
      question: "Are there any upfront costs for businesses?",
      answer: "We offer various plans suited for different business sizes. You can start with our Launch plan to test the waters or go Pro for advanced features and higher volumes.",
    },
    {
      question: "Can I customize my referral landing pages?",
      answer: "Yes, fully! You can brand your referral pages with your own logo, colors, and messaging to ensure a seamless experience for your advocates and their referrals.",
    },
    {
      question: "How are advocates verified on the platform?",
      answer: "We use a combination of social verification and performance tracking to ensure your brand is represented by real, high-quality individuals who genuinely care about your product.",
    },
  ];

  const faqs = items || defaultFaqs;

  return (
    <section className="bg-[#050505] border-t border-white/5">
      <div className="px-5 md:px-8 xl:px-32 py-10 sm:py-16 md:py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-4 items-center text-center mb-12">
            <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
              GOT QUESTIONS? <br /> WE'VE GOT ANSWERS.
            </h2>
          </div>
          <div className="mx-auto text-white">
            <div className="flex flex-col">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer} 
                  isLast={index === faqs.length - 1} 
                />
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-[#B8B8C8] font-sans text-lg mb-6">
              Still have questions? Check our full documentation or contact support.
            </p>
            <Link 
              to="/docs" 
              className="inline-flex items-center gap-2 text-white hover:text-[#B8B8C8] font-bold text-lg hover:underline transition-all"
            >
              Visit Referr Docs
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="2.5" 
                stroke="currentColor" 
                className="h-5 w-5 -rotate-90"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
