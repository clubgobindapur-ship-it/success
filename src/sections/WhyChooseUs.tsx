import React from "react";
import { WhyChooseUsItem } from "../types";
import { IconRenderer } from "../components/IconRenderer";
import { motion } from "motion/react";

interface WhyChooseUsProps {
  items: WhyChooseUsItem[];
}

export function WhyChooseUs({ items }: WhyChooseUsProps) {
  // Staggered layout configuration
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="why-choose-us" className="py-24 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            আমরা কেন সেরা
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            মানুষের আস্থা ও বিশ্বস্ততার প্রতীক
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemAnim}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.03)" }}
              className="p-6 rounded-2xl bg-brand-light border border-slate-200 shadow-sm flex flex-col gap-4 group transition duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 group-hover:bg-brand-teal group-hover:text-white transition duration-300">
                <IconRenderer name={item.iconName} size={24} />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-extrabold text-brand-dark text-base mb-2 font-sans tracking-wide">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
