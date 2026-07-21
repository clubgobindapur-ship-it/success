import React, { useState, useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { GalleryItem } from "../types";
import { trackEvent } from "../utils/analytics";
import { motion, AnimatePresence } from "motion/react";

interface GalleryProps {
  items: GalleryItem[];
}

const ITEMS_PER_PAGE = 6;

export function GallerySection({ items }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Category list maps
  const categories = [
    { key: "all", label: "সকল ছবি" },
    { key: "plantation", label: "বৃক্ষরোপণ" },
    { key: "water", label: "বিশুদ্ধ পানি" },
    { key: "social", label: "সামাজিক কাজ" },
    { key: "events", label: "অনুষ্ঠানমালা" },
    { key: "meetings", label: "সভা ও সেমিনার" }
  ];

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Handle page calculation
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleCategoryChange = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setCurrentPage(1);
    trackEvent("gallery_filter_click", { category: categoryKey });
  };

  const openLightbox = (item: GalleryItem) => {
    // Find the index of the clicked item within the FILTERED list, so we can paginate inside lightbox
    const idx = filteredItems.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
      trackEvent("gallery_image_view", {
        imageId: item.id,
        imageTitle: item.title,
        category: item.category
      });
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) {
      const prevIdx = lightboxIndex - 1;
      setLightboxIndex(prevIdx);
      const prevItem = filteredItems[prevIdx];
      trackEvent("gallery_image_view", {
        imageId: prevItem.id,
        imageTitle: prevItem.title,
        category: prevItem.category,
        action: "prev"
      });
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
      const nextIdx = lightboxIndex + 1;
      setLightboxIndex(nextIdx);
      const nextItem = filteredItems[nextIdx];
      trackEvent("gallery_image_view", {
        imageId: nextItem.id,
        imageTitle: nextItem.title,
        category: nextItem.category,
        action: "next"
      });
    }
  };

  // Safe active image in lightbox
  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            ফটো গ্যালারি
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            আমাদের সেবামূলক কাজের কিছু চিত্ররূপ
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Category Filters Grid / Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-brand-light rounded-3xl border border-slate-200 max-w-lg mx-auto flex flex-col items-center gap-3">
            <ImageIcon className="text-slate-400" size={36} />
            <p className="text-slate-600 text-sm font-sans">এই ক্যাটাগরিতে কোনো ছবি খুঁজে পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => openLightbox(item)}
                className="group relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl cursor-pointer aspect-4/3 bg-slate-100 border border-slate-200 transition duration-300"
              >
                {/* Lazy loading images */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Animated Info overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] uppercase tracking-wider bg-brand-teal px-2.5 py-1 rounded-full font-bold">
                      {categories.find((c) => c.key === item.category)?.label || item.category}
                    </span>
                    <span className="text-[9px] text-slate-300">{item.date}</span>
                  </div>
                  <h4 className="font-extrabold text-sm leading-snug line-clamp-2 mb-3">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase">
                    <Eye size={14} />
                    <span>ছবি দেখুন</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-xl border transition ${
                currentPage === 1
                  ? "border-slate-100 text-slate-300 cursor-not-allowed"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              পাতা {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-xl border transition ${
                currentPage === totalPages
                  ? "border-slate-100 text-slate-300 cursor-not-allowed"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Backdrop Popup Overlay */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 md:p-8">
            {/* Close Lightbox */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer z-50"
            >
              <X size={20} />
            </button>

            {/* Nav Arrows */}
            {lightboxIndex !== null && lightboxIndex > 0 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer z-50"
                title="পূর্ববর্তী ছবি"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {lightboxIndex !== null && lightboxIndex < filteredItems.length - 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer z-50"
                title="পরবর্তী ছবি"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Main Lightbox Frame */}
            <div className="flex-1 flex items-center justify-center p-4">
              <motion.img
                key={activeLightboxItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[70vh] md:max-h-[80vh] max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Slide title info */}
            <div className="text-center text-white max-w-2xl mx-auto pb-4">
              <span className="text-[10px] tracking-wider uppercase bg-brand-teal px-3 py-1 rounded-full font-bold inline-block mb-3">
                {categories.find((c) => c.key === activeLightboxItem.category)?.label || activeLightboxItem.category}
              </span>
              <h4 className="text-base sm:text-lg font-bold leading-relaxed mb-2">
                {activeLightboxItem.title}
              </h4>
              <p className="text-xs text-slate-400">তারিখ: {activeLightboxItem.date}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
