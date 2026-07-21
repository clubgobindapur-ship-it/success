import React, { useState } from "react";
import { ServiceItem } from "../types";
import { IconRenderer } from "../components/IconRenderer";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ServicesProps {
  items: ServiceItem[];
}

export function Services({ items }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 bg-brand-light font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            আমাদের সেবাসমূহ
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            সদস্যদের সমৃদ্ধি ও কল্যাণে আমাদের কর্মসূচি
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedService(item)}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/30 transition duration-300 cursor-pointer text-left"
            >
              <div className="flex flex-col gap-4">
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <IconRenderer name={item.iconName} size={24} />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="font-extrabold text-brand-dark text-lg mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-extrabold text-brand-teal hover:text-brand-teal-hover transition">
                <span>বিস্তারিত সেবা</span>
                <span className="text-[10px]">➔</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 p-6 md:p-8 flex flex-col gap-6 text-left"
            >
              {/* Header block with close button */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 shadow-inner">
                    <IconRenderer name={selectedService.iconName} size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-teal tracking-wider block">সেবা বিবরণী</span>
                    <h3 className="text-xl font-extrabold text-brand-dark tracking-tight mt-0.5">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                  title="বন্ধ করুন"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Description Body */}
              <div className="text-slate-600 text-sm md:text-base leading-relaxed text-justify font-sans whitespace-pre-line border-t border-slate-100 pt-5">
                {selectedService.description}
              </div>

              {/* Footer action button */}
              <div className="flex justify-end pt-2 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  ঠিক আছে
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
