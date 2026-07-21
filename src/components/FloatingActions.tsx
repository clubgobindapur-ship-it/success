import React, { useState, useEffect } from "react";
import { ArrowUp, Phone, Send } from "lucide-react";
import { trackEvent } from "../utils/analytics";
import { ContactInfo } from "../types";

interface FloatingActionsProps {
  contactInfo: ContactInfo;
}

export function FloatingActions({ contactInfo }: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of Back-to-Top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    trackEvent("scroll_to_top_click", { page: "home" });
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", {
      number: contactInfo.whatsapp,
      label: "Floating Action Button"
    });
    // Sanitize phone number for direct link (e.g. removing non-numeric characters)
    const whatsappNum = contactInfo.whatsapp.replace(/[^0-9+]/g, "");
    window.open(`https://wa.me/${whatsappNum}`, "_blank", "noopener,noreferrer");
  };

  const handleCallClick = () => {
    trackEvent("call_button_click", {
      number: contactInfo.phone,
      label: "Floating Action Button"
    });
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleMessengerClick = () => {
    trackEvent("messenger_click", {
      fbUrl: contactInfo.facebook,
      label: "Floating Action Button"
    });
    // Fallback to facebook page if username isn't a direct m.me link
    window.open(contactInfo.facebook, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3">
      {/* Scroll to Top */}
      {isVisible && (
        <button
          id="btn-scroll-to-top"
          onClick={scrollToTop}
          className="w-11 h-11 flex items-center justify-center bg-brand-dark hover:bg-black text-white rounded-full shadow-lg transition duration-300 hover:-translate-y-1 cursor-pointer"
          title="উপরে যান"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Direct Phone Call */}
      <button
        id="btn-call-float"
        onClick={handleCallClick}
        className="w-11 h-11 flex items-center justify-center bg-brand-blue hover:bg-blue-700 text-white rounded-full shadow-lg transition duration-300 hover:-translate-y-1 cursor-pointer"
        title="সরাসরি কল করুন"
      >
        <Phone size={20} />
      </button>

      {/* Facebook Messenger */}
      <button
        id="btn-messenger-float"
        onClick={handleMessengerClick}
        className="w-11 h-11 flex items-center justify-center bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full shadow-lg transition duration-300 hover:-translate-y-1 cursor-pointer"
        title="ফেসবুক পেজ"
      >
        <Send size={18} className="rotate-45 -translate-x-0.5" />
      </button>

      {/* WhatsApp Chat */}
      <button
        id="btn-whatsapp-float"
        onClick={handleWhatsAppClick}
        className="w-11 h-11 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition duration-300 hover:-translate-y-1 cursor-pointer"
        title="হোয়াটসঅ্যাপে যোগাযোগ"
      >
        {/* Simple inline representation of Whatsapp Icon since we import standard lucide */}
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.514.001 9.993-4.479 9.996-9.961.003-5.462-4.435-9.901-9.91-9.901-5.483 0-9.943 4.456-9.947 9.918-.002 1.83.5 3.61 1.45 5.16L1.83 22.2l5.01-1.315zM17.43 14.6c-.29-.15-1.74-.86-2.01-.96-.28-.1-.48-.15-.68.15-.2.3-.77.96-.94 1.16-.18.2-.35.23-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.25-.6-.5-.52-.68-.53-.18-.01-.38-.01-.58-.01-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44s1.05 2.84 1.2 3.03c.15.19 2.07 3.16 5.02 4.44.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.11.57-.08 1.74-.71 1.98-1.4.24-.7.24-1.3.17-1.42-.08-.12-.28-.19-.58-.34z" />
        </svg>
      </button>
    </div>
  );
}
