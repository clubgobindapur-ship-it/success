import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { ToastProvider, useToast } from "./components/Toast";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { WhyChooseUs } from "./sections/WhyChooseUs";
import { Services } from "./sections/Services";
import { WaterSection } from "./sections/WaterSection";
import { SocialActivities } from "./sections/SocialActivities";
import { Awards } from "./sections/Awards";
import { Committee } from "./sections/Committee";
import { StatsSection } from "./sections/StatsSection";
import { GallerySection } from "./sections/GallerySection";
import { NewsSection } from "./sections/NewsSection";
import { CareerSection } from "./sections/CareerSection";
import { FAQ } from "./sections/FAQ";
import { Contact } from "./sections/Contact";
import { AdminLogin } from "./admin/AdminLogin";
import { AdminDashboard } from "./admin/AdminDashboard";
import { getAllContent } from "./firebase/db";
import { SEED_DATA } from "./constants/seedData";
import { trackEvent } from "./utils/analytics";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { Loader2, ShieldCheck, HelpCircle } from "lucide-react";

function MainAppContent() {
  const { showToast } = useToast();

  // Root States
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePath, setActivePath] = useState("/");

  // Core CMS data state
  const [cmsData, setCmsData] = useState<typeof SEED_DATA>({ ...SEED_DATA });

  // Helper to scroll smoothly to a section element
  const scrollToSection = (pathOrSection: string, smooth = true) => {
    let sectionId = pathOrSection;
    if (sectionId.startsWith("/")) sectionId = sectionId.slice(1);
    if (sectionId.endsWith("/")) sectionId = sectionId.slice(0, -1);
    sectionId = sectionId.replace("#", "");

    if (!sectionId || sectionId === "home") sectionId = "home";
    if (sectionId === "jobs") sectionId = "career";
    if (sectionId === "faqs") sectionId = "faq";

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  };

  // Process current location (path or hash)
  const processRoute = (scroll = false) => {
    let currentPath = window.location.pathname;

    // Convert legacy hash (e.g., /#career or /#admin) to clean pathname (/career or /admin)
    if (window.location.hash) {
      const hashSection = window.location.hash.replace("#", "");
      if (hashSection) {
        currentPath = `/${hashSection}`;
        window.history.replaceState({}, "", currentPath);
      }
    }

    if (!currentPath || currentPath === "") currentPath = "/";
    setActivePath(currentPath);

    if (currentPath === "/admin" || currentPath === "/admin/") {
      setIsAdminRoute(true);
      trackEvent("admin_route_entered", { time: new Date().toISOString() });
    } else {
      setIsAdminRoute(false);
      if (scroll && !isLoading) {
        setTimeout(() => scrollToSection(currentPath, false), 100);
      }
    }
  };

  // When initial data loading finishes, scroll to the requested URL section
  useEffect(() => {
    if (!isLoading && !isAdminRoute) {
      const currentPath = window.location.pathname;
      if (currentPath && currentPath !== "/" && currentPath !== "/home") {
        setTimeout(() => scrollToSection(currentPath, false), 150);
      }
    }
  }, [isLoading, isAdminRoute]);

  // Load Data from Firestore on startup
  const fetchCMSData = async () => {
    try {
      const data = await getAllContent();
      
      // If Firestore data exists, merge and update state
      if (data && Object.keys(data).length > 0) {
        setCmsData((prev) => ({
          ...prev,
          hero: data.hero || prev.hero,
          about: data.about || prev.about,
          whyChooseUs: data.whyChooseUs || prev.whyChooseUs,
          services: data.services || prev.services,
          water: data.water || prev.water,
          social: data.social || prev.social,
          awards: data.awards || prev.awards,
          committee: data.committee || prev.committee,
          stats: data.stats || prev.stats,
          gallery: data.gallery || prev.gallery,
          news: data.news || prev.news,
          faqs: data.faqs || prev.faqs,
          jobs: data.jobs || prev.jobs,
          contact: data.contact || prev.contact,
          seo: data.seo || prev.seo
        }));
      }
    } catch (err) {
      console.warn("Firestore data load warning. Falling back to local seed assets:", err);
      // Fallback is already loaded as default state in SEED_DATA
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCMSData();

    // Firebase Auth subscription
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
    });

    // Listen to browser Back/Forward navigation
    const handlePopState = () => {
      processRoute(true);
    };

    // Initial route check on page load
    processRoute(true);
    window.addEventListener("popstate", handlePopState);

    // Initial page view event
    trackEvent("page_view", { page_title: "Home", page_location: window.location.href });

    return () => {
      unsubscribeAuth();
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Update Dynamic SEO titles in document
  useEffect(() => {
    if (isAdminRoute) {
      document.title = "অ্যাডমিন প্যানেল | Success সমবায় সমিতি";
    } else {
      document.title = cmsData.seo.title || "Success সমবায় সমিতি লিমিটেড";
      
      // Set description dynamically
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", cmsData.seo.description);
      }
    }
  }, [isAdminRoute, cmsData.seo]);

  // Scroll monitoring (ScrollSpy) to dynamically update clean URL as user scrolls
  useEffect(() => {
    if (isAdminRoute) return;

    const handleScrollSpy = () => {
      const sections = [
        "home",
        "about",
        "services",
        "water",
        "social",
        "awards",
        "committee",
        "gallery",
        "news",
        "career",
        "contact"
      ];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const targetPath = sectionId === "home" ? "/" : `/${sectionId}`;
            if (window.location.pathname !== targetPath && window.location.pathname !== "/admin") {
              window.history.replaceState({}, "", targetPath);
              setActivePath(targetPath);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isAdminRoute]);

  // Logout Admin Handler
  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
      setAdminUser(null);
      showToast("success", "লগআউট সম্পন্ন!", "অ্যাডমিন সেশনটি নিরাপদে বন্ধ করা হয়েছে।");
      window.history.pushState({}, "", "/");
      setIsAdminRoute(false);
      setActivePath("/");
    } catch (err) {
      showToast("error", "ত্রুটি!", "লগআউট করতে ব্যর্থ হয়েছে।");
    }
  };

  // Nav click triggers
  const handleNavigate = (pathOrHash: string) => {
    let cleanPath = pathOrHash.startsWith("#") ? pathOrHash.replace("#", "/") : pathOrHash;
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
    if (cleanPath === "/home") cleanPath = "/";

    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, "", cleanPath);
    }
    setActivePath(cleanPath);

    if (cleanPath === "/admin" || cleanPath === "/admin/") {
      setIsAdminRoute(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsAdminRoute(false);
      scrollToSection(cleanPath, true);
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center font-sans px-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-brand-teal/20 blur-xl animate-pulse" />
          <Loader2 className="w-16 h-16 animate-spin text-brand-teal relative z-10" />
        </div>
        <h2 className="text-xl font-bold text-white mt-6 tracking-wide">Success সমবায় সমিতি</h2>
        <p className="text-slate-400 text-xs mt-1.5 font-sans">ডিজিটাল ওয়েব পোর্টাল লোড হচ্ছে, দয়া করে অপেক্ষা করুন...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header / Nav */}
      <Navbar
        activePath={activePath}
        onNavigate={handleNavigate}
        orgName="Success সমবায় সমিতি"
      />

      {/* Main Container Views */}
      <main className="flex-grow">
        {isAdminRoute ? (
          // Admin CMS Route Layer
          adminUser ? (
            <AdminDashboard
              isDemo={false}
              initialState={cmsData}
              onLogout={handleAdminLogout}
              onRefreshData={fetchCMSData}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={(user) => setAdminUser(user)}
            />
          )
        ) : (
          // Public Website Content Blocks
          <div className="flex flex-col">
            {/* 1. Hero */}
            <Hero
              content={cmsData.hero}
              onNavigate={handleNavigate}
              phone={cmsData.contact.phone}
            />

            {/* 2. Stats strip */}
            <StatsSection stats={cmsData.stats} />

            {/* 3. About Section */}
            <About content={cmsData.about} />

            {/* 4. Why Choose Us */}
            <WhyChooseUs items={cmsData.whyChooseUs} />

            {/* 5. Services Grid */}
            <Services items={cmsData.services} />

            {/* 6. Success Pure Water Initiative */}
            <WaterSection content={cmsData.water} />

            {/* 7. Social Activities */}
            <SocialActivities items={cmsData.social} />

            {/* 7.5. Awards and Achievements */}
            <Awards items={cmsData.awards} />

            {/* 8. Executive Committee Grid */}
            <Committee members={cmsData.committee} />

            {/* 9. Photo Gallery with category Masonry */}
            <GallerySection items={cmsData.gallery} />

            {/* 10. News & Board notices */}
            <NewsSection items={cmsData.news} />

            {/* 10.5. Career & Job Openings */}
            <CareerSection jobs={cmsData.jobs} />

            {/* 11. Frequently Asked Questions Accordions */}
            <FAQ faqs={cmsData.faqs} />

            {/* 12. Contact address and fully-interactive Form */}
            <Contact contactInfo={cmsData.contact} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        contactInfo={cmsData.contact}
        orgName="Success সমবায় সমিতি"
      />

      {/* Floating Call/WhatsApp Shortcuts */}
      <FloatingActions contactInfo={cmsData.contact} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainAppContent />
    </ToastProvider>
  );
}
