import React, { useState, useEffect, useRef } from "react";
import { subscribeToAnalytics, AnalyticsEvent } from "../utils/analytics";
import { MessageSquareCode, X, Play, Trash2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AnalyticsInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAnalytics((newEvent) => {
      setEvents((prev) => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
      if (!isOpen) {
        setHasNew(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  const clearEvents = () => {
    setEvents([]);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasNew(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 font-sans">
      {/* Trigger Button */}
      <button
        id="btn-analytics-inspector"
        onClick={handleToggle}
        className={`relative flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-medium text-xs border transition cursor-pointer select-none ${
          isOpen
            ? "bg-slate-900 text-white border-slate-800"
            : "bg-teal-700 hover:bg-teal-800 text-white border-teal-600"
        }`}
      >
        <MessageSquareCode className={`w-4 h-4 ${hasNew ? "animate-bounce" : ""}`} />
        <span>GA4 লাইভ ট্র্যাকিং</span>
        
        {hasNew && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
          </span>
        )}
      </button>

      {/* Inspector Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-slate-950 text-slate-300 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
                  Google Analytics 4 Inspector
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearEvents}
                  title="ক্লিয়ার লগ"
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Info bar */}
            <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
              <span>মাপকাঠি: G-PHCLL7NSFG</span>
              <span className="text-teal-400 flex items-center gap-1">
                <Play className="fill-current" size={6} /> সংযোগ সচল
              </span>
            </div>

            {/* Event List */}
            <div
              ref={scrollRef}
              className="max-h-72 overflow-y-auto p-4 flex flex-col gap-3 font-mono text-xs select-text scrollbar-thin scrollbar-thumb-slate-800"
            >
              {events.length === 0 ? (
                <div className="text-center py-8 text-slate-600 flex flex-col items-center gap-2">
                  <ShieldAlert size={24} className="opacity-40" />
                  <p className="text-[11px]">কোনো ইভেন্ট রেকর্ড হয়নি এখনো।</p>
                  <p className="text-[10px] text-slate-700">
                    ওয়েবসাইটের বোতাম, সোশ্যাল আইকন, গ্যালারি অথবা ফর্মগুলো ব্যবহার করে দেখুন।
                  </p>
                </div>
              ) : (
                events.map((ev, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-amber-400">{ev.eventName}</span>
                      <span className="text-slate-500 text-[9px]">{ev.timestamp}</span>
                    </div>
                    {Object.keys(ev.params).length > 0 && (
                      <pre className="text-[10px] text-teal-400 overflow-x-auto bg-slate-950 p-1.5 rounded mt-1 max-w-full">
                        {JSON.stringify(ev.params, null, 2)}
                      </pre>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
