import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  X,
  Search,
  Filter,
  Building2,
  BadgeCheck,
  FileText,
  User,
  Phone,
  Mail,
  Award,
  Sparkles,
  ChevronRight,
  Info
} from "lucide-react";
import { JobPosting, JobApplication } from "../types";
import { useToast } from "../components/Toast";
import { submitJobApplication } from "../firebase/db";
import { trackEvent } from "../utils/analytics";

interface CareerSectionProps {
  jobs: JobPosting[];
}

export function CareerSection({ jobs }: CareerSectionProps) {
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [applyJob, setApplyJob] = useState<JobPosting | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    applicantName: "",
    phone: "",
    email: "",
    experience: "",
    resumeUrl: "",
    coverLetter: ""
  });

  // Filter published jobs only
  const publishedJobs = (jobs || []).filter((j) => j.isPublished);

  // Categories list
  const categories = ["all", "ফুল-টাইম", "পার্ট-টাইম", "স্বেচ্ছাসেবক", "চুক্তিভিত্তিক"];

  const filteredJobs = publishedJobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "all" ||
      job.jobType.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!applyJob) return;
    if (!formData.applicantName.trim() || !formData.phone.trim()) {
      showToast("error", "তথ্য অসম্পূর্ণ!", "দয়া করে আপনার নাম এবং মোবাইল নম্বর প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitJobApplication({
        jobId: applyJob.id,
        jobTitle: applyJob.title,
        applicantName: formData.applicantName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        experience: formData.experience.trim(),
        resumeUrl: formData.resumeUrl.trim(),
        coverLetter: formData.coverLetter.trim()
      });

      trackEvent("job_application_submitted", {
        jobId: applyJob.id,
        jobTitle: applyJob.title
      });

      showToast("success", "আবেদন সফল হয়েছে!", "আপনার নিয়োগ আবেদনটি সফলভাবে জমা নেওয়া হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।");

      // Reset form & modals
      setFormData({
        applicantName: "",
        phone: "",
        email: "",
        experience: "",
        resumeUrl: "",
        coverLetter: ""
      });
      setApplyJob(null);
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
      showToast("error", "আবেদন ব্যর্থ হয়েছে!", "দয়া করে পুনরায় চেষ্টা করুন বা আমাদের কার্যালয়ে যোগাযোগ করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="career" className="py-20 bg-slate-50 relative overflow-hidden font-sans border-t border-slate-200">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase size={14} />
            <span>ক্যারিয়ার ও নিয়োগ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Success সমবায় সমিতিতে গড়ে তুলুন আপনার ভবিষ্যৎ
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            আমরা সততা, স্বচ্ছতা ও সততার সাথে সমাজ ও গ্রামীণ উন্নয়নে নিবেদিত। আপনিও হতে পারেন আমাদের কর্মঠ টিমের একজন সম্মানিত সদস্য।
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="পদের নাম বা বিভাগ দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal bg-slate-50/50"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap flex items-center gap-1">
                <Filter size={13} /> টাইপ:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-teal text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "all" ? "সবগুলো পদ" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">কোনো পদ পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500 mt-1">
              বর্তমান সময়ে আপনার সার্চকৃত বিষয়ে কোনো সার্কুলার খোলা নেই। নতুন সার্কুলারের জন্য পরবর্তীতে ভিজিট করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-teal/40 hover:shadow-md transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Type badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-md">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md flex items-center gap-1">
                      <Clock size={12} /> {job.jobType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-teal transition leading-snug">
                    {job.title}
                  </h3>

                  {/* Key metadata */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700">বেতন: {job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span className="text-rose-600 font-medium">আবেদনের শেষ তারিখ: {job.deadline}</span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="mt-4 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-xs font-bold text-slate-700 hover:text-brand-teal flex items-center gap-1 cursor-pointer transition"
                  >
                    <span>বিস্তারিত দেখুন</span>
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setApplyJob(job);
                      setSelectedJob(null);
                    }}
                    className="px-4 py-2 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    <span>আবেদন করুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* JOB DETAILS MODAL */}
      {/* -------------------------------------------------------------------------- */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold">
                {selectedJob.department}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                {selectedJob.jobType}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 pr-8">{selectedJob.title}</h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-teal" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">অবস্থান</span>
                  <span className="font-semibold">{selectedJob.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-brand-teal" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">বেতন / সম্মানী</span>
                  <span className="font-semibold">{selectedJob.salary}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-rose-500" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">আবেদনের শেষ তারিখ</span>
                  <span className="font-semibold text-rose-600">{selectedJob.deadline}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Info size={16} className="text-brand-teal" /> পদের বিবরণ:
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                {selectedJob.description}
              </p>
            </div>

            {/* Requirements */}
            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
              <div className="mt-5">
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-teal-600" /> আবশ্যকীয় যোগ্যতা ও অভিজ্ঞতা:
                </h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
              <div className="mt-5">
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500" /> সুবিধা সমূহ:
                </h4>
                <ul className="space-y-1.5">
                  {selectedJob.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <BadgeCheck size={14} className="text-amber-500 shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  setApplyJob(selectedJob);
                  setSelectedJob(null);
                }}
                className="px-6 py-2.5 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <Send size={14} />
                <span>আবেদন ফর্মে যান</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* APPLICATION FORM MODAL */}
      {/* -------------------------------------------------------------------------- */}
      {applyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setApplyJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                অনলাইন আবেদন ফরম
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                {applyJob.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                বিভাগ: <span className="font-semibold text-slate-700">{applyJob.department}</span> | আবেদনের শেষ সময়: <span className="text-rose-600 font-semibold">{applyJob.deadline}</span>
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <User size={13} className="text-brand-teal" /> আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ কামরুল হাসান"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                    <Phone size={13} className="text-brand-teal" /> মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="০১৭xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                    <Mail size={13} className="text-brand-teal" /> ইমেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <Award size={13} className="text-brand-teal" /> শিক্ষাগত যোগ্যতা ও কাজের অভিজ্ঞতা <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: বিএ পাস, ১ বছর এনজিওতে কাজ করার অভিজ্ঞতা"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1">
                  <FileText size={13} className="text-brand-teal" /> সিভির ড্রাইভ বা ড্রপবক্স লিঙ্ক (যদি থাকে)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">গুগল ড্রাইভ বা অনলাইন ফাইল শেয়ারিং লিঙ্ক প্রদান করতে পারেন।</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  কভার লেটার / আপনার সম্পর্কে সংক্ষিপ্ত বার্তা
                </label>
                <textarea
                  rows={3}
                  placeholder="কেন আপনি এই পদের জন্য নিজেকে উপযুক্ত মনে করছেন তা সংক্ষেপে লিখুন..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyJob(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-brand-teal hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>জমা হচ্ছে...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>আবেদন জমা দিন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
