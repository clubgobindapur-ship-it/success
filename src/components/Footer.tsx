import React from "react";
import { ShieldCheck, Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";
import { trackEvent } from "../utils/analytics";
import { ContactInfo } from "../types";

interface FooterProps {
  contactInfo: ContactInfo;
  orgName: string;
  onNavigate: (path: string) => void;
}

export function Footer({ contactInfo, orgName, onNavigate }: FooterProps) {
  const handleNavClick = (path: string, label: string) => {
    onNavigate(path);
    trackEvent("navigation_click", {
      targetPath: path,
      linkLabel: label,
      location: "footer"
    });
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackEvent("social_click", { platform, url, location: "footer" });
  };

  return (
    <footer className="bg-brand-dark text-slate-400 font-sans pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Organization Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white">
            <div className="p-1.5 bg-brand-teal/20 text-brand-teal rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <span className="font-extrabold text-lg tracking-wide">{orgName || "Success সমবায় সমিতি"}</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Success সমবায় সমিতি কালিগঞ্জ উপজেলার মানুষের অর্থনৈতিক সাবলম্বিতা অর্জন, ক্ষুদ্র সঞ্চয় সংগ্রহ এবং বিশুদ্ধ সুপেয় পানি সরবরাহের লক্ষ্যে নিরলস কাজ করে যাচ্ছে। এটি <strong>Success Group</strong> এর একটি বিশ্বস্ত প্রতিষ্ঠান।
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("Facebook", contactInfo.facebook)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-brand-teal hover:text-white transition duration-300 cursor-pointer"
              title="ফেসবুক পেজ"
            >
              <Facebook size={18} />
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9+]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("WhatsApp", contactInfo.whatsapp)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white transition duration-300 cursor-pointer"
              title="হোয়াটসঅ্যাপ"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.514.001 9.993-4.479 9.996-9.961.003-5.462-4.435-9.901-9.91-9.901-5.483 0-9.943 4.456-9.947 9.918-.002 1.83.5 3.61 1.45 5.16L1.83 22.2l5.01-1.315zM17.43 14.6c-.29-.15-1.74-.86-2.01-.96-.28-.1-.48-.15-.68.15-.2.3-.77.96-.94 1.16-.18.2-.35.23-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.25-.6-.5-.52-.68-.53-.18-.01-.38-.01-.58-.01-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44s1.05 2.84 1.2 3.03c.15.19 2.07 3.16 5.02 4.44.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.57-.08 1.74-.71 1.98-1.4.24-.7.24-1.3.17-1.42-.08-.12-.28-.19-.58-.34z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans border-l-2 border-brand-teal pl-3">
            নেভিগেশন লিংক
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button
                onClick={() => handleNavClick("/", "Footer Home")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                প্রধান পাতা (হোম)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/about", "Footer About")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                আমাদের পরিচিতি
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/services", "Footer Services")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                আমাদের সেবাসমূহ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/water", "Footer Water")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                বিশুদ্ধ পানি প্রকল্প
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/social", "Footer Social")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                সামাজিক কার্যক্রম
              </button>
            </li>
          </ul>
        </div>

        {/* Information Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans border-l-2 border-brand-teal pl-3">
            অন্যান্য পেইজ
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button
                onClick={() => handleNavClick("/committee", "Footer Committee")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                পরিচালনা কমিটি
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/gallery", "Footer Gallery")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                ফটো গ্যালারি
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/news", "Footer News")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                খবর ও নোটিশ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/career", "Footer Career")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                ক্যারিয়ার ও নিয়োগ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/privacy", "Footer Privacy")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                গোপনীয়তা নীতি
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("/terms", "Footer Terms")}
                className="hover:text-brand-teal transition cursor-pointer font-sans font-semibold"
              >
                শর্তাবলী ও নিয়মাবলী
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info card */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans border-l-2 border-brand-teal pl-3">
            যোগাযোগ করুন
          </h4>
          <div className="flex flex-col gap-3.5 text-sm leading-relaxed">
            <div className="flex gap-2 items-start">
              <MapPin size={18} className="text-brand-teal shrink-0 mt-0.5" />
              <span className="font-sans text-xs font-semibold">{contactInfo.address}</span>
            </div>
            <div className="flex gap-2 items-start">
              <Phone size={16} className="text-brand-teal shrink-0 mt-0.5" />
              <span className="font-sans text-xs font-semibold">{contactInfo.phone}</span>
            </div>
            <div className="flex gap-2 items-start">
              <Mail size={16} className="text-brand-teal shrink-0 mt-0.5" />
              <span className="font-sans text-xs font-semibold">{contactInfo.email}</span>
            </div>
            <div className="flex gap-2 items-start">
              <Clock size={16} className="text-brand-teal shrink-0 mt-0.5" />
              <span className="font-sans text-xs font-semibold">{contactInfo.officeHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub footer - copyrights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="font-sans mb-2">
          © {new Date().getFullYear()} <strong>{orgName || "Success সমবায় সমিতি"}</strong>. সর্বস্বত্ব সংরক্ষিত।
        </p>
        <p className="font-sans text-[11px] text-slate-600">
          Success Group এর সহযোগী প্রতিষ্ঠান। কালিগঞ্জ, সাতক্ষীরা, বাংলাদেশ।
        </p>
      </div>
    </footer>
  );
}
