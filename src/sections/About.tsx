import React from "react";
import { Award, BookOpen, Check, Target } from "lucide-react";
import { AboutContent } from "../types";
import { motion } from "motion/react";

interface AboutProps {
  content: AboutContent;
}

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-brand-light font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            আমাদের পরিচিতি
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            সহযোগিতা ও আত্মনির্ভরতার মাধ্যমে সামাজিক অগ্রগতি
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Introduction Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-brand-dark mb-4 font-sans border-b border-slate-200 pb-2">
              Success সমবায় সমিতি পরিচিতি
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans mb-6 text-justify">
              {content.intro}
            </p>
            <div className="p-5 rounded-2xl bg-brand-teal/5 border border-brand-teal/10 text-brand-teal text-sm italic font-semibold leading-relaxed shadow-sm">
              "সমবায়ই শক্তি, সমবায়ই মুক্তি — এই স্লোগানকে বুকে ধারণ করে আমরা এগিয়ে চলেছি কালিগঞ্জ উপজেলার অবহেলিত প্রান্তিক জনগোষ্ঠীকে স্বাবলম্বী করার আন্দোলনে।"
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            {/* Visual Decorative Card Grid */}
            <div className="relative rounded-[2rem] overflow-hidden bg-white p-8 border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col gap-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-bl-full" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-sm">অনুমোদিত প্রতিষ্ঠান</h4>
                  <p className="text-xs text-slate-500">সরকারি আইন ও নিয়ম মেনে পরিচালিত</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-sm">হিসাবের স্বচ্ছতা</h4>
                  <p className="text-xs text-slate-500">ডিজিটাল ও শতভাগ নিখরচায় অডিট</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/20 flex gap-5 items-start"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">আমাদের লক্ষ্য (Mission)</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {content.mission}
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/20 flex gap-5 items-start"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">আমাদের উদ্দেশ্য (Vision)</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {content.vision}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl" />
          <h3 className="text-lg font-bold mb-6 text-brand-teal font-sans tracking-wide text-center">
            আমাদের মূল মূল্যবোধ (Our Values)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {content.values.map((val, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-orange flex items-center justify-center shrink-0">
                  <Check size={16} />
                </div>
                <span className="text-center font-semibold text-xs sm:text-sm font-sans">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
