import React from "react";
import { AwardItem } from "../types";
import { motion } from "motion/react";
import { Trophy, Calendar, ShieldCheck } from "lucide-react";

interface AwardsProps {
  items: AwardItem[];
}

export function Awards({ items }: AwardsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id="awards" className="py-24 bg-white border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/50 text-amber-700 text-xs font-bold mb-4">
            <Trophy size={14} className="text-amber-500 animate-pulse" />
            <span>আমাদের অর্জন</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4 leading-tight">
            সম্মাননা ও স্বীকৃতিসমূহ
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            দীর্ঘ পথচলায় অত্যন্ত সততা, নিষ্ঠা ও স্বচ্ছতার সাথে অর্জিত কিছু অবিস্মরণীয় অর্জন ও সম্মাননা যা আমাদের পথচলার মূল চালিকাশক্তি।
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm flex flex-col hover:shadow-xl hover:shadow-slate-100 transition duration-300"
            >
              {/* Image Container */}
              <div className="h-56 overflow-hidden relative bg-slate-100 shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-brand-teal text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                    <ShieldCheck size={10} />
                    <span>স্বীকৃত</span>
                  </span>
                  <span className="text-[10px] text-white/90 font-bold tracking-wider flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Calendar size={10} />
                    <span>{item.date}</span>
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider block mb-1">
                    {item.authority}
                  </span>
                  <h3 className="text-lg font-extrabold text-brand-dark tracking-wide mb-3 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium text-justify">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
