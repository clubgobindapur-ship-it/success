import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";
import { trackEvent } from "../utils/analytics";
import { motion, AnimatePresence } from "motion/react";

interface FAQProps {
  faqs: FAQItem[];
}

export function FAQ({ faqs }: FAQProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (id: string, question: string) => {
    const isOpening = activeId !== id;
    setActiveId(isOpening ? id : null);
    
    trackEvent("faq_toggle_click", {
      questionId: id,
      questionText: question,
      action: isOpening ? "open" : "close"
    });
  };

  return (
    <section id="faq" className="py-24 bg-white font-sans border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            সাধারণ জিজ্ঞাসা
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            সদস্যদের প্রায়শই জিজ্ঞাসিত প্রশ্ন ও উত্তর
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Accordion Grid */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition duration-300 overflow-hidden ${
                  isOpen
                    ? "border-brand-teal bg-brand-teal/5 shadow-md shadow-brand-teal/5"
                    : "border-slate-200 bg-brand-light hover:bg-slate-100/60"
                }`}
              >
                {/* Header (Question trigger) */}
                <button
                  onClick={() => handleToggle(faq.id, faq.question)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <HelpCircle
                      size={20}
                      className={`shrink-0 mt-0.5 transition duration-300 ${
                        isOpen ? "text-brand-teal" : "text-slate-400"
                      }`}
                    />
                    <span className="font-extrabold text-slate-900 text-sm md:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 shrink-0 transition duration-300 ${
                      isOpen ? "rotate-180 text-brand-teal" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0 border-t border-slate-100/50">
                        <p className="text-slate-600 text-sm md:text-base font-sans leading-relaxed text-justify">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
