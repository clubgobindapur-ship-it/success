import React, { useState, useEffect } from "react";
import {
  Save,
  Database,
  Plus,
  Trash,
  Edit,
  Check,
  X,
  Search,
  MessageSquare,
  Settings,
  Layers,
  Droplet,
  Users,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  TrendingUp,
  LogOut,
  Sparkles,
  Loader2,
  Lock,
  Eye,
  Phone,
  Menu,
  CheckCircle,
  ExternalLink,
  Trophy
} from "lucide-react";
import { useToast } from "../components/Toast";
import { trackEvent } from "../utils/analytics";
import * as dbService from "../firebase/db";
import {
  HeroContent,
  AboutContent,
  WhyChooseUsItem,
  ServiceItem,
  WaterContent,
  SocialActivityItem,
  CommitteeMember,
  StatItem,
  GalleryItem,
  NewsItem,
  TestimonialItem,
  FAQItem,
  ContactInfo,
  SEOMetadata,
  ContactMessage,
  AwardItem
} from "../types";

interface AdminDashboardProps {
  isDemo: boolean;
  onLogout: () => void;
  // Refresh main page callback so we can re-fetch
  onRefreshData: () => void;
  // Local active copy of current landing page state so they can edit it immediately
  initialState: {
    hero: HeroContent;
    about: AboutContent;
    whyChooseUs: WhyChooseUsItem[];
    services: ServiceItem[];
    water: WaterContent;
    social: SocialActivityItem[];
    committee: CommitteeMember[];
    stats: StatItem[];
    gallery: GalleryItem[];
    news: NewsItem[];
    testimonials: TestimonialItem[];
    faqs: FAQItem[];
    awards: AwardItem[];
    contact: ContactInfo;
    seo: SEOMetadata;
  };
}

type AdminTab = "hero" | "about" | "services" | "water" | "committee" | "gallery" | "news" | "faqs" | "contact" | "inquiries" | "awards";

export function AdminDashboard({ isDemo, onLogout, onRefreshData, initialState }: AdminDashboardProps) {
  const { showToast } = useToast();
  
  // State variables for all sections
  const [activeTab, setActiveTab] = useState<AdminTab>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Core CMS state copies
  const [hero, setHero] = useState<HeroContent>({ ...initialState.hero });
  const [about, setAbout] = useState<AboutContent>({ ...initialState.about });
  const [water, setWater] = useState<WaterContent>({ ...initialState.water });
  const [contact, setContact] = useState<ContactInfo>({ ...initialState.contact });
  const [seo, setSeo] = useState<SEOMetadata>({ ...initialState.seo });

  // List arrays
  const [services, setServices] = useState<ServiceItem[]>([...initialState.services]);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>([...initialState.whyChooseUs]);
  const [social, setSocial] = useState<SocialActivityItem[]>([...initialState.social]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([...initialState.committee]);
  const [stats, setStats] = useState<StatItem[]>([...initialState.stats]);
  const [gallery, setGallery] = useState<GalleryItem[]>([...initialState.gallery]);
  const [news, setNews] = useState<NewsItem[]>([...initialState.news]);
  const [faqs, setFaqs] = useState<FAQItem[]>([...initialState.faqs]);
  const [awards, setAwards] = useState<AwardItem[]>([...(initialState.awards || [])]);

  // Contact messages loaded from DB
  const [inquiries, setInquiries] = useState<ContactMessage[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Search queries
  const [searchQuery, setSearchQuery] = useState("");

  // Sub-editors helper states (for adding/editing lists)
  const [editService, setEditService] = useState<Partial<ServiceItem> | null>(null);
  const [editWhy, setEditWhy] = useState<Partial<WhyChooseUsItem> | null>(null);
  const [editSocial, setEditSocial] = useState<Partial<SocialActivityItem> | null>(null);
  const [editCommittee, setEditCommittee] = useState<Partial<CommitteeMember> | null>(null);
  const [editGallery, setEditGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editNews, setEditNews] = useState<Partial<NewsItem> | null>(null);
  const [editFAQ, setEditFAQ] = useState<Partial<FAQItem> | null>(null);
  const [editStat, setEditStat] = useState<Partial<StatItem> | null>(null);
  const [editAward, setEditAward] = useState<Partial<AwardItem> | null>(null);

  // Load live contact inquiries from firestore
  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const msgs = await dbService.getContactMessages();
      setInquiries(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (activeTab === "inquiries") {
      fetchInquiries();
    }
  }, [activeTab]);

  // ----------------------------------------------------
  // DATA SEEDING ACTION
  // ----------------------------------------------------
  const handleSeedDatabase = async () => {
    const confirmSeed = window.confirm("আপনি কি নিশ্চিতভাবে ডেমো ডাটাবেজ সীড করতে চান? এটি আপনার বর্তমান Firestore ডাটা ওভাররাইট করবে।");
    if (!confirmSeed) return;

    setIsSeeding(true);
    trackEvent("admin_seed_db_click", { isDemo });
    try {
      if (!isDemo) {
        await dbService.initializeDatabaseWithSeedData();
      }
      showToast("success", "সীড সম্পন্ন!", "ডাটাবেজে সফলভাবে বাংলা ডেমো ডাটা সীড করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ত্রুটি!", "সীড করতে ব্যর্থ হয়েছে। ফায়ারস্টোর কানেকশন বা সিকিউরিটি রুলস চেক করুন।");
    } finally {
      setIsSeeding(false);
    }
  };

  // ----------------------------------------------------
  // SINGLETON SAVE ACTIONS
  // ----------------------------------------------------
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (!isDemo) {
        await dbService.saveHeroContent(hero);
        await dbService.saveSEOMetadata(seo);
      }
      showToast("success", "সংরক্ষিত!", "হিরো সেকশন এবং এসইও মেটাডাটা সফলভাবে আপডেট হয়েছে।");
      trackEvent("admin_save_hero", { headline: hero.headline });
      onRefreshData();
    } catch (err) {
      showToast("error", "ত্রুটি!", "তথ্য সংরক্ষণ করতে ব্যর্থ হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (!isDemo) {
        await dbService.saveAboutContent(about);
      }
      showToast("success", "সংরক্ষিত!", "আমাদের পরিচিতি তথ্য সফলভাবে আপডেট হয়েছে।");
      trackEvent("admin_save_about", { valuesCount: about.values.length });
      onRefreshData();
    } catch (err) {
      showToast("error", "ত্রুটি!", "তথ্য সংরক্ষণ করতে ব্যর্থ হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveWater = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (!isDemo) {
        await dbService.saveWaterContent(water);
      }
      showToast("success", "সংরক্ষিত!", "বিশুদ্ধ পানি প্রকল্পের তথ্য সফলভাবে আপডেট হয়েছে।");
      trackEvent("admin_save_water", { title: water.title });
      onRefreshData();
    } catch (err) {
      showToast("error", "ত্রুটি!", "তথ্য সংরক্ষণ করতে ব্যর্থ হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (!isDemo) {
        await dbService.saveContactInfo(contact);
      }
      showToast("success", "সংরক্ষিত!", "যোগাযোগের ঠিকানা ও বিস্তারিত সফলভাবে আপডেট হয়েছে।");
      trackEvent("admin_save_contact", { phone: contact.phone });
      onRefreshData();
    } catch (err) {
      showToast("error", "ত্রুটি!", "তথ্য সংরক্ষণ করতে ব্যর্থ হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  // ----------------------------------------------------
  // LIST SAVING CRUD HANDLERS
  // ----------------------------------------------------

  // 1. SERVICES
  const handleSaveService = async () => {
    if (!editService?.title || !editService?.description) return;
    const id = editService.id || `srv-${Date.now()}`;
    const newSrv: ServiceItem = {
      id,
      title: editService.title,
      description: editService.description,
      iconName: editService.iconName || "FolderHeart",
      order: editService.order !== undefined ? Number(editService.order) : services.length + 1
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.SERVICES, newSrv);
      setServices((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newSrv].sort((a, b) => a.order - b.order);
      });
      setEditService(null);
      showToast("success", "সেবা সংরক্ষিত!", "সেবা বিবরণীটি সফলভাবে সংরক্ষণ করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সেবা সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই সেবাটি ডিলিট করতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.SERVICES, id);
      setServices((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মুছে ফেলা হয়েছে!", "সেবা বিবরণীটি মুছে ফেলা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // 2. COMMITTEE
  const handleSaveCommittee = async () => {
    if (!editCommittee?.name || !editCommittee?.position || !editCommittee?.phone || !editCommittee?.email) return;
    const id = editCommittee.id || `mem-${Date.now()}`;
    const newMem: CommitteeMember = {
      id,
      name: editCommittee.name,
      position: editCommittee.position,
      photoUrl: editCommittee.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      phone: editCommittee.phone,
      email: editCommittee.email,
      bio: editCommittee.bio || "",
      order: editCommittee.order !== undefined ? Number(editCommittee.order) : committee.length + 1
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.EXECUTIVE_COMMITTEE, newMem);
      setCommittee((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newMem].sort((a, b) => a.order - b.order);
      });
      setEditCommittee(null);
      showToast("success", "সদস্য সংরক্ষিত!", "পরিচালনা কমিটির সদস্য প্রোফাইল আপডেট করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteCommittee = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই প্রোফাইলটি ডিলিট করতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.EXECUTIVE_COMMITTEE, id);
      setCommittee((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মুছে ফেলা হয়েছে!", "প্রোফাইলটি সফলভাবে মুছে ফেলা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // 3. GALLERY
  const handleSaveGallery = async () => {
    if (!editGallery?.title || !editGallery?.imageUrl) {
      showToast("error", "তথ্য অসম্পূর্ণ!", "দয়া করে ছবির শিরোনাম এবং ছবির লিঙ্ক (URL) উভয়ই প্রদান করুন।");
      return;
    }
    const id = editGallery.id || `gal-${Date.now()}`;
    const newGal: GalleryItem = {
      id,
      title: editGallery.title,
      imageUrl: editGallery.imageUrl,
      category: editGallery.category || "social",
      date: editGallery.date || new Date().toISOString().split("T")[0],
      order: editGallery.order !== undefined ? Number(editGallery.order) : gallery.length + 1
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.GALLERY, newGal);
      setGallery((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newGal].sort((a, b) => a.order - b.order);
      });
      setEditGallery(null);
      showToast("success", "ছবি সংরক্ষিত!", "গ্যালারি ছবি এবং বিবরণ আপডেট করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে গ্যালারির এই ছবিটি মুছে ফেলতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.GALLERY, id);
      setGallery((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "ছবি মুছে ফেলা হয়েছে!", "ছবিটি সফলভাবে ডিলিট করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // 4. NEWS & NOTICES
  const handleSaveNews = async () => {
    if (!editNews?.title || !editNews?.summary || !editNews?.content) return;
    const id = editNews.id || `news-${Date.now()}`;
    const newArt: NewsItem = {
      id,
      title: editNews.title,
      summary: editNews.summary,
      content: editNews.content,
      imageUrl: editNews.imageUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      date: editNews.date || new Date().toLocaleDateString("bn-BD"),
      isPublished: editNews.isPublished !== undefined ? editNews.isPublished : true
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.NEWS, newArt);
      setNews((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newArt];
      });
      setEditNews(null);
      showToast("success", "খবর সংরক্ষিত!", "খবর বা নোটিশটি সফলভাবে আপডেট করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই খবরটি ডিলিট করতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.NEWS, id);
      setNews((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মুছে ফেলা হয়েছে!", "খবরটি সফলভাবে নোটিশবোর্ড থেকে মুছে ফেলা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  const togglePublishNews = async (item: NewsItem) => {
    const updated = { ...item, isPublished: !item.isPublished };
    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.NEWS, updated);
      setNews((prev) => prev.map((x) => (x.id === item.id ? updated : x)));
      showToast("success", updated.isPublished ? "প্রকাশিত!" : "অপ্রকাশিত!", `খবরটি সফলভাবে ${updated.isPublished ? "পাবলিশ" : "আনপাবলিশ"} করা হয়েছে।`);
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "পাবলিশ স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে।");
    }
  };

  // 5. FAQS
  const handleSaveFAQ = async () => {
    if (!editFAQ?.question || !editFAQ?.answer) return;
    const id = editFAQ.id || `faq-${Date.now()}`;
    const newFaq: FAQItem = {
      id,
      question: editFAQ.question,
      answer: editFAQ.answer,
      order: editFAQ.order !== undefined ? Number(editFAQ.order) : faqs.length + 1
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.FAQS, newFaq);
      setFaqs((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newFaq].sort((a, b) => a.order - b.order);
      });
      setEditFAQ(null);
      showToast("success", "প্রশ্ন সংরক্ষিত!", "জিজ্ঞাসার উত্তর সফলভাবে সংরক্ষণ করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই জিজ্ঞাসাটি ডিলিট করতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.FAQS, id);
      setFaqs((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মুছে ফেলা হয়েছে!", "জিজ্ঞাসাটি মুছে ফেলা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // 6. STATISTICS
  const handleSaveStat = async () => {
    if (!editStat?.value || !editStat?.label) return;
    const id = editStat.id || `stat-${Date.now()}`;
    const newStat: StatItem = {
      id,
      value: editStat.value,
      label: editStat.label,
      iconName: editStat.iconName || "Calendar",
      order: editStat.order !== undefined ? Number(editStat.order) : stats.length + 1
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.STATISTICS, newStat);
      setStats((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newStat].sort((a, b) => a.order - b.order);
      });
      setEditStat(null);
      showToast("success", "পরিসংখ্যান সংরক্ষিত!", "পরিসংখ্যান কাউন্টারটি সংরক্ষণ করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই কাউন্টারটি ডিলিট করতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.STATISTICS, id);
      setStats((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মুছে ফেলা হয়েছে!", "কাউন্টারটি মুছে ফেলা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // 7. AWARDS & ACHIEVEMENTS
  const handleSaveAward = async () => {
    if (!editAward?.title || !editAward?.description || !editAward?.authority) return;
    const id = editAward.id || `award-${Date.now()}`;
    const newAward: AwardItem = {
      id,
      title: editAward.title,
      description: editAward.description,
      imageUrl: editAward.imageUrl || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
      date: editAward.date || new Date().toISOString().split("T")[0],
      authority: editAward.authority,
      order: editAward.order !== undefined ? Number(editAward.order) : awards.length + 1
    };

    try {
      if (!isDemo) await dbService.saveListItem(dbService.COLLECTIONS.AWARDS, newAward);
      setAwards((prev) => {
        const filtered = prev.filter((x) => x.id !== id);
        return [...filtered, newAward].sort((a, b) => a.order - b.order);
      });
      setEditAward(null);
      showToast("success", "সম্মাননা সংরক্ষিত!", "অর্জিত সম্মাননা ও পুরস্কারের বিবরণটি সফলভাবে সংরক্ষণ করা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  const handleDeleteAward = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই সম্মাননাটি মুছে ফেলতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteListItem(dbService.COLLECTIONS.AWARDS, id);
      setAwards((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মুছে ফেলা হয়েছে!", "সম্মাননাটি সফলভাবে তালিকা থেকে মুছে ফেলা হয়েছে।");
      onRefreshData();
    } catch (err) {
      showToast("error", "ব্যর্থ!", "মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  // ----------------------------------------------------
  // INQUIRIES WORKFLOWS
  // ----------------------------------------------------
  const handleToggleInquiryStatus = async (msg: ContactMessage, newStatus: "new" | "read" | "replied") => {
    try {
      if (!isDemo) await dbService.updateContactMessageStatus(msg.id, newStatus);
      setInquiries((prev) =>
        prev.map((x) => (x.id === msg.id ? { ...x, status: newStatus } : x))
      );
      showToast("success", "স্ট্যাটাস পরিবর্তিত!", `মেসেজের স্ট্যাটাস আপডেট করা হয়েছে।`);
    } catch (err) {
      showToast("error", "ব্যর্থ!", "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে।");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই ইনকোয়ারি মেসেজটি ডিলিট করতে চান?")) return;
    try {
      if (!isDemo) await dbService.deleteContactMessage(id);
      setInquiries((prev) => prev.filter((x) => x.id !== id));
      showToast("success", "মেসেজ ডিলিট হয়েছে!", "ইনকোয়ারি মেসেজটি ডাটাবেজ থেকে মুছে ফেলা হয়েছে।");
    } catch (err) {
      showToast("error", "ব্যর্থ!", "ডিলিট ব্যর্থ হয়েছে।");
    }
  };

  // Search filtering logic
  const filteredServices = services.filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCommittee = committee.filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGallery = gallery.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredNews = news.filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredInquiries = inquiries.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.message.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAwards = awards.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.authority.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Controls Panel */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
          <div className="text-center md:text-left z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">অ্যাডমিন কন্ট্রোল সেন্টার</span>
              {isDemo ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase border border-amber-500/20 animate-pulse flex items-center gap-1">
                  <Sparkles size={10} /> ডেমো অ্যাডমিন মোড
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle size={10} /> ফায়ারবেস কানেক্টেড
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 font-sans tracking-tight">
              Success সমবায় CMS ড্যাশবোর্ড
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 font-sans leading-relaxed">
              ওয়েবসাইটের হিরো ইমেজ, পরিচিতি কার্ড, সমবায় সেবামূলক কার্যক্রম, খবর, ফটো গ্যালারি ও জিজ্ঞাসাবোর্ড এখান থেকে সরাসরি এডিট করুন।
            </p>
          </div>

          {/* Seeding & Sign Out Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 z-10">
            {/* Quick home view link */}
            <a
              href="#home"
              onClick={() => onRefreshData()}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>ওয়েবসাইট দেখুন</span>
            </a>

            {/* GRAND SEED BUTTON */}
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:bg-slate-700"
              title="ডাটাবেজ প্রথমবার চালুর জন্য ডেমো ডাটা দিয়ে সিড করুন"
            >
              {isSeeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database size={14} />}
              <span>ডাটাবেজ সীড করুন</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={14} />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* Demo Warning alert bar */}
        {isDemo && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl mb-8 text-xs leading-relaxed flex gap-3 items-start">
            <Lock className="text-amber-600 shrink-0 mt-0.5" size={16} />
            <div>
              <p className="font-bold">আপনি বর্তমানে ডেমো অ্যাডমিন মোডে আছেন!</p>
              <p className="mt-0.5">এখানে আপনি যেকোনো ফিল্ড ও ডাটা পরিবর্তন, সার্চ অথবা ডিলিট করে টেস্ট করতে পারেন এবং পরিবর্তনগুলো তাৎক্ষণিকভাবে উপরের "ওয়েবসাইট দেখুন" লিংকে ক্লিক করে হোমপেইজে প্রিভিউ করতে পারবেন। তবে এই পরিবর্তনগুলো আপনার ফায়ারবেস ক্লাউড ডাটাবেজে স্থায়ীভাবে সেভ হবে না। স্থায়ীভাবে সংরক্ষণ করতে উপরের "অ্যাডমিন প্রোফাইল সক্রিয়করণ গাইড" অনুযায়ী ইমেইল অ্যাকাউন্ট সেটআপ করে লগইন করুন।</p>
            </div>
          </div>
        )}

        {/* Layout: Sidebar + main form editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side navigation rail */}
          <div className="lg:col-span-3 flex flex-col gap-2 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <span className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">এডিটর সেকশনসমূহ</span>
            
            <button
              onClick={() => { setActiveTab("hero"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "hero" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Settings size={16} />
              <span>হিরো ও এসইও মেটা</span>
            </button>

            <button
              onClick={() => { setActiveTab("about"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "about" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Layers size={16} />
              <span>পরিচিতি ও লক্ষ্য</span>
            </button>

            <button
              onClick={() => { setActiveTab("services"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "services" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <TrendingUp size={16} />
              <span>সেবা ও আমাদের কেন</span>
            </button>

            <button
              onClick={() => { setActiveTab("water"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "water" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Droplet size={16} />
              <span>বিশুদ্ধ পানি প্রকল্প</span>
            </button>

            <button
              onClick={() => { setActiveTab("committee"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "committee" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Users size={16} />
              <span>পরিচালনা কমিটি</span>
            </button>

            <button
              onClick={() => { setActiveTab("gallery"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "gallery" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <ImageIcon size={16} />
              <span>ফটো গ্যালারি</span>
            </button>

            <button
              onClick={() => { setActiveTab("news"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "news" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <FileText size={16} />
              <span>খবর ও নোটিশবোর্ড</span>
            </button>

            <button
              onClick={() => { setActiveTab("awards"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "awards" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Trophy size={16} />
              <span>অর্জন ও সম্মাননা</span>
            </button>

            <button
              onClick={() => { setActiveTab("faqs"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "faqs" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <HelpCircle size={16} />
              <span>জিজ্ঞাসা ও পরিসংখ্যান</span>
            </button>

            <button
              onClick={() => { setActiveTab("contact"); setSearchQuery(""); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition cursor-pointer ${
                activeTab === "contact" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Phone size={16} />
              <span>যোগাযোগের ঠিকানা</span>
            </button>

            <div className="border-t border-slate-100 my-2 pt-2">
              <button
                onClick={() => { setActiveTab("inquiries"); setSearchQuery(""); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === "inquiries" ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} />
                  <span>যোগাযোগের বার্তা</span>
                </div>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Inbound</span>
              </button>
            </div>
          </div>

          {/* Main Editing Workplace panel */}
          <div className="lg:col-span-9 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[500px]">
            
            {/* 1. HERO TAB */}
            {activeTab === "hero" && (
              <form onSubmit={handleSaveHero} className="flex flex-col gap-6">
                <h2 className="text-lg font-bold border-b pb-3 mb-2 flex items-center gap-2 text-slate-800">
                  <Settings size={18} className="text-teal-600" />
                  <span>হিরো সেকশন ও এসইও এডিটর</span>
                </h2>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">প্রধান হেডিং (Headline)</label>
                    <input
                      type="text"
                      value={hero.headline}
                      onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">উপ-হেডিং (Subheadline)</label>
                    <textarea
                      value={hero.subheadline}
                      rows={3}
                      onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">সি-টি-এ বোতাম ১ টেক্সট</label>
                      <input
                        type="text"
                        value={hero.ctaText1}
                        onChange={(e) => setHero({ ...hero, ctaText1: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">সি-টি-এ বোতাম ২ টেক্সট</label>
                      <input
                        type="text"
                        value={hero.ctaText2}
                        onChange={(e) => setHero({ ...hero, ctaText2: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">হিরো ব্যাকগ্রাউন্ড ইমেজ URL</label>
                    <input
                      type="text"
                      value={hero.bgImageUrl}
                      onChange={(e) => setHero({ ...hero, bgImageUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-teal-600"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">অনলাইন থেকে যেকোনো ছবির লিংক কপি করে বসাতে পারেন।</span>
                  </div>

                  <div className="border-t pt-5 mt-3">
                    <h3 className="font-bold text-sm text-slate-700 mb-4 uppercase tracking-wider">গুগল এসইও ও মেটাডাটা সেটিংস</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">মেটা টাইটেল (Meta Title)</label>
                        <input
                          type="text"
                          value={seo.title}
                          onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">মেটা ডেসক্রিপশন (Meta Description)</label>
                        <textarea
                          value={seo.description}
                          rows={2}
                          onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">মেটা কি-ওয়ার্ডস (কমা দিয়ে সাজানো)</label>
                        <input
                          type="text"
                          value={seo.keywords}
                          onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl self-end transition flex items-center gap-2 cursor-pointer disabled:bg-slate-300"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                  <span>হিরো ও এসইও সেভ করুন</span>
                </button>
              </form>
            )}

            {/* 2. ABOUT TAB */}
            {activeTab === "about" && (
              <form onSubmit={handleSaveAbout} className="flex flex-col gap-6">
                <h2 className="text-lg font-bold border-b pb-3 mb-2 flex items-center gap-2 text-slate-800">
                  <Layers size={18} className="text-teal-600" />
                  <span>পরিচিতি, লক্ষ্য ও মূল্যবোধ এডিটর</span>
                </h2>

                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">সমিতি পরিচিতি ভূমিকা (Intro)</label>
                    <textarea
                      value={about.intro}
                      rows={4}
                      onChange={(e) => setAbout({ ...about, intro: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">আমাদের লক্ষ্য (Mission)</label>
                      <textarea
                        value={about.mission}
                        rows={4}
                        onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">আমাদের উদ্দেশ্য (Vision)</label>
                      <textarea
                        value={about.vision}
                        rows={4}
                        onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-teal-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">সমিতির মূল মূল্যবোধসমূহ (Our Values)</label>
                    <div className="flex flex-col gap-3 mb-3">
                      {about.values.map((val, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="w-8 h-10 bg-slate-100 text-slate-500 font-bold text-xs rounded-xl flex items-center justify-center shrink-0">{idx + 1}</span>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => {
                              const copy = [...about.values];
                              copy[idx] = e.target.value;
                              setAbout({ ...about, values: copy });
                            }}
                            placeholder={`মূল্যবোধ #${idx + 1}`}
                            className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs sm:text-sm focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = about.values.filter((_, i) => i !== idx);
                              setAbout({ ...about, values: copy });
                            }}
                            className="p-2.5 hover:bg-rose-50 text-rose-500 rounded-xl border border-slate-200 hover:border-rose-200 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAbout({ ...about, values: [...about.values, ""] });
                      }}
                      className="px-3.5 py-2 rounded-xl border-2 border-dashed border-teal-500 text-teal-600 hover:bg-teal-50 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>নতুন মূল্যবোধ যোগ করুন</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl self-end transition flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                  <span>পরিচিতি তথ্য সেভ করুন</span>
                </button>
              </form>
            )}

            {/* 3. SERVICES TAB */}
            {activeTab === "services" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <TrendingUp size={18} className="text-teal-600" />
                    <span>সমিতি সেবা ও বৈচিত্র্য ব্যবস্থাপনা</span>
                  </h2>
                  <button
                    onClick={() => setEditService({})}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>নতুন সেবা যোগ করুন</span>
                  </button>
                </div>

                {/* Sub-Editor Form (Inline Popup) */}
                {editService && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      <span>{editService.id ? "সেবা বিবরণী এডিট করুন" : "নতুন সমবায় সেবা ফর্ম"}</span>
                      <button onClick={() => setEditService(null)} className="text-slate-400 hover:text-slate-600">
                        <X size={16} />
                      </button>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সেবার শিরোনাম (বাংলায়)</label>
                        <input
                          type="text"
                          value={editService.title || ""}
                          onChange={(e) => setEditService({ ...editService, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ক্রমি নম্বর (সাজানোর জন্য)</label>
                        <input
                          type="number"
                          value={editService.order || ""}
                          onChange={(e) => setEditService({ ...editService, order: Number(e.target.value) })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">আইকন নাম (Lucide Icon)</label>
                      <input
                        type="text"
                        value={editService.iconName || ""}
                        onChange={(e) => setEditService({ ...editService, iconName: e.target.value })}
                        placeholder="যেমন: PiggyBank, Sprout, Users"
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সেবার বিস্তারিত বিবরণ</label>
                      <textarea
                        value={editService.description || ""}
                        rows={3}
                        onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => setEditService(null)} className="px-4 py-2 border rounded-xl text-xs">বাতিল</button>
                      <button onClick={handleSaveService} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold">সংরক্ষণ করুন</button>
                    </div>
                  </div>
                )}

                {/* Search / List Grid Table */}
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="সেবা খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                <div className="overflow-x-auto border rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-4 w-12 text-center">ক্রমিক</th>
                        <th className="p-4">সেবার নাম</th>
                        <th className="p-4">আইকন</th>
                        <th className="p-4">বিবরণ</th>
                        <th className="p-4 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredServices.map((srv, idx) => (
                        <tr key={srv.id} className="hover:bg-slate-50/50">
                          <td className="p-4 text-center font-bold text-slate-500">{srv.order || idx + 1}</td>
                          <td className="p-4 font-bold text-slate-900">{srv.title}</td>
                          <td className="p-4"><span className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg text-[10px] font-mono">{srv.iconName}</span></td>
                          <td className="p-4 text-slate-500 max-w-xs truncate">{srv.description}</td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => setEditService(srv)} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 cursor-pointer" title="সম্পাদনা"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteService(srv.id)} className="p-1.5 hover:bg-rose-50 rounded text-rose-500 cursor-pointer" title="মুছে ফেলুন"><Trash size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. WATER TAB */}
            {activeTab === "water" && (
              <form onSubmit={handleSaveWater} className="flex flex-col gap-6">
                <h2 className="text-lg font-bold border-b pb-3 mb-2 flex items-center gap-2 text-slate-800">
                  <Droplet size={18} className="text-blue-600" />
                  <span>Success Pure Drinking Water প্রকল্প এডিটর</span>
                </h2>

                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">উদ্যোগের প্রধান নাম (Title)</label>
                    <input
                      type="text"
                      value={water.title}
                      onChange={(e) => setWater({ ...water, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">বিশদ পরিচিতি ও উদ্যোগের বিবরণ</label>
                    <textarea
                      value={water.description}
                      rows={4}
                      onChange={(e) => setWater({ ...water, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">প্রজেক্ট কভার ইমেজ URL</label>
                    <input
                      type="text"
                      value={water.imageUrl}
                      onChange={(e) => setWater({ ...water, imageUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">প্রকল্পের প্রধান বৈশিষ্ট্যসমূহ (তালিকাবদ্ধ)</label>
                    <div className="flex flex-col gap-3 mb-3">
                      {water.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="w-8 h-10 bg-slate-100 text-slate-500 font-bold text-xs rounded-xl flex items-center justify-center shrink-0">{idx + 1}</span>
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const copy = [...water.features];
                              copy[idx] = e.target.value;
                              setWater({ ...water, features: copy });
                            }}
                            placeholder={`বৈশিষ্ট্য #${idx + 1}`}
                            className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs sm:text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = water.features.filter((_, i) => i !== idx);
                              setWater({ ...water, features: copy });
                            }}
                            className="p-2.5 hover:bg-rose-50 text-rose-500 rounded-xl border border-slate-200 hover:border-rose-200 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setWater({ ...water, features: [...water.features, ""] });
                      }}
                      className="px-3.5 py-2 rounded-xl border-2 border-dashed border-teal-500 text-teal-600 hover:bg-teal-50 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>নতুন বৈশিষ্ট্য যোগ করুন</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl self-end transition flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                  <span>বিশুদ্ধ পানি প্রকল্প সেভ করুন</span>
                </button>
              </form>
            )}

            {/* 5. COMMITTEE TAB */}
            {activeTab === "committee" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <Users size={18} className="text-teal-600" />
                    <span>পরিচালনা কমিটির সদস্যবৃন্দ</span>
                  </h2>
                  <button
                    onClick={() => setEditCommittee({})}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>নতুন সদস্য প্রোফাইল</span>
                  </button>
                </div>

                {/* Sub-Editor Form */}
                {editCommittee && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      <span>{editCommittee.id ? "সদস্য প্রোফাইল সম্পাদন" : "নতুন পরিচালনা কমিটি সদস্য ফর্ম"}</span>
                      <button onClick={() => setEditCommittee(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সদস্যের পুরো নাম (বাংলায়)</label>
                        <input
                          type="text"
                          value={editCommittee.name || ""}
                          onChange={(e) => setEditCommittee({ ...editCommittee, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">পদবী (যেমন: সভাপতি / সাধারণ সম্পাদক)</label>
                        <input
                          type="text"
                          value={editCommittee.position || ""}
                          onChange={(e) => setEditCommittee({ ...editCommittee, position: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">মোবাইল নম্বর</label>
                        <input
                          type="text"
                          value={editCommittee.phone || ""}
                          onChange={(e) => setEditCommittee({ ...editCommittee, phone: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ইমেইল ঠিকানা</label>
                        <input
                          type="email"
                          value={editCommittee.email || ""}
                          onChange={(e) => setEditCommittee({ ...editCommittee, email: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ক্রমিক নম্বর</label>
                        <input
                          type="number"
                          value={editCommittee.order || ""}
                          onChange={(e) => setEditCommittee({ ...editCommittee, order: Number(e.target.value) })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">প্রোফাইল ছবি URL</label>
                      <input
                        type="text"
                        value={editCommittee.photoUrl || ""}
                        onChange={(e) => setEditCommittee({ ...editCommittee, photoUrl: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ছোট জীবনবৃত্তান্ত (Bio / পরিচিতি)</label>
                      <textarea
                        value={editCommittee.bio || ""}
                        rows={3}
                        onChange={(e) => setEditCommittee({ ...editCommittee, bio: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => setEditCommittee(null)} className="px-4 py-2 border rounded-xl text-xs">বাতিল</button>
                      <button onClick={handleSaveCommittee} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold">প্রোফাইল সংরক্ষণ</button>
                    </div>
                  </div>
                )}

                {/* Filter and Table Grid */}
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-slate-400"><Search size={16} /></div>
                  <input
                    type="text"
                    placeholder="সদস্য খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                <div className="overflow-x-auto border rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-4 w-12 text-center">ক্রম</th>
                        <th className="p-4">নাম</th>
                        <th className="p-4">পদবী</th>
                        <th className="p-4">মোবাইল</th>
                        <th className="p-4">পরিচিতি</th>
                        <th className="p-4 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCommittee.map((mem, idx) => (
                        <tr key={mem.id} className="hover:bg-slate-50/50">
                          <td className="p-4 text-center font-bold text-slate-500">{mem.order || idx + 1}</td>
                          <td className="p-4 font-bold text-slate-900">{mem.name}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-[9px]">{mem.position}</span></td>
                          <td className="p-4 text-slate-600">{mem.phone}</td>
                          <td className="p-4 text-slate-500 max-w-xs truncate">{mem.bio}</td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => setEditCommittee(mem)} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 cursor-pointer" title="সম্পাদনা"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteCommittee(mem.id)} className="p-1.5 hover:bg-rose-50 rounded text-rose-500 cursor-pointer" title="ডিলিট"><Trash size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. GALLERY TAB */}
            {activeTab === "gallery" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <ImageIcon size={18} className="text-teal-600" />
                    <span>ফটো গ্যালারি ছবি এডিটর</span>
                  </h2>
                  <button
                    onClick={() => setEditGallery({})}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>নতুন ছবি যোগ করুন</span>
                  </button>
                </div>

                {/* Sub-Editor Form */}
                {editGallery && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      <span>{editGallery.id ? "গ্যালারি ছবি এডিট" : "নতুন ছবি এন্ট্রি ফর্ম"}</span>
                      <button onClick={() => setEditGallery(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ছবির ক্যাপশন (শিরোনাম)</label>
                        <input
                          type="text"
                          value={editGallery.title || ""}
                          onChange={(e) => setEditGallery({ ...editGallery, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ক্যাটাগরি</label>
                        <select
                          value={editGallery.category || "social"}
                          onChange={(e) => setEditGallery({ ...editGallery, category: e.target.value as any })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                        >
                          <option value="plantation">বৃক্ষরোপণ (Plantation)</option>
                          <option value="water">বিশুদ্ধ পানি (Water Supply)</option>
                          <option value="social">সামাজিক কাজ (Social Work)</option>
                          <option value="events">অনুষ্ঠান (Events)</option>
                          <option value="meetings">সভা-সেমিনার (Meetings)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ছবির লিঙ্ক (Image URL)</label>
                        <input
                          type="text"
                          value={editGallery.imageUrl || ""}
                          onChange={(e) => setEditGallery({ ...editGallery, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">তারিখ</label>
                          <input
                            type="date"
                            value={editGallery.date || ""}
                            onChange={(e) => setEditGallery({ ...editGallery, date: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ক্রম নম্বর</label>
                          <input
                            type="number"
                            value={editGallery.order || ""}
                            onChange={(e) => setEditGallery({ ...editGallery, order: Number(e.target.value) })}
                            className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => setEditGallery(null)} className="px-4 py-2 border rounded-xl text-xs">বাতিল</button>
                      <button onClick={handleSaveGallery} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold">ছবি সংরক্ষণ</button>
                    </div>
                  </div>
                )}

                {/* Filter */}
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-slate-400"><Search size={16} /></div>
                  <input
                    type="text"
                    placeholder="ক্যাপশন দিয়ে ছবি খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {filteredGallery.map((item) => (
                    <div key={item.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow bg-slate-50 flex flex-col justify-between">
                      <div className="h-40 bg-slate-200 relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/80 text-teal-400 text-[9px] rounded-full font-bold uppercase">{item.category}</span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <h4 className="font-bold text-slate-900 text-xs leading-normal line-clamp-2">{item.title}</h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{item.date}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditGallery(item)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition cursor-pointer"
                              title="সম্পাদনা"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item.id)}
                              className="p-1.5 hover:bg-rose-50 text-rose-500 rounded transition cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. NEWS TAB */}
            {activeTab === "news" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <FileText size={18} className="text-teal-600" />
                    <span>খবর ও নোটিশবোর্ড এডিটর</span>
                  </h2>
                  <button
                    onClick={() => setEditNews({ isPublished: true })}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>নতুন নোটিশ / সংবাদ</span>
                  </button>
                </div>

                {/* Sub-Editor Form */}
                {editNews && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      <span>{editNews.id ? "সংবাদ ও নোটিশ সম্পাদন" : "নতুন নোটিশ প্রকাশনা ফর্ম"}</span>
                      <button onClick={() => setEditNews(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </h3>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সংবাদের শিরোনাম (বাংলায়)</label>
                      <input
                        type="text"
                        value={editNews.title || ""}
                        onChange={(e) => setEditNews({ ...editNews, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সংক্ষেপিত সারাংশ (Summary)</label>
                        <input
                          type="text"
                          value={editNews.summary || ""}
                          onChange={(e) => setEditNews({ ...editNews, summary: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ফিচার ইমেজ URL</label>
                        <input
                          type="text"
                          value={editNews.imageUrl || ""}
                          onChange={(e) => setEditNews({ ...editNews, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সম্পূর্ণ সংবাদের বিস্তারিত বিবরণ</label>
                      <textarea
                        value={editNews.content || ""}
                        rows={5}
                        onChange={(e) => setEditNews({ ...editNews, content: e.target.value })}
                        placeholder="অনুচ্ছেদগুলো আলাদা করার জন্য এন্টার দিয়ে ডবল স্পেস দিন।"
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="check-published"
                        checked={editNews.isPublished || false}
                        onChange={(e) => setEditNews({ ...editNews, isPublished: e.target.checked })}
                        className="w-4 h-4 text-teal-600"
                      />
                      <label htmlFor="check-published" className="text-xs font-bold text-slate-700">তাত্ক্ষণিকভাবে ওয়েবসাইটে পাবলিশ করুন</label>
                    </div>
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => setEditNews(null)} className="px-4 py-2 border rounded-xl text-xs">বাতিল</button>
                      <button onClick={handleSaveNews} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold">সংবাদ প্রকাশ করুন</button>
                    </div>
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-slate-400"><Search size={16} /></div>
                  <input
                    type="text"
                    placeholder="নোটিশ শিরোনাম দিয়ে খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                <div className="overflow-x-auto border rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-4">শিরোনাম</th>
                        <th className="p-4">তারিখ</th>
                        <th className="p-4">সারাংশ</th>
                        <th className="p-4 text-center">অবস্থা (Status)</th>
                        <th className="p-4 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredNews.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{item.title}</td>
                          <td className="p-4 text-slate-500 whitespace-nowrap">{item.date}</td>
                          <td className="p-4 text-slate-400 max-w-xs truncate">{item.summary}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => togglePublishNews(item)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                                item.isPublished
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                  : "bg-slate-100 text-slate-500 border border-slate-200"
                              }`}
                            >
                              {item.isPublished ? "Published" : "Draft"}
                            </button>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => setEditNews(item)} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 cursor-pointer" title="সম্পাদনা"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteNews(item.id)} className="p-1.5 hover:bg-rose-50 text-rose-500 rounded cursor-pointer" title="মুছে ফেলুন"><Trash size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7.5. AWARDS TAB */}
            {activeTab === "awards" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <Trophy size={18} className="text-teal-600" />
                    <span>অর্জন ও সম্মাননা এডিটর</span>
                  </h2>
                  <button
                    onClick={() => setEditAward({})}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>নতুন সম্মাননা যোগ করুন</span>
                  </button>
                </div>

                {/* Sub-Editor Form */}
                {editAward && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      <span>{editAward.id ? "সম্মাননা বিবরণী সম্পাদন" : "নতুন সম্মাননা যোগ করার ফর্ম"}</span>
                      <button onClick={() => setEditAward(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">সম্মাননা / পুরস্কারের নাম</label>
                        <input
                          type="text"
                          value={editAward.title || ""}
                          onChange={(e) => setEditAward({ ...editAward, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                          placeholder="উদা: শ্রেষ্ঠ সমবায় সমিতি পুরস্কার"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">প্রদানকারী কর্তৃপক্ষ</label>
                        <input
                          type="text"
                          value={editAward.authority || ""}
                          onChange={(e) => setEditAward({ ...editAward, authority: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                          placeholder="উদা: উপজেলা সমবায় দপ্তর, সাতক্ষীরা"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ছবির লিঙ্ক (Image URL)</label>
                        <input
                          type="text"
                          value={editAward.imageUrl || ""}
                          onChange={(e) => setEditAward({ ...editAward, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">প্রাপ্তির বছর/তারিখ</label>
                          <input
                            type="text"
                            value={editAward.date || ""}
                            onChange={(e) => setEditAward({ ...editAward, date: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                            placeholder="উদা: ২০২৩ বা ডিসেম্বর ২০২৩"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ক্রম নম্বর</label>
                          <input
                            type="number"
                            value={editAward.order || ""}
                            onChange={(e) => setEditAward({ ...editAward, order: Number(e.target.value) })}
                            className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">পুরস্কারের বিবরণ</label>
                      <textarea
                        value={editAward.description || ""}
                        rows={4}
                        onChange={(e) => setEditAward({ ...editAward, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                        placeholder="পুরস্কার প্রাপ্তি বা অর্জনের গৌরবময় ইতিহাস..."
                      />
                    </div>

                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => setEditAward(null)} className="px-4 py-2 border rounded-xl text-xs">বাতিল</button>
                      <button onClick={handleSaveAward} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold">সংরক্ষণ করুন</button>
                    </div>
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-slate-400"><Search size={16} /></div>
                  <input
                    type="text"
                    placeholder="পুরস্কারের নাম বা কতৃপক্ষ দিয়ে খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                {/* Grid of awards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {filteredAwards.map((item) => (
                    <div key={item.id} className="border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow bg-slate-50 flex flex-col justify-between">
                      <div className="h-40 bg-slate-200 relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/85 text-teal-400 text-[10px] rounded-full font-bold uppercase">{item.date}</span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider block mb-1">{item.authority}</span>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2">{item.title}</h4>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t pt-2.5">
                          <span>ক্রম: {item.order}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditAward(item)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition cursor-pointer"
                              title="সম্পাদনা"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteAward(item.id)}
                              className="p-1.5 hover:bg-rose-50 text-rose-500 rounded transition cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. FAQS TAB */}
            {activeTab === "faqs" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <HelpCircle size={18} className="text-teal-600" />
                    <span>জিজ্ঞাসা ও পরিসংখ্যান কাউন্টার</span>
                  </h2>
                  <button
                    onClick={() => setEditFAQ({})}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>নতুন এফ-এ-কিউ জিজ্ঞাসা</span>
                  </button>
                </div>

                {/* Sub-Editor Form */}
                {editFAQ && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center justify-between">
                      <span>{editFAQ.id ? "জিজ্ঞাসা সম্পাদন" : "নতুন সাধারণ জিজ্ঞাসা ফর্ম"}</span>
                      <button onClick={() => setEditFAQ(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">প্রশ্ন (জিজ্ঞাসা)</label>
                        <input
                          type="text"
                          value={editFAQ.question || ""}
                          onChange={(e) => setEditFAQ({ ...editFAQ, question: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">ক্রম নম্বর</label>
                        <input
                          type="number"
                          value={editFAQ.order || ""}
                          onChange={(e) => setEditFAQ({ ...editFAQ, order: Number(e.target.value) })}
                          className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">উত্তর</label>
                      <textarea
                        value={editFAQ.answer || ""}
                        rows={4}
                        onChange={(e) => setEditFAQ({ ...editFAQ, answer: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => setEditFAQ(null)} className="px-4 py-2 border rounded-xl text-xs">বাতিল</button>
                      <button onClick={handleSaveFAQ} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold">সংরক্ষণ করুন</button>
                    </div>
                  </div>
                )}

                {/* Active FAQ List */}
                <div className="overflow-x-auto border rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-4 w-12 text-center">ক্রম</th>
                        <th className="p-4">প্রশ্ন (সাধারণ জিজ্ঞাসা)</th>
                        <th className="p-4">উত্তর</th>
                        <th className="p-4 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {faqs.map((faq, idx) => (
                        <tr key={faq.id} className="hover:bg-slate-50/50">
                          <td className="p-4 text-center font-bold text-slate-500">{faq.order || idx + 1}</td>
                          <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{faq.question}</td>
                          <td className="p-4 text-slate-500 max-w-sm truncate">{faq.answer}</td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => setEditFAQ(faq)} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 cursor-pointer" title="সম্পাদনা"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteFAQ(faq.id)} className="p-1.5 hover:bg-rose-50 text-rose-500 rounded cursor-pointer" title="মুছে ফেলুন"><Trash size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sub section: Stats edit */}
                <div className="border-t pt-8 mt-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">পরিসংখ্যান এনিমেটেড কাউন্টার সমূহ</h3>
                    <button onClick={() => setEditStat({})} className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 text-[10px] font-bold rounded-lg border border-teal-100 flex items-center gap-1 cursor-pointer">
                      <Plus size={10} /> নতুন কাউন্টার
                    </button>
                  </div>

                  {editStat && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">সংখ্যা (Value)</label>
                          <input type="text" value={editStat.value || ""} onChange={(e) => setEditStat({ ...editStat, value: e.target.value })} placeholder="যেমন: ৫০০+" className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">লেবেল (Label)</label>
                          <input type="text" value={editStat.label || ""} onChange={(e) => setEditStat({ ...editStat, label: e.target.value })} placeholder="যেমন: সম্মানিত সদস্য" className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">আইকন</label>
                          <input type="text" value={editStat.iconName || ""} onChange={(e) => setEditStat({ ...editStat, iconName: e.target.value })} placeholder="যেমন: Users, Smile" className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">ক্রম</label>
                          <input type="number" value={editStat.order || ""} onChange={(e) => setEditStat({ ...editStat, order: Number(e.target.value) })} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-1.5">
                        <button onClick={() => setEditStat(null)} className="px-3 py-1 border rounded-lg text-[10px]">বাতিল</button>
                        <button onClick={handleSaveStat} className="px-3 py-1 bg-teal-600 text-white rounded-lg text-[10px] font-bold">সেভ করুন</button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((st) => (
                      <div key={st.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center flex flex-col justify-between gap-2.5">
                        <div>
                          <span className="block text-2xl font-black text-slate-900">{st.value}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{st.label}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 border-t pt-2">
                          <button onClick={() => setEditStat(st)} className="p-1 hover:bg-slate-200 rounded text-slate-600 text-[10px]"><Edit size={12} /></button>
                          <button onClick={() => handleDeleteStat(st.id)} className="p-1 hover:bg-rose-100 rounded text-rose-500 text-[10px]"><Trash size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 9. CONTACT TAB */}
            {activeTab === "contact" && (
              <form onSubmit={handleSaveContact} className="flex flex-col gap-6">
                <h2 className="text-lg font-bold border-b pb-3 mb-2 flex items-center gap-2 text-slate-800">
                  <Phone size={18} className="text-teal-600" />
                  <span>অফিস ঠিকানা ও যোগাযোগের বিবরণ এডিটর</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">কার্যালয়ের পূর্ণ ঠিকানা (বাংলায়)</label>
                    <input
                      type="text"
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">মোবাইল নম্বর (কমা দিয়ে একাধিক)</label>
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">যোগাযোগ ইমেইল (Email)</label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">হোয়াটসঅ্যাপ চ্যাট লিংক নম্বর</label>
                    <input
                      type="text"
                      value={contact.whatsapp}
                      onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">ফেসবুক পেজ সম্পূর্ণ ইউ-আর-এল (URL)</label>
                    <input
                      type="text"
                      value={contact.facebook}
                      onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">অফিস সময়সূচী লাইন (শনি - বৃহস্পতি)</label>
                    <input
                      type="text"
                      value={contact.officeHours}
                      onChange={(e) => setContact({ ...contact, officeHours: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">গুগল ম্যাপ আইফ্রেম সোর্স URL (Embed Src Link)</label>
                    <input
                      type="text"
                      value={contact.googleMapUrl}
                      onChange={(e) => setContact({ ...contact, googleMapUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">গুগল ম্যাপের শেয়ার ম্যাপ এম্বেড লিংক থেকে শুধু src= এর ভেতরের অংশটুকু বসান।</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl self-end transition flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                  <span>যোগাযোগ তথ্য সেভ করুন</span>
                </button>
              </form>
            )}

            {/* 10. INQUIRIES TAB (CONTACT MESSAGES READER) */}
            {activeTab === "inquiries" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <MessageSquare size={18} className="text-teal-600" />
                    <span>যোগাযোগ ফরম থেকে প্রাপ্ত ইনকোয়ারিসমূহের তালিকা</span>
                  </h2>
                  <button
                    onClick={fetchInquiries}
                    disabled={isLoadingInquiries}
                    className="px-3.5 py-1.5 rounded-xl border hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {isLoadingInquiries ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database size={14} />}
                    <span>রিফ্রেশ</span>
                  </button>
                </div>

                {/* Filter and Table Grid */}
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-slate-400"><Search size={16} /></div>
                  <input
                    type="text"
                    placeholder="বার্তার বিষয়বস্তু বা প্রেরকের নাম দিয়ে খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm bg-slate-50"
                  />
                </div>

                {isLoadingInquiries ? (
                  <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                    <p className="text-sm font-sans">ইনকোয়ারি ডেটা লোড হচ্ছে...</p>
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2 border-2 border-dashed border-slate-100 rounded-3xl">
                    <MessageSquare size={36} className="opacity-30" />
                    <p className="text-sm font-sans">কোনো বার্তা পাওয়া যায়নি।</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredInquiries.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-5 rounded-2xl border transition ${
                          msg.status === "new" ? "border-teal-200 bg-teal-50/10" : "border-slate-100 bg-white"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100/60 pb-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-950 text-sm">{msg.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                msg.status === "new"
                                  ? "bg-rose-50 text-rose-700 border border-rose-100"
                                  : msg.status === "read"
                                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              }`}>
                                {msg.status === "new" ? "New" : msg.status === "read" ? "Read" : "Replied"}
                              </span>
                            </div>
                            <p className="text-slate-400 text-[10px] mt-1">মোবাইল: <strong className="text-slate-700 select-all">{msg.phone}</strong> | ইমেইল: <strong className="text-slate-700 select-all">{msg.email || "N/A"}</strong></p>
                          </div>
                          
                          <span className="text-[10px] text-slate-400 self-start sm:self-auto font-mono">
                            {new Date(msg.date).toLocaleString("bn-BD", { hour12: true })}
                          </span>
                        </div>

                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 font-sans whitespace-pre-line text-justify select-text">
                          {msg.message}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-50 text-xs">
                          <div className="flex gap-2">
                            <button onClick={() => handleToggleInquiryStatus(msg, "read")} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition">পঠিত হিসেবে মার্ক</button>
                            <button onClick={() => handleToggleInquiryStatus(msg, "replied")} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition">উত্তর দেওয়া হয়েছে</button>
                          </div>
                          <button onClick={() => handleDeleteInquiry(msg.id)} className="p-1.5 hover:bg-rose-50 rounded text-rose-500 transition" title="বার্তা ডিলিট"><Trash size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
