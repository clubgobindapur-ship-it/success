import React, { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { trackEvent } from "../utils/analytics";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeHash: string;
  onNavigate: (hash: string) => void;
  orgName: string;
}

export function Navbar({ activeHash, onNavigate, orgName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll position to apply background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "হোম", hash: "#home" },
    { label: "আমাদের সম্পর্কে", hash: "#about" },
    { label: "সেবা সমূহ", hash: "#services" },
    { label: "বিশুদ্ধ পানি প্রকল্প", hash: "#water" },
    { label: "সামাজিক কার্যক্রম", hash: "#social" },
    { label: "অর্জন ও সম্মাননা", hash: "#awards" },
    { label: "পরিচালনা কমিটি", hash: "#committee" },
    { label: "গ্যালারি", hash: "#gallery" },
    { label: "খবর ও নোটিশ", hash: "#news" },
    { label: "যোগাযোগ", hash: "#contact" }
  ];

  const handleLinkClick = (hash: string, label: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(hash);
    
    // Log Navigation click in GA4
    trackEvent("navigation_click", {
      targetHash: hash,
      linkLabel: label,
      device: window.innerWidth < 768 ? "mobile" : "desktop"
    });

    // Smooth scroll to element
    const element = document.getElementById(hash.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isLinkActive = (hash: string) => {
    return activeHash === hash;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans ${
          isScrolled || activeHash === "#admin"
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3 text-slate-800 border-b border-slate-200"
            : "bg-gradient-to-b from-black/60 to-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Org Name */}
          <button
            onClick={() => handleLinkClick("#home", "Logo Home")}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className={`p-1.5 rounded-xl transition ${
              isScrolled || activeHash === "#admin" ? "bg-brand-teal/10 text-brand-teal" : "bg-white/10 text-white"
            }`}>
              <ShieldCheck size={26} className="group-hover:scale-105 transition duration-300" />
            </div>
            <div>
              <span className="block font-bold text-base md:text-lg tracking-tight font-sans text-brand-teal dynamic-logo-text">
                {orgName || "Success সমবায় সমিতি"}
              </span>
              <span className={`block text-[10px] uppercase tracking-widest ${
                isScrolled || activeHash === "#admin" ? "text-slate-400" : "text-white/80"
              }`}>
                Success Group এর সহযোগী
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash, link.label)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer relative ${
                  isLinkActive(link.hash)
                    ? isScrolled || activeHash === "#admin"
                      ? "text-brand-teal bg-brand-teal/10"
                      : "text-white bg-white/20"
                    : isScrolled || activeHash === "#admin"
                    ? "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {isLinkActive(link.hash) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                      isScrolled ? "bg-brand-teal" : "bg-white"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition cursor-pointer ${
                isScrolled || activeHash === "#admin"
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* CSS injection specifically for styling the logo text green if not scrolled, but white if scrolling */}
      <style>{`
        .dynamic-logo-text {
          color: ${isScrolled || activeHash === '#admin' ? '#0F766E' : '#FFFFFF'} !important;
        }
      `}</style>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col p-6 z-50 font-sans overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div>
                  <span className="font-bold text-brand-teal text-base block">Success সমবায়</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">মেনু নেভিগেশন</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-1.5 flex-1">
                {navLinks.map((link) => (
                  <button
                    key={link.hash}
                    onClick={() => handleLinkClick(link.hash, link.label)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                      isLinkActive(link.hash)
                        ? "text-brand-teal bg-brand-teal/10"
                        : "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isLinkActive(link.hash) && <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
