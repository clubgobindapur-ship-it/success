import React from "react";
import { ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";
import { trackEvent } from "../utils/analytics";
import { HeroContent } from "../types";
import { motion } from "motion/react";

interface HeroProps {
  content: HeroContent;
  onNavigate: (hash: string) => void;
  phone: string;
}

export function Hero({ content, onNavigate, phone }: HeroProps) {
  const handleCTA1Click = () => {
    trackEvent("cta_button_click", {
      buttonName: "আমাদের সম্পর্কে",
      location: "hero"
    });
    onNavigate("#about");
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCTA2Click = () => {
    trackEvent("cta_button_click", {
      buttonName: "যোগাযোগ করুন",
      location: "hero"
    });
    onNavigate("#contact");
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden bg-slate-900"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.bgImageUrl}
          alt="Rural Bangladesh Community"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-slate-900/80 to-slate-950/90" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Hero Body Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-16">
        {/* Organization Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 backdrop-blur-md border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-wider uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span>Success সমবায় সমিতি লিমিটেড</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans tracking-tight mb-6 leading-[1.15] text-white"
        >
          {content.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-200 font-sans max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
        >
          {content.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* Main About CTA */}
          <button
            onClick={handleCTA1Click}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold transition shadow-xl shadow-brand-teal/30 hover:shadow-brand-teal/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{content.ctaText1}</span>
            <ArrowRight size={16} />
          </button>

          {/* Contact CTA */}
          <button
            onClick={handleCTA2Click}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold transition border border-white/20 hover:border-white/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
          >
            <span>{content.ctaText2}</span>
          </button>
        </motion.div>

        {/* Mini highlight line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-xs text-slate-400 flex items-center justify-center gap-2"
        >
          <PhoneCall size={12} className="text-teal-400" />
          <span>জরুরী পরামর্শের জন্য কল করুন: {phone}</span>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave Overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 translate-y-px">
        <svg
          className="relative block w-full h-8 md:h-12 fill-slate-50"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}
