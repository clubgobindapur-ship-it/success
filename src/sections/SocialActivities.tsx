import React from "react";
import { SocialActivityItem } from "../types";
import { motion } from "motion/react";

interface SocialActivitiesProps {
  items: SocialActivityItem[];
}

export function SocialActivities({ items }: SocialActivitiesProps) {
  return (
    <section id="social" className="py-24 bg-brand-light font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            সামাজিক উদ্যোগ
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            সমাজ উন্নয়নে আমাদের বহুমুখী মানবিক উদ্যোগসমূহ
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="group rounded-[2rem] bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/30 transition duration-300"
            >
              <div>
                {/* Activity Image */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-extrabold text-brand-dark text-sm md:text-base mb-2 font-sans tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans text-justify font-medium">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Detail */}
              <div className="px-6 pb-6 pt-0 mt-auto">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest border border-brand-teal/20 bg-brand-teal/10 px-2.5 py-1 rounded-full">
                  জনকল্যাণমূলক
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
