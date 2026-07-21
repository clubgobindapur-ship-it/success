import React from "react";
import { Check, Droplet, Sparkles } from "lucide-react";
import { WaterContent } from "../types";
import { motion } from "motion/react";

interface WaterSectionProps {
  content: WaterContent;
}

export function WaterSection({ content }: WaterSectionProps) {
  return (
    <section id="water" className="py-24 bg-white font-sans border-b border-slate-200 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 flex items-center justify-center gap-1.5">
            <Droplet size={14} className="text-brand-blue animate-pulse" />
            <span>সুপেয় পানি উদ্যোগ</span>
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            {content.title}
          </p>
          <div className="w-16 h-1.5 bg-brand-blue mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Layout: Image left, features right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image visual wrapper */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-200">
              <img
                src={content.imageUrl}
                alt="Water filtration plant"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-brand-blue/90 text-white px-4 py-2 rounded-2xl backdrop-blur-md flex items-center gap-2 shadow-lg">
                <Sparkles size={16} />
                <span className="text-xs font-bold font-sans">সর্বাধুনিক রিভার্স অসমোসিস (RO) প্ল্যান্ট</span>
              </div>
            </div>
          </div>

          {/* Core Description and Feature Checklists */}
          <div className="lg:col-span-7">
            <h3 className="text-xl md:text-2xl font-extrabold text-brand-dark mb-4 tracking-wide leading-snug">
              লবণাক্ত উপকূলের মাঝে সুপেয় মিষ্টি পানির নির্ভরতা
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans mb-8">
              {content.description}
            </p>

            <h4 className="font-extrabold text-brand-dark text-sm md:text-base mb-4 tracking-wider uppercase border-l-4 border-brand-blue pl-3">
              প্রকল্পের প্রধান বৈশিষ্ট্যসমূহ:
            </h4>

            {/* Checklist */}
            <div className="flex flex-col gap-3">
              {content.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-3 rounded-2xl hover:bg-brand-blue/5 border border-transparent hover:border-brand-blue/10 transition"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-slate-700 text-xs sm:text-sm font-sans leading-relaxed font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Micro Highlight Card */}
            <div className="mt-8 p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h5 className="font-extrabold text-brand-blue text-xs sm:text-sm">দৈনিক সরবরাহ সক্ষমতা</h5>
                <p className="text-slate-600 text-xs mt-1">প্রতিদিন ৫,০০০+ লিটার বিশুদ্ধ সুপেয় পানি শোধন ও বিতরণ</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold tracking-wide uppercase self-start sm:self-auto">
                লাইভ রিডিং
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
