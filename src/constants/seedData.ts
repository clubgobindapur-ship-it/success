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
  AwardItem,
  ContactInfo,
  SEOMetadata
} from "../types";

export const DEFAULT_HERO: HeroContent = {
  headline: "বিশ্বাস, উন্নয়ন ও সেবার অঙ্গীকার",
  subheadline: "Success সমবায় সমিতি — কালিগঞ্জ উপজেলার মানুষের আর্থিক উন্নয়ন, পারস্পরিক সহযোগিতা ও টেকসই সামাজিক কল্যাণে নিবেদিত একটি বিশ্বস্ত প্রতিষ্ঠান।",
  ctaText1: "আমাদের সম্পর্কে",
  ctaText2: "যোগাযোগ করুন",
  bgImageUrl: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=1600&q=80"
};

export const DEFAULT_ABOUT: AboutContent = {
  intro: "Success সমবায় সমিতি সাতক্ষীরা জেলার কালিগঞ্জ উপজেলায় অবস্থিত একটি অন্যতম জনকল্যাণমুখী সমবায় প্রতিষ্ঠান। Success Group এর একটি সহযোগী প্রতিষ্ঠান হিসেবে এটি এলাকায় দারিদ্র্য বিমোচন, কর্মসংস্থান সৃষ্টি এবং সদস্যদের সঞ্চয় প্রবণতা বৃদ্ধিতে নিরলস কাজ করে যাচ্ছে। আমরা বিশ্বাস করি সমবায়ের শক্তিই পারে গ্রামীণ অর্থনৈতিক উন্নয়ন ত্বরান্বিত করতে।",
  mission: "সদস্যদের ক্ষুদ্র ক্ষুদ্র সঞ্চয়কে একত্রিত করে মূলধন গঠন, সহজ শর্তে ঋণ সুবিধা প্রদান এবং বিভিন্ন উৎপাদনশীল উদ্যোগের মাধ্যমে সদস্যদের অর্থনৈতিক স্বাবলম্বিতা অর্জন ও জীবনযাত্রার মান উন্নয়ন করা।",
  vision: "কালিগঞ্জ উপজেলা তথা সমগ্র সাতক্ষীরা অঞ্চলের একটি আদর্শ, স্বচ্ছ এবং শতভাগ ডিজিটাল সমবায় প্রতিষ্ঠান হিসেবে গড়ে ওঠা, যা সামাজিক ও অর্থনৈতিক উন্নয়নে অনুকরণীয় দৃষ্টান্ত স্থাপন করবে।",
  values: [
    "স্বচ্ছতা ও জবাবদিহিতা",
    "পারস্পরিক সহযোগিতা",
    "সততা ও নিষ্ঠা",
    "সামাজিক দায়িত্ববোধ",
    "গ্রাহক-বান্ধব সেবা"
  ]
};

export const DEFAULT_WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: "why-1",
    title: "বিশ্বস্ত প্রতিষ্ঠান",
    description: "দীর্ঘদিন ধরে অত্যন্ত সততা ও সফলতার সাথে স্থানীয় জনগণের আস্থার প্রতীক হিসেবে কাজ করে আসছি।",
    iconName: "ShieldCheck",
    order: 1
  },
  {
    id: "why-2",
    title: "অভিজ্ঞ পরিচালনা কমিটি",
    description: "অভিজ্ঞ, সৎ ও দূরদর্শী পরিচালনা পর্ষদ দ্বারা আমাদের সকল কার্যক্রম অত্যন্ত সুচারুরূপে পরিচালিত হয়।",
    iconName: "Users",
    order: 2
  },
  {
    id: "why-3",
    title: "সামাজিক উন্নয়ন",
    description: "শুধু ব্যবসায়িক লাভ নয়, এলাকার সাধারণ মানুষের জীবনমান উন্নয়ন ও সমাজসেবামূলক উদ্যোগে আমরা অগ্রগামী।",
    iconName: "HeartHandshake",
    order: 3
  },
  {
    id: "why-4",
    title: "নিরাপদ কার্যক্রম",
    description: "আপনার আমানত ও সঞ্চয় আমাদের কাছে শতভাগ সুরক্ষিত এবং নিরাপদ আর্থিক পরিকল্পনায় নিয়োজিত।",
    iconName: "Lock",
    order: 4
  },
  {
    id: "why-5",
    title: "স্বচ্ছতা ও জবাবদিহিতা",
    description: "আমাদের প্রতিটি লেনদেন ও হিসাব নিকাশ শতভাগ নির্ভুল, ডিজিটাল ও সদস্যদের নিকট সম্পূর্ণ উন্মুক্ত।",
    iconName: "Eye",
    order: 5
  },
  {
    id: "why-6",
    title: "জনসেবায় অঙ্গীকার",
    description: "জরুরী প্রয়োজনে সদস্যদের পাশে দাঁড়ানো এবং স্থানীয় দরিদ্র মানুষের মৌলিক চাহিদা পূরণে সাহায্য করা আমাদের ব্রত।",
    iconName: "Activity",
    order: 6
  }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    title: "সমবায় কার্যক্রম",
    description: "সকল স্তরের মানুষের অংশীদারিত্ব নিশ্চিত করতে সমবায় মূলনীতি অনুযায়ী যৌথ অর্থনৈতিক কল্যাণ সাধন ও পুঁজি গঠন।",
    iconName: "FolderHeart",
    order: 1
  },
  {
    id: "srv-2",
    title: "সঞ্চয় কার্যক্রম",
    description: "সাপ্তাহিক, মাসিক ও মেয়াদোত্তীর্ণ মেয়াদী আমানত স্কিমের মাধ্যমে সদস্যদের ভবিষ্যৎ নিশ্চিতকরণ এবং সঞ্চয়ী মনস্তত্ত্ব তৈরি।",
    iconName: "PiggyBank",
    order: 2
  },
  {
    id: "srv-3",
    title: "সদস্য সেবা ও উন্নয়ন",
    description: "নতুন সদস্য অন্তর্ভুক্তি, কল্যাণ তহবিল থেকে অনুদান এবং সদস্যদের জীবন মান উন্নত করতে বহুমুখী কারিগরি ও আইনি পরামর্শ।",
    iconName: "UserCheck",
    order: 3
  },
  {
    id: "srv-4",
    title: "সামাজিক উন্নয়ন তহবিল",
    description: "সমিতির লভ্যাংশের একটি নির্দিষ্ট অংশ সামাজিক কল্যাণমূলক কাজে ব্যয় করা, যা পিছিয়ে পড়া মানুষের উন্নয়নে সরাসরি ভূমিকা রাখে।",
    iconName: "Sprout",
    order: 4
  },
  {
    id: "srv-5",
    title: "আর্থিক সচেতনতা বৃদ্ধি",
    description: "সদস্যদের অপ্রয়োজনীয় ব্যয় হ্রাস, সঠিক বিনিয়োগ ও বাজেট ব্যবস্থাপনা শেখানোর মাধ্যমে স্বাবলম্বী হওয়ার বিশেষ প্রশিক্ষণ।",
    iconName: "TrendingUp",
    order: 5
  },
  {
    id: "srv-6",
    title: "পরামর্শ ও গাইডেন্স",
    description: "ব্যবসায়িক সম্প্রসারণ, কৃষিভিত্তিক প্রকল্প তৈরি বা আত্মকর্মসংস্থান সৃষ্টিতে অভিজ্ঞ কর্মকর্তাদের দ্বারা নিখরচায় দিকনির্দেশনা প্রদান।",
    iconName: "MessagesSquare",
    order: 6
  }
];

export const DEFAULT_WATER: WaterContent = {
  title: "Success Pure Drinking Water (বিশুদ্ধ পানি প্রকল্প)",
  description: "সাতক্ষীরা জেলার উপকূলবর্তী ও প্রত্যন্ত অঞ্চলে সুপেয় পানির তীব্র সংকট সমাধানে Success সমবায় সমিতি চালু করেছে সম্পূর্ণ অলাভজনক 'Success Pure Drinking Water' উদ্যোগ। আধুনিক রিভার্স অসমোসিস (RO) ও আল্ট্রাভায়োলেট ফিল্টারিং প্রযুক্তির সমন্বয়ে আমরা নামমাত্র মূল্যে প্রতিটি পরিবারে শতভাগ নিরাপদ সুপেয় পানির সরবরাহ নিশ্চিত করছি।",
  imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
  features: [
    "শতভাগ ক্ষতিকর আর্সেনিক, আয়রন ও লবণ মুক্ত বিশুদ্ধ খাবার পানি।",
    "সর্বাধুনিক জার্মান আল্ট্রা-ফিল্টারিং প্রযুক্তির ব্যবহার।",
    "দুস্থ ও প্রান্তিক পরিবারগুলোর জন্য সম্পূর্ণ বিনামূল্যে পানি সরবরাহ।",
    "কালিগঞ্জের প্রত্যন্ত গ্রামীণ ও দুর্গম এলাকাগুলোতে ভ্রাম্যমাণ ভ্যানের মাধ্যমে হোম ডেলিভারি ব্যবস্থা।",
    "বিশ্ব স্বাস্থ্য সংস্থা (WHO) ও জনস্বাস্থ্য প্রকৌশল অধিদপ্তরের মানদণ্ড বজায় রাখা।"
  ]
};

export const DEFAULT_SOCIAL_ACTIVITIES: SocialActivityItem[] = [
  {
    id: "soc-1",
    title: "বৃক্ষরোপণ কর্মসূচি",
    description: "পরিবেশের ভারসাম্য রক্ষা এবং বজ্রপাত ও জলবায়ু পরিবর্তনের ক্ষতিকর প্রভাব মোকাবিলায় প্রতি বছর কালিগঞ্জ উপজেলায় হাজারো ফলজ, বনজ ও ঔষধি গাছ রোপণ করা হয়।",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    order: 1
  },
  {
    id: "soc-2",
    title: "অসহায় ও শীতার্ত মানুষের পাশে",
    description: "প্রতি বছর তীব্র শীতে নদী অববাহিকার দরিদ্র শীতার্ত ও বন্যাদুর্গত মানুষদের মাঝে মানসম্মত কম্বল, শীতবস্ত্র এবং শুকনো খাবার বিতরণ করা হয়।",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    order: 2
  },
  {
    id: "soc-3",
    title: "শিক্ষা সহায়তা ও মেধা বৃত্তি",
    description: "দরিদ্র ও মেধাবী শিক্ষার্থীদের লেখাপড়া সচল রাখতে সমিতির পক্ষ থেকে বাৎসরিক শিক্ষা উপকরণ, স্কুল ইউনিফর্ম ও নগদ অর্থ সহায়তা প্রদান করা হয়।",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    order: 3
  },
  {
    id: "soc-4",
    title: "বিনামূল্যে রক্তদান ও চিকিৎসা ক্যাম্প",
    description: "জরুরী চিকিৎসায় রক্তের অভাব দূরীকরণে স্বেচ্ছাসেবী রক্তদান ক্যাম্প এবং অভিজ্ঞ চিকিৎসকদের তত্ত্বাবধানে ফ্রি মেডিকেল হেলথ ক্যাম্প পরিচালনা করা হয়।",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116ecdacd04?auto=format&fit=crop&w=800&q=80",
    order: 4
  }
];

export const DEFAULT_COMMITTEE: CommitteeMember[] = [
  {
    id: "mem-1",
    name: "জনাব আলহাজ্ব মোঃ আব্দুর রহমান",
    position: "সভাপতি (President)",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    phone: "০১৭১২-৩৪৫৬৭৮",
    email: "president@success-samabay.org",
    bio: "সমাজসেবক ও বিশিষ্ট ব্যবসায়ী। বিগত ১০ বছর ধরে কালিগঞ্জ উপজেলার বিভিন্ন সামাজিক ও অর্থনৈতিক কল্যাণমূলক সংগঠনের নেতৃত্ব দিচ্ছেন।",
    order: 1
  },
  {
    id: "mem-2",
    name: "মেহেদী হাসান শুভ",
    position: "সাধারণ সম্পাদক (Secretary)",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    phone: "০১৭২৩-৪৫৬৭৮৯",
    email: "secretary@success-samabay.org",
    bio: "সমবায় আইন ও গ্রামীণ ক্ষুদ্র ঋণ ব্যবস্থাপনা বিশেষজ্ঞ। কালিগঞ্জ এলাকার তরুণদের আত্মকর্মসংস্থান সৃষ্টিতে দীর্ঘদিন কাজ করছেন।",
    order: 2
  },
  {
    id: "mem-3",
    name: "মোসাম্মাৎ তানিয়া সুলতানা",
    position: "কোষাধ্যক্ষ (Treasurer)",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    phone: "০১৭৩৪-৫৬৭৮৯০",
    email: "treasurer@success-samabay.org",
    bio: "হিসাববিজ্ঞান বিষয়ে স্নাতকোত্তর ডিগ্রীধারী এবং দীর্ঘ ৭ বছর অডিট ও ব্যাংকিং সেক্টরে আর্থিক ব্যবস্থাপনার বাস্তব অভিজ্ঞতাসম্পন্ন।",
    order: 3
  },
  {
    id: "mem-4",
    name: "ডাঃ মোঃ শফিকুল ইসলাম",
    position: "নির্বাহী সদস্য (Executive Member)",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    phone: "০১৭৪৫-৬৭৮৯০১",
    email: "shafiqul@success-samabay.org",
    bio: "কালিগঞ্জ উপজেলা হাসপাতালের অবসরপ্রাপ্ত চিকিৎসক। সমিতির ফ্রি ফ্রন্টলাইন মেডিকেল ক্যাম্প ও বিশুদ্ধ পানি প্রকল্পের প্রধান উপদেষ্টা।",
    order: 4
  }
];

export const DEFAULT_STATS: StatItem[] = [
  {
    id: "stat-1",
    value: "১০+",
    label: "বছরের সেবা",
    iconName: "Calendar",
    order: 1
  },
  {
    id: "stat-2",
    value: "৫০০+",
    label: "সম্মানিত সদস্য",
    iconName: "Users",
    order: 2
  },
  {
    id: "stat-3",
    value: "১৫+",
    label: "সামাজিক প্রকল্প",
    iconName: "Briefcase",
    order: 3
  },
  {
    id: "stat-4",
    value: "২০০০+",
    label: "উপকারভোগী পরিবার",
    iconName: "Smile",
    order: 4
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    title: "কালিগঞ্জ সরকারি পাইলট স্কুল প্রাঙ্গণে বার্ষিক বৃক্ষরোপণ উৎসব",
    category: "plantation",
    date: "২০২৫-০৭-১৫",
    order: 1
  },
  {
    id: "gal-2",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    title: "নদীভাঙনে ক্ষতিগ্রস্ত ভূমিহীন পরিবারে খাদ্য ও বস্ত্র সহায়তা বিতরণ",
    category: "social",
    date: "২০২৫-১২-২০",
    order: 2
  },
  {
    id: "gal-3",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    title: "নতুন বসানো রিভার্স অসমোসিস (RO) সুপেয় পানি শোধন কেন্দ্র",
    category: "water",
    date: "২০২৬-০২-১০",
    order: 3
  },
  {
    id: "gal-4",
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
    title: "উপকূলবর্তী গ্রামের মা ও শিশুদের মাঝে বিশুদ্ধ পানি বিতরণ কার্যক্রম",
    category: "water",
    date: "2026-০৪-১৮",
    order: 4
  },
  {
    id: "gal-5",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    title: "মেধাবী শিক্ষার্থীদের মাঝে বাৎসরিক শিক্ষাবৃত্তি ও মেধা পুরস্কার প্রদান",
    category: "events",
    date: "২০২৬-০৫-০২",
    order: 5
  },
  {
    id: "gal-6",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    title: "সমিতির পরিচালনা পর্ষদের মাসিক সাধারণ পর্যালোচনা ও বার্ষিক পরিকল্পনা সভা",
    category: "meetings",
    date: "২০২৬-০৬-১২",
    order: 6
  }
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "বার্ষিক সাধারণ সভা ও লভ্যাংশ বণ্টন উৎসব ২০২৬ অনুষ্ঠিত",
    summary: "Success সমবায় সমিতি লিমিটেড এর গৌরবময় ১০ম বার্ষিক সাধারণ সভা কালিগঞ্জ অডিটোরিয়ামে উৎসবমুখর পরিবেশে অনুষ্ঠিত হয়েছে এবং সকল সদস্যদের মাঝে লভ্যাংশ বিতরণ করা হয়েছে।",
    content: "Success সমবায় সমিতি লিমিটেড এর গৌরবময় ১০ম বার্ষিক সাধারণ সভা ও লভ্যাংশ বিতরণ উৎসব অত্যন্ত উৎসবমুখর পরিবেশে স্থানীয় কালিগঞ্জ উপজেলা পরিষদ অডিটোরিয়ামে সম্পন্ন হয়েছে। সভায় সম্মানিত সভাপতি জনাব আলহাজ্ব আব্দুর রহমান বিগত বছরের বার্ষিক প্রতিবেদন উপস্থাপন করেন। কোষাধ্যক্ষ মহোদয় অডিট রিপোর্ট ও লভ্যাংশের সারসংক্ষেপ প্রকাশ করেন। সর্বসম্মতিক্রমে সকল সদস্য ও শেয়ারহোল্ডারদের জন্য চমৎকার আকর্ষণীয় লভ্যাংশ অনুমোদন দেওয়া হয়। সভা শেষে সদস্যদের মাঝে সম্মাননা স্মারক ও চেক প্রদান করা হয়।",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    date: "২০২৬-০৭-১০",
    isPublished: true
  },
  {
    id: "news-2",
    title: "প্রান্তিক কৃষকদের মাঝে সহজ শর্তে কৃষিঋণ বিতরণ",
    summary: "কালিগঞ্জ উপজেলার ২৫ জন প্রান্তিক কৃষককে ফসল চাষ, সবজি আবাদ এবং দুগ্ধ খামার সম্প্রসারণের লক্ষ্যে নামমাত্র সুদে দীর্ঘমেয়াদী কৃষিঋণ প্রদান করা হয়েছে।",
    content: "উপকূলবর্তী জেলা সাতক্ষীরার কালিগঞ্জ উপজেলার কৃষি খাতকে সমৃদ্ধশালী এবং স্বাবলম্বী করার অঙ্গীকারে Success সমবায় সমিতির পক্ষ থেকে বিশেষ কৃষিঋণ বিতরণ কর্মসূচির আয়োজন করা হয়। ২৫ জন নির্বাচিত প্রান্তিক খামারী ও কৃষকদের মাঝে বীজ, সার ক্রয় এবং সেচ পাম্প স্থাপনের জন্য সহজ শর্তে দীর্ঘমেয়াদী ঋণ দেওয়া হয়। এই কার্যক্রম গ্রামীণ ফসল উৎপাদনশীলতা বহুলাংশে বৃদ্ধি করবে এবং দালাল চক্র থেকে কৃষকদের মুক্ত রাখবে বলে আশাবাদ ব্যক্ত করা হয়।",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    date: "২০২৬-০৭-০১",
    isPublished: true
  },
  {
    id: "news-3",
    title: "Success Pure Water প্রকল্পের নতুন ডেলিভারি ভ্যান চালু",
    summary: "প্রত্যন্ত গ্রামগুলোতে বিশুদ্ধ পানির দ্রুত পৌঁছানো নিশ্চিত করতে 'Success Pure Drinking Water' প্রকল্পে নতুন ব্যাটারি চালিত ভ্রাম্যমাণ ভ্যান যুক্ত করা হয়েছে।",
    content: "দুর্গম ও লবণাক্ত অঞ্চলগুলোতে সুপেয় খাবার পানির তীব্রতা হ্রাস করতে পরিচালিত 'Success Pure Drinking Water' প্রকল্পে আরও ২টি ভ্রাম্যমাণ ব্যাটারি চালিত ডেলিভারি ভ্যান সংযোজিত হয়েছে। এতে করে কালিগঞ্জের আরও ৩টি প্রত্যন্ত ইউনিয়নের মানুষের দোরগোড়ায় অত্যন্ত স্বল্প মূল্যে দৈনিক বিশুদ্ধ খাবার পানি পৌঁছে দেওয়া সম্ভব হবে। স্থানীয় ইউনিয়ন পরিষদের চেয়ারম্যান মহোদয় ফিতা কেটে আনুষ্ঠানিকভাবে এই ডেলিভারি ভ্যান সার্ভিসের শুভ উদ্বোধন ঘোষণা করেন।",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    date: "২০২৬-০৬-২৫",
    isPublished: true
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "মোঃ মফিজুল ইসলাম",
    role: "সদস্য (সঞ্চয়ী আমানত স্কিম)",
    comment: "আমি ৫ বছর ধরে Success সমবায় সমিতির সদস্য। এখানে সঞ্চয় করে আজ আমি নিজের একটা ছোট দোকান দিয়েছি। এদের হিসাবের স্বচ্ছতা এবং স্টাফদের আচরণ অতুলনীয়। কালিগঞ্জে এমন বিশ্বস্ত প্রতিষ্ঠান সত্যিই বিরল।",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    order: 1
  },
  {
    id: "test-2",
    name: "ছালেহা বেগম",
    role: "উপকারভোগী (বিশুদ্ধ পানি প্রকল্প)",
    comment: "লবণ পানির কারণে আমাদের পরিবারে নানারকম রোগ লেগে থাকতো। Success বিশুদ্ধ পানির কারখানা চালু হওয়ার পর থেকে আমরা নামমাত্র খরচে বাড়ির পাশে পরিষ্কার মিষ্টি পানি পাচ্ছি। এই উদ্যোগ আমাদের বাঁচিয়ে দিয়েছে।",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    order: 2
  }
];

export const DEFAULT_FAQ: FAQItem[] = [
  {
    id: "faq-1",
    question: "Success সমবায় সমিতির সদস্য হওয়ার নিয়ম কী?",
    answer: "কালিগঞ্জ উপজেলার যেকোনো স্থায়ী বাসিন্দা প্রয়োজনীয় জাতীয় পরিচয়পত্র, রঙিন পাসপোর্ট সাইজ ছবি এবং নির্ধারিত ভর্তি ফি দিয়ে নির্ধারিত আবেদন ফরম পূরণের মাধ্যমে আমাদের সমিতির সম্মানিত সদস্য হতে পারেন।",
    order: 1
  },
  {
    id: "faq-2",
    question: "এখানে সঞ্চয়ের কী কী স্কিম চালু আছে?",
    answer: "আমাদের এখানে প্রধানত দৈনিক সঞ্চয়, সাপ্তাহিক সঞ্চয়, মাসিক ডিপিএস (DPS) স্কিম এবং দীর্ঘমেয়াদী এফডিআর (FDR) বা স্থায়ী আমানত স্কিম রয়েছে। আপনি আপনার সামর্থ্য অনুযায়ী সর্বনিম্ন ১০০ টাকা থেকে শুরু করতে পারেন।",
    order: 2
  },
  {
    id: "faq-3",
    question: "বিশুদ্ধ পানি কীভাবে কেনা বা সরবরাহ নেওয়া যায়?",
    answer: "আমাদের কালিগঞ্জস্থ মূল পরিশোধন কেন্দ্রে এসে অথবা আমাদের ভ্রাম্যমাণ ডেলিভারি ভ্যানের নম্বরে কল করে খুব সহজেই মাত্র ৫-১০ টাকায় প্রতি জার (২০ লিটার) বিশুদ্ধ খাবার পানি সংগ্রহ করা যায়।",
    order: 3
  },
  {
    id: "faq-4",
    question: "সমিতির কি কোনো সরকারি অনুমোদন বা লাইসেন্স আছে?",
    answer: "হ্যাঁ, Success সমবায় সমিতি গণপ্রজাত阱্রী বাংলাদেশ সরকারের সমবায় অধিদপ্তর কর্তৃক যথাযথভাবে নিবন্ধিত এবং সমবায় আইন ও বিধিমালা মেনে অত্যন্ত স্বচ্ছতার সাথে পরিচালিত হয়ে আসছে।",
    order: 4
  }
];

export const DEFAULT_AWARDS: AwardItem[] = [
  {
    id: "award-1",
    title: "শ্রেষ্ঠ সমবায় সমিতি পুরস্কার ২০২৪",
    description: "কালিগঞ্জ উপজেলা ও সাতক্ষীরা জেলায় সঞ্চয় বৃদ্ধি, ক্ষুদ্রঋণ বিতরণ এবং গ্রাহক সেবায় অসামান্য অবদানের স্বীকৃতিস্বরূপ সমবায় অধিদপ্তর কর্তৃক শ্রেষ্ঠ সমবায় সমিতি হিসেবে মনোনীত ও পুরস্কৃত।",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    date: "২০২৪-১১-০২",
    authority: "জাতীয় সমবায় অধিদপ্তর",
    order: 1
  },
  {
    id: "award-2",
    title: "সফল সামাজিক উদ্যোগ সম্মাননা ২০২৩",
    description: "সমিতির নিজস্ব অর্থায়নে পরিচালিত 'বিশুদ্ধ পানি সরবরাহ প্রকল্প' এবং কালিগঞ্জস্থ লবণাক্ত অঞ্চলে সুপেয় পানি নিশ্চিতকরণে অনন্য সমাজসেবামূলক কাজের স্বীকৃতিস্বরূপ বিশেষ সম্মাননা স্মারক।",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80",
    date: "২০২৩-১২-১৬",
    authority: "সাতক্ষীরা জেলা প্রশাসন ও সামাজিক ফোরাম",
    order: 2
  },
  {
    id: "award-3",
    title: "স্বচ্ছতা ও শ্রেষ্ঠ অডিট মানদণ্ড সনদ ২০২২",
    description: "আর্থিক স্বচ্ছতা বজায় রাখা, নিয়মিত বার্ষিক সাধারণ সভা (AGM) সফলভাবে সম্পন্ন করা এবং সরকারি অডিট নিরীক্ষায় 'এ' শ্রেণী অর্জনের জন্য বিশেষ প্রশংসাপত্র।",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    date: "২০২২-১০-০৫",
    authority: "উপজেলা সমবায় কার্যালয়, কালিগঞ্জ",
    order: 3
  }
];

export const DEFAULT_CONTACT: ContactInfo = {
  address: "Success ভবন, প্রধান সড়ক (উপজেলা পরিষদ সংলগ্ন), কালিগঞ্জ উপজেলা সদর, সাতক্ষীরা, বাংলাদেশ।",
  phone: "০১৭৫০-৯৮৭৬৫৪, ০৪৭১-৬৪১২৩",
  email: "info@success-samabay.org",
  whatsapp: "+৮৮০১৭৫০৯৮৭৬৫৪",
  facebook: "https://facebook.com/SuccessSamabay",
  officeHours: "শনিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ টা - বিকাল ৫:০০ টা (শুক্রবার সাপ্তাহিক ছুটি)",
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58963.784260023475!2d89.00641155000002!3d22.4389024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a01d674b0eb1cc1%3A0xe67db5cf873322b7!2sKaliganj%20Upazila!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
};

export const DEFAULT_SEO: SEOMetadata = {
  title: "Success সমবায় সমিতি — বিশ্বাস, উন্নয়ন ও সেবার অঙ্গীকার",
  description: "Success সমবায় সমিতি সাতক্ষীরা জেলার কালিগঞ্জ উপজেলার মানুষের আর্থিক স্বাবলম্বিতা, সঞ্চয় বৃদ্ধি, পিওর সুপেয় পানি প্রকল্প এবং সামাজিক সচেতনতায় নিয়োজিত একটি শীর্ষস্থানীয় সমবায় প্রতিষ্ঠান।",
  keywords: "সমবায় সমিতি, Success সমবায় সমিতি, কালিগঞ্জ সাতক্ষীরা, Success Group, বিশুদ্ধ পানি প্রকল্প, সমবায় ঋণ, ডিপিএস স্কিম",
  ogImage: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=1200&q=80"
};

export const SEED_DATA = {
  hero: DEFAULT_HERO,
  about: DEFAULT_ABOUT,
  whyChooseUs: DEFAULT_WHY_CHOOSE_US,
  services: DEFAULT_SERVICES,
  water: DEFAULT_WATER,
  social: DEFAULT_SOCIAL_ACTIVITIES,
  committee: DEFAULT_COMMITTEE,
  stats: DEFAULT_STATS,
  gallery: DEFAULT_GALLERY,
  news: DEFAULT_NEWS,
  testimonials: DEFAULT_TESTIMONIALS,
  faqs: DEFAULT_FAQ,
  awards: DEFAULT_AWARDS,
  contact: DEFAULT_CONTACT,
  seo: DEFAULT_SEO
};

