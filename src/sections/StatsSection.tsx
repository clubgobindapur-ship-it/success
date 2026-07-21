import React, { useState, useEffect } from "react";
import { StatItem } from "../types";
import { IconRenderer } from "../components/IconRenderer";
import { motion } from "motion/react";

const EN_TO_BN: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const BN_TO_EN: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

function toBengaliDigits(numStr: string | number): string {
  return String(numStr).split('').map(char => EN_TO_BN[char] || char).join('');
}

function toEnglishDigits(numStr: string): string {
  return numStr.split('').map(char => BN_TO_EN[char] || char).join('');
}

function parseStatValue(val: string) {
  const englishVal = toEnglishDigits(val || "");
  const numericMatch = englishVal.match(/\d+/);
  if (!numericMatch) {
    return { target: 0, prefix: "", suffix: val || "", isBengali: /[\u09E6-\u09EF]/.test(val || "") };
  }
  const numString = numericMatch[0];
  const target = parseInt(numString, 10);
  const index = englishVal.indexOf(numString);
  const prefix = val.substring(0, index);
  const suffix = val.substring(index + numString.length);
  const isBengali = /[\u09E6-\u09EF]/.test(val || "");
  return { target, prefix, suffix, isBengali };
}

function CountingStat({ value }: { value: string }) {
  const { target, prefix, suffix, isBengali } = parseStatValue(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation duration
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.floor(easedProgress * target);
      setCurrent(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target]);

  const displayedNumber = isBengali ? toBengaliDigits(current) : current;

  return (
    <span>
      {prefix}
      {displayedNumber}
      {suffix}
    </span>
  );
}

interface StatsProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsProps) {
  return (
    <section id="stats" className="py-16 bg-[#1E293B] text-white font-sans relative overflow-hidden">
      {/* Visual decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Statistics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300"
            >
              {/* Animated Core Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-teal/20 text-brand-orange flex items-center justify-center shrink-0 mb-4">
                <IconRenderer name={stat.iconName} size={24} />
              </div>

              {/* Animated stat Counter representation */}
              <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans mb-2">
                <CountingStat value={stat.value} />
              </span>

              {/* Description tag */}
              <span className="block text-slate-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
