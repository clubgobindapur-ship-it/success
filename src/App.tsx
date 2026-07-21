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
  const [activeHash, setActiveHash] = useState("#home");

  // Core CMS data state
  const [cmsData, setCmsData] = useState<typeof SEED_DATA>({ ...SEED_DATA });

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

    // Firebase Auth subscription (only when auth is available)
    let unsubscribeAuth = () => {};
    if (auth) {
      unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAdminUser(user);
        } else {
          setAdminUser(null);
        }
      });
    }

    // Hash change Router listener
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      setActiveHash(hash);
      
      if (hash === "#admin") {
        setIsAdminRoute(true);
        trackEvent("admin_route_entered", { time: new Date().toISOString() });
      } else {
        setIsAdminRoute(false);
      }
    };

    // Initial check
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    // Initial page view event
    trackEvent("page_view", { page_title: "Home", page_location: window.location.href });

    return () => {
      unsubscribeAuth();
      window.removeEventListener("hashchange", handleHashChange);
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

  // Scroll monitoring to automatically highlight the section currently in view
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
        "contact"
      ];
      const scrollPosition = window.scrollY + 180; // Trigger slightly earlier than the top edge

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveHash(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isAdminRoute]);

  // Logout Admin Handler
  const handleAdminLogout = async () => {
    try {
      if (auth) await signOut(auth);
      setAdminUser(null);
      showToast("success", "লগআউট সম্পন্ন!", "অ্যাডমিন সেশনটি নিরাপদে বন্ধ করা হয়েছে।");
      window.location.hash = "#home";
    } catch (err) {
      showToast("error", "ত্রুটি!", "লগআউট করতে ব্যর্থ হয়েছে।");
    }
  };

  // Nav scroll triggers
  const handleNavigate = (hash: string) => {
    setActiveHash(hash);
    window.location.hash = hash;
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
        activeHash={activeHash}
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
