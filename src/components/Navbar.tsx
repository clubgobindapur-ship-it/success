import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ShieldCheck, ChevronDown, Droplet, HeartHandshake, Trophy, Image as ImageIcon, Newspaper } from "lucide-react";
import { trackEvent } from "../utils/analytics";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  orgName: string;
}

export function Navbar({ activePath, onNavigate, orgName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleLinkClick = (path: string, label: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    onNavigate(path);
    
    // Log Navigation click in GA4
    trackEvent("navigation_click", {
      targetPath: path,
      linkLabel: label,
      device: window.innerWidth < 768 ? "mobile" : "desktop"
    });
  };

  const isLinkActive = (path: string) => {
    if (path === "/" || path === "/home") {
      return activePath === "/" || activePath === "/home" || activePath === "";
    }
    const cleanActive = activePath.replace("#", "");
    const cleanPath = path.replace("/", "").replace("#", "");
    return cleanActive === cleanPath || activePath === path || activePath === `/${cleanPath}`;
  };

  const isDropdownGroupActive = (paths: string[]) => {
    return paths.some((p) => isLinkActive(p));
  };

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Group 1: Projects & Social Activities
  const projectGroup = {
    key: "projects",
    label: "প্রকল্প ও কার্যক্রম",
    items: [
      { label: "বিশুদ্ধ পানি প্রকল্প", path: "/water", icon: Droplet, desc: "সুপেয় খাওয়ার পানি প্ল্যান্ট" },
      { label: "সামাজিক কার্যক্রম", path: "/social", icon: HeartHandshake, desc: "ত্রাণ, চিকিৎসা ও সমাজসেবা" },
      { label: "অর্জন ও সম্মাননা", path: "/awards", icon: Trophy, desc: "আমাদের গৌরবময় স্বীকৃতি" }
    ]
  };

  // Group 2: Media & Gallery
  const mediaGroup = {
    key: "media",
    label: "গ্যালারি ও খবর",
    items: [
      { label: "ফটো গ্যালারি", path: "/gallery", icon: ImageIcon, desc: "ছবি ও ভিডিও চিত্রসংগ্রহ" },
      { label: "খবর ও নোটিশ", path: "/news", icon: Newspaper, desc: "জরুরি নোটিশ ও সর্বশেষ সংবাদ" }
    ]
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans ${
          isScrolled || activePath === "/admin"
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 text-slate-800 border-b border-slate-200"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent py-4 md:py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Org Name */}
          <button
            onClick={() => handleLinkClick("/", "Logo Home")}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className={`p-1.5 rounded-xl transition ${
              isScrolled || activePath === "/admin" ? "bg-brand-teal/10 text-brand-teal" : "bg-white/10 text-white"
            }`}>
              <ShieldCheck size={26} className="group-hover:scale-105 transition duration-300" />
            </div>
            <div>
              <span className="block font-bold text-base md:text-lg tracking-tight font-sans text-brand-teal dynamic-logo-text">
                {orgName || "Success সমবায় সমিতি"}
              </span>
              <span className={`block text-[10px] uppercase tracking-widest ${
                isScrolled || activePath === "/admin" ? "text-slate-400" : "text-white/80"
              }`}>
                Success Group এর সহযোগী
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {/* 1. Home */}
            <button
              onClick={() => handleLinkClick("/", "হোম")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer relative ${
                isLinkActive("/")
                  ? isScrolled || activePath === "/admin"
                    ? "text-brand-teal bg-brand-teal/10"
                    : "text-white bg-white/20"
                  : isScrolled || activePath === "/admin"
                  ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              হোম
              {isLinkActive("/") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                    isScrolled ? "bg-brand-teal" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 2. About */}
            <button
              onClick={() => handleLinkClick("/about", "আমাদের সম্পর্কে")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer relative ${
                isLinkActive("/about")
                  ? isScrolled || activePath === "/admin"
                    ? "text-brand-teal bg-brand-teal/10"
                    : "text-white bg-white/20"
                  : isScrolled || activePath === "/admin"
                  ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              আমাদের সম্পর্কে
              {isLinkActive("/about") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                    isScrolled ? "bg-brand-teal" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 3. Services */}
            <button
              onClick={() => handleLinkClick("/services", "সেবা সমূহ")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer relative ${
                isLinkActive("/services")
                  ? isScrolled || activePath === "/admin"
                    ? "text-brand-teal bg-brand-teal/10"
                    : "text-white bg-white/20"
                  : isScrolled || activePath === "/admin"
                  ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              সেবা সমূহ
              {isLinkActive("/services") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                    isScrolled ? "bg-brand-teal" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 4. Dropdown: Projects & Social Activities */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(projectGroup.key)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === projectGroup.key ? null : projectGroup.key)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer flex items-center gap-1 relative ${
                  isDropdownGroupActive(projectGroup.items.map((i) => i.path))
                    ? isScrolled || activePath === "/admin"
                      ? "text-brand-teal bg-brand-teal/10"
                      : "text-white bg-white/20"
                    : isScrolled || activePath === "/admin"
                    ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{projectGroup.label}</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    openDropdown === projectGroup.key ? "rotate-180 text-brand-teal" : ""
                  }`}
                />
                {isDropdownGroupActive(projectGroup.items.map((i) => i.path)) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                      isScrolled ? "bg-brand-teal" : "bg-white"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {openDropdown === projectGroup.key && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 overflow-hidden font-sans text-slate-800"
                  >
                    {projectGroup.items.map((sub) => {
                      const IconComp = sub.icon;
                      const active = isLinkActive(sub.path);
                      return (
                        <button
                          key={sub.path}
                          onClick={() => handleLinkClick(sub.path, sub.label)}
                          className={`w-full text-left p-2.5 rounded-xl transition cursor-pointer flex items-start gap-3 group ${
                            active ? "bg-teal-50 text-teal-800" : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg transition ${
                              active
                                ? "bg-brand-teal text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-brand-teal group-hover:text-white"
                            }`}
                          >
                            <IconComp size={16} />
                          </div>
                          <div>
                            <span className="block text-xs font-bold leading-tight">{sub.label}</span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">{sub.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. Committee */}
            <button
              onClick={() => handleLinkClick("/committee", "পরিচালনা কমিটি")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer relative ${
                isLinkActive("/committee")
                  ? isScrolled || activePath === "/admin"
                    ? "text-brand-teal bg-brand-teal/10"
                    : "text-white bg-white/20"
                  : isScrolled || activePath === "/admin"
                  ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              পরিচালনা কমিটি
              {isLinkActive("/committee") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                    isScrolled ? "bg-brand-teal" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 6. Dropdown: Gallery & News */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(mediaGroup.key)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === mediaGroup.key ? null : mediaGroup.key)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer flex items-center gap-1 relative ${
                  isDropdownGroupActive(mediaGroup.items.map((i) => i.path))
                    ? isScrolled || activePath === "/admin"
                      ? "text-brand-teal bg-brand-teal/10"
                      : "text-white bg-white/20"
                    : isScrolled || activePath === "/admin"
                    ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{mediaGroup.label}</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    openDropdown === mediaGroup.key ? "rotate-180 text-brand-teal" : ""
                  }`}
                />
                {isDropdownGroupActive(mediaGroup.items.map((i) => i.path)) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                      isScrolled ? "bg-brand-teal" : "bg-white"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {openDropdown === mediaGroup.key && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 overflow-hidden font-sans text-slate-800"
                  >
                    {mediaGroup.items.map((sub) => {
                      const IconComp = sub.icon;
                      const active = isLinkActive(sub.path);
                      return (
                        <button
                          key={sub.path}
                          onClick={() => handleLinkClick(sub.path, sub.label)}
                          className={`w-full text-left p-2.5 rounded-xl transition cursor-pointer flex items-start gap-3 group ${
                            active ? "bg-teal-50 text-teal-800" : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg transition ${
                              active
                                ? "bg-brand-teal text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-brand-teal group-hover:text-white"
                            }`}
                          >
                            <IconComp size={16} />
                          </div>
                          <div>
                            <span className="block text-xs font-bold leading-tight">{sub.label}</span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">{sub.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 7. Career */}
            <button
              onClick={() => handleLinkClick("/career", "ক্যারিয়ার")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer relative ${
                isLinkActive("/career")
                  ? isScrolled || activePath === "/admin"
                    ? "text-brand-teal bg-brand-teal/10"
                    : "text-white bg-white/20"
                  : isScrolled || activePath === "/admin"
                  ? "text-slate-700 hover:text-brand-teal hover:bg-slate-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              ক্যারিয়ার
              {isLinkActive("/career") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                    isScrolled ? "bg-brand-teal" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 8. Contact */}
            <button
              onClick={() => handleLinkClick("/contact", "যোগাযোগ")}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
                isScrolled || activePath === "/admin"
                  ? "bg-brand-teal text-white shadow-sm hover:bg-teal-700"
                  : "bg-white text-brand-dark hover:bg-slate-100 shadow-md"
              }`}
            >
              যোগাযোগ
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition cursor-pointer ${
                isScrolled || activePath === "/admin"
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
          color: ${isScrolled || activePath === '/admin' ? '#0F766E' : '#FFFFFF'} !important;
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
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl flex flex-col p-6 z-50 font-sans overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
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
              <div className="flex flex-col gap-1.5 flex-1 text-slate-800">
                <button
                  onClick={() => handleLinkClick("/", "হোম")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isLinkActive("/") ? "text-brand-teal bg-brand-teal/10" : "hover:bg-slate-50"
                  }`}
                >
                  <span>হোম</span>
                </button>

                <button
                  onClick={() => handleLinkClick("/about", "আমাদের সম্পর্কে")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isLinkActive("/about") ? "text-brand-teal bg-brand-teal/10" : "hover:bg-slate-50"
                  }`}
                >
                  <span>আমাদের সম্পর্কে</span>
                </button>

                <button
                  onClick={() => handleLinkClick("/services", "সেবা সমূহ")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isLinkActive("/services") ? "text-brand-teal bg-brand-teal/10" : "hover:bg-slate-50"
                  }`}
                >
                  <span>সেবা সমূহ</span>
                </button>

                {/* Mobile Group: Projects */}
                <div className="bg-slate-50 rounded-2xl p-2 my-1 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1 pb-1 block">
                    প্রকল্প ও কার্যক্রম
                  </span>
                  {projectGroup.items.map((sub) => {
                    const IconC = sub.icon;
                    return (
                      <button
                        key={sub.path}
                        onClick={() => handleLinkClick(sub.path, sub.label)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                          isLinkActive(sub.path) ? "bg-teal-100/70 text-brand-teal font-bold" : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <IconC size={15} className="text-brand-teal" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handleLinkClick("/committee", "পরিচালনা কমিটি")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isLinkActive("/committee") ? "text-brand-teal bg-brand-teal/10" : "hover:bg-slate-50"
                  }`}
                >
                  <span>পরিচালনা কমিটি</span>
                </button>

                {/* Mobile Group: Media */}
                <div className="bg-slate-50 rounded-2xl p-2 my-1 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1 pb-1 block">
                    মিডিয়া ও সংবাদ
                  </span>
                  {mediaGroup.items.map((sub) => {
                    const IconC = sub.icon;
                    return (
                      <button
                        key={sub.path}
                        onClick={() => handleLinkClick(sub.path, sub.label)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                          isLinkActive(sub.path) ? "bg-teal-100/70 text-brand-teal font-bold" : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <IconC size={15} className="text-brand-teal" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handleLinkClick("/career", "ক্যারিয়ার")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isLinkActive("/career") ? "text-brand-teal bg-brand-teal/10" : "hover:bg-slate-50"
                  }`}
                >
                  <span>ক্যারিয়ার ও নিয়োগ</span>
                </button>

                <button
                  onClick={() => handleLinkClick("/contact", "যোগাযোগ")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                    isLinkActive("/contact") ? "text-brand-teal bg-brand-teal/10" : "hover:bg-slate-50"
                  }`}
                >
                  <span>যোগাযোগ</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

