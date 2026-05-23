import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group transition-all"
        aria-expanded={isOpen}
      >
        <span className="text-xl md:text-[22px] font-semibold text-[#404145] group-hover:text-[#1dbf73] transition-colors font-display leading-tight">
          {question}
        </span>
        <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#1dbf73]" : "text-slate-400"}`}>
          <ChevronDown size={28} strokeWidth={2.5} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-[17px] text-[#74767e] leading-relaxed font-display max-w-[90%]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "Are there any fees for withdrawing money?",
      answer: "We apply a flat 3% fee on all withdrawals to cover transaction costs and platform maintenance. This ensures we can provide instant payouts through our crypto and bank partners.",
    },
    {
      question: "Who can use Referr?",
      answer: "Referr is built for both businesses and professionals. Businesses use Referr to find and hire verified top talent effortlessly, while professionals can earn money by completing tasks or referring candidates from their network.",
    },
    {
      question: "What is Referr?",
      answer: "Referr is a professional referral and micro-task platform where you can earn money by connecting high-quality professional services to your network and completing verified small tasks.",
    },
    {
      question: "Is Referr legit?",
      answer: "Yes, Referr is a registered platform that partners with verified businesses and organizations to provide legitimate earning opportunities to users worldwide.",
    },
    {
      question: "Does Referr really pay?",
      answer: "Absolutely. We have already paid out over $2.7M to our users. You can withdraw your earnings via various instant crypto and cash options including direct bank transfers and popular crypto assets.",
    },
    {
      question: "What is the best online earning platform?",
      answer: "While many platforms exist, Referr focuses on high-trust professional referrals. Our platform is designed to be the most reliable way to turn your professional connections and spare time into supplemental income.",
    },
    {
      question: "Can I make $100 a day online?",
      answer: "Earning potential varies based on the tasks you complete and the quality of your referrals. While some high-performing users reach these levels, most use Referr as a reliable source of supplemental income. Your effort and network strength directly impact your results.",
    },
    {
      question: "How to earn money online without investment?",
      answer: "Referr is 100% free to join. You don't need to pay anything to start earning. Simply sign up, pick a task, and start getting paid. There are no hidden fees or 'pro' subscriptions required to access jobs.",
    },
    {
      question: "Do I need special skills to start earning on Referr?",
      answer: "Most micro-tasks don't require special skills. However, our high-tier professional referral opportunities require high-quality professional networks and industry knowledge to be successful.",
    },
    {
      question: "Can I use my phone to earn money online?",
      answer: "Yes! Referr is fully responsive and optimized for mobile devices. You can complete tasks, manage your referrals, and request withdrawals directly from your smartphone browser, anytime and anywhere.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-50">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-slate-900 leading-[1.1] tracking-tight font-display mb-4">
            Frequently asked <br className="hidden md:block" /> questions
          </h2>
          <div className="w-24 h-1.25 bg-[#1dbf73] mx-auto rounded-full mt-8 opacity-20"></div>
        </div>
        
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#74767e] font-display text-lg mb-6">
            Still have questions? Check our full documentation or contact support.
          </p>
          <Link 
            to="/docs" 
            className="inline-flex items-center gap-2 text-[#1dbf73] font-bold text-lg hover:underline transition-all"
          >
            Visit Referr Docs
            <ChevronDown className="-rotate-90" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Inline Link component if needed or import from react-router-dom
import { Link } from "react-router-dom";
