import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Facebook, CheckCircle } from "lucide-react";
import { ContactInfo } from "../types";
import { submitContactMessage } from "../firebase/db";
import { trackEvent } from "../utils/analytics";
import { useToast } from "../components/Toast";

interface ContactProps {
  contactInfo: ContactInfo;
}

export function Contact({ contactInfo }: ContactProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Input sanitization and validations
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "আপনার নাম লিখুন";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "আপনার মোবাইল নম্বর লিখুন";
    } else if (!/^[0-9+-\s]{11,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "সঠিক মোবাইল নম্বর লিখুন (১১-১৫ ডিজিট)";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা লিখুন";
    }
    if (!formData.message.trim()) {
      newErrors.message = "আপনার বার্তা বা জিজ্ঞাসা লিখুন";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "বার্তাটি অন্তত ১০ অক্ষরের হতে হবে";
    }
    return newErrors;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("error", "ত্রুটি!", "অনুগ্রহ করে ফর্মের ভুলগুলো সংশোধন করুন।");
      return;
    }

    setIsSubmitting(true);
    try {
      // Save message to firestore (fully functional CRUD)
      await submitContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message
      });

      // Track GA4 event
      trackEvent("contact_form_submission", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });

      showToast("success", "ধন্যবাদ!", "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।");
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      
      // Clear success screen after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      showToast("error", "দুঃখিত!", "বার্তা পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // GA track social buttons clicks
  const handleSocialClick = (platform: string, url: string) => {
    trackEvent("social_click", { platform, url, location: "contact_page" });
  };

  return (
    <section id="contact" className="py-24 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            যোগাযোগ
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="text-xl font-extrabold text-brand-dark font-sans border-l-4 border-brand-teal pl-4 tracking-wide">
              আমাদের কার্যালয় তথ্য
            </h3>
            
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-brand-light border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-sm mb-1">অফিস ঠিকানা</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{contactInfo.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-brand-light border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-sm mb-1">মোবাইল ও ফোন</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-brand-teal-hover transition">
                      {contactInfo.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-brand-light border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-sm mb-1">ইমেইল ঠিকানা</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-brand-teal-hover transition">
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-brand-light border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-sm mb-1">অফিস সময়সূচী</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{contactInfo.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Social channels card */}
            <div className="p-6 rounded-[2rem] bg-brand-dark text-white flex flex-col gap-4">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-orange">সামাজিক যোগাযোগ মাধ্যম</h4>
              <p className="text-xs text-slate-300">ফেসবুক বা সরাসরি হোয়াটসঅ্যাপ চ্যাটের মাধ্যমে আমাদের কার্যক্রম ও নোটিশবোর্ড নজর রাখতে পারেন।</p>
              <div className="flex gap-3 mt-1">
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("Facebook", contactInfo.facebook)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-brand-teal transition text-xs font-semibold cursor-pointer"
                >
                  <Facebook size={14} />
                  <span>ফেসবুক পেজ</span>
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9+]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("WhatsApp", contactInfo.whatsapp)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-600 transition text-xs font-semibold cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>হোয়াটসঅ্যাপ চ্যাট</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-7 bg-brand-light border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-sm">
            <h3 className="text-lg font-extrabold text-brand-dark mb-6 font-sans">
              আপনার মতামত ও জিজ্ঞাসা পাঠান
            </h3>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center animate-bounce animate-duration-1000">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-extrabold text-brand-dark text-lg">ধন্যবাদ! বার্তাটি পাঠানো হয়েছে।</h4>
                <p className="text-slate-500 text-sm max-w-sm">আমরা খুব শীঘ্রই আপনার উল্লেখিত মোবাইল নম্বরে অথবা ইমেইলে যোগাযোগ করব।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
                    আপনার নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="যেমন: মোঃ আব্দুল করিম"
                    className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 transition ${
                      errors.name ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-brand-teal/10 focus:border-brand-teal"
                    }`}
                  />
                  {errors.name && <span className="text-rose-500 text-[10px] mt-1 block font-sans">{errors.name}</span>}
                </div>

                {/* Grid phone & email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
                      মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="যেমন: ০১৭১২-৩৪৫৬৭৮"
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 transition ${
                        errors.phone ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-brand-teal/10 focus:border-brand-teal"
                      }`}
                    />
                    {errors.phone && <span className="text-rose-500 text-[10px] mt-1 block font-sans">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
                      ইমেইল ঠিকানা (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="যেমন: karim@example.com"
                      className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 transition ${
                        errors.email ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-brand-teal/10 focus:border-brand-teal"
                      }`}
                    />
                    {errors.email && <span className="text-rose-500 text-[10px] mt-1 block font-sans">{errors.email}</span>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
                    আপনার বার্তা/জিজ্ঞাসা <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="এখানে আপনার জিজ্ঞাসাটি বিস্তারিত লিখুন..."
                    className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 transition ${
                      errors.message ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-brand-teal/10 focus:border-brand-teal"
                    }`}
                  />
                  {errors.message && <span className="text-rose-500 text-[10px] mt-1 block font-sans">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-brand-teal/15 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>বার্তা পাঠান</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps Embed Iframe */}
        <div className="rounded-[2rem] overflow-hidden shadow-lg border border-slate-200 h-96 bg-slate-100 relative">
          <iframe
            src={contactInfo.googleMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer"
            title="Success Samabay Location on Google Maps"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
