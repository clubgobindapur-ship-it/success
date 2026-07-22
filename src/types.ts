export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText1: string;
  ctaText2: string;
  bgImageUrl: string;
}

export interface AboutContent {
  intro: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface WaterContent {
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface SocialActivityItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  photoUrl: string;
  phone: string;
  email: string;
  bio: string;
  order: number;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: "social" | "plantation" | "water" | "events" | "meetings";
  date: string;
  order: number;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  date: string;
  isPublished: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatarUrl: string;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface AwardItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  authority: string;
  order: number;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  facebook: string;
  officeHours: string;
  googleMapUrl: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: string; // e.g. "ফুল-টাইম", "পার্ট-টাইম", "চুক্তিভিত্তিক", "স্বেচ্ছাসেবক"
  salary: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  isPublished: boolean;
  order: number;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  phone: string;
  email: string;
  experience: string;
  resumeUrl: string;
  coverLetter: string;
  appliedAt: string;
  status: "new" | "reviewed" | "shortlisted" | "rejected";
}

