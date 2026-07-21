import React, { useState } from "react";
import { Calendar, FileText, X, ArrowUpRight } from "lucide-react";
import { NewsItem } from "../types";
import { trackEvent } from "../utils/analytics";
import { motion, AnimatePresence } from "motion/react";

interface NewsProps {
  items: NewsItem[];
}

export function NewsSection({ items }: NewsProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Filter only published news
  const publishedNews = items.filter((x) => x.isPublished);

  const handleReadMore = (item: NewsItem) => {
    setSelectedArticle(item);
    trackEvent("news_read", {
      articleId: item.id,
      title: item.title,
      date: item.date
    });
  };

  return (
    <section id="news" className="py-24 bg-brand-light font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            খবর ও নোটিশবোর্ড
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            সমিতির সর্বশেষ আপডেট ও নোটিশসমূহ
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedNews.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="group rounded-[2rem] bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/30 transition duration-300"
            >
              <div>
                {/* News Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                </div>

                {/* News Info */}
                <div className="p-6">
                  {/* Date Badge */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-sans font-semibold">
                    <Calendar size={14} className="text-brand-teal" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-extrabold text-brand-dark text-base md:text-lg mb-2 leading-snug line-clamp-2 hover:text-brand-teal-hover transition">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-sans text-justify font-medium">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read More button */}
              <div className="px-6 pb-6 pt-0 mt-auto">
                <button
                  onClick={() => handleReadMore(item)}
                  className="w-full py-3.5 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-brand-teal/10"
                >
                  <FileText size={14} />
                  <span>সম্পূর্ণ খবর পড়ুন</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 font-sans max-h-[90vh] flex flex-col"
            >
              {/* Sticky Header with Close */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 bg-slate-950/20 hover:bg-slate-950/40 text-white rounded-full transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* News Header Cover Picture */}
              <div className="h-56 shrink-0 relative bg-slate-100">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-slate-200 mb-1.5 font-bold">
                    <Calendar size={14} className="text-brand-orange" />
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>
              </div>

              {/* Content Body (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto max-w-full">
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark mb-4 tracking-tight leading-snug">
                  {selectedArticle.title}
                </h3>
                <div className="w-16 h-1.5 bg-brand-teal rounded-full mb-6" />

                {/* Main rich text / paragraph rendering */}
                <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-4 text-justify font-sans font-medium">
                  {selectedArticle.content.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 text-xs text-slate-500 font-sans">
                <span className="font-semibold">Success সমবায় সমিতি লিমিটেড — কালিগঞ্জ, সাতক্ষীরা</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
