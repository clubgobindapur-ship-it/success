import React, { useState } from "react";
import { Phone, Mail, FileText, X, ShieldAlert } from "lucide-react";
import { CommitteeMember } from "../types";
import { trackEvent } from "../utils/analytics";
import { motion, AnimatePresence } from "motion/react";

interface CommitteeProps {
  members: CommitteeMember[];
}

export function Committee({ members }: CommitteeProps) {
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

  const handlePhoneClick = (member: CommitteeMember) => {
    trackEvent("committee_phone_click", {
      memberName: member.name,
      position: member.position,
      phone: member.phone
    });
  };

  const handleEmailClick = (member: CommitteeMember) => {
    trackEvent("committee_email_click", {
      memberName: member.name,
      position: member.position,
      email: member.email
    });
  };

  const handleBioClick = (member: CommitteeMember) => {
    setSelectedMember(member);
    trackEvent("committee_bio_view", {
      memberName: member.name,
      position: member.position
    });
  };

  return (
    <section id="committee" className="py-24 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            পরিচালনা পর্ষদ
          </h2>
          <p className="text-3xl font-extrabold text-brand-dark tracking-tight">
            আমাদের দক্ষ ও অভিজ্ঞ পরিচালনা কমিটি
          </p>
          <div className="w-16 h-1.5 bg-brand-teal mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-brand-light border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between transition duration-300"
            >
              <div>
                {/* Photo frame */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={member.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-80" />
                </div>

                {/* Member Identity */}
                <div className="p-6">
                  <h3 className="font-extrabold text-brand-dark text-sm md:text-base mb-1 font-sans tracking-wide">
                    {member.name}
                  </h3>
                  <span className="text-brand-teal text-xs font-bold block mb-3 font-sans uppercase">
                    {member.position}
                  </span>
                  
                  {/* Bio brief */}
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4 font-sans text-justify">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Communication Bar */}
              <div className="px-6 pb-6 pt-0 mt-auto flex flex-col gap-3">
                <div className="flex gap-2.5">
                  <a
                    href={`tel:${member.phone}`}
                    onClick={() => handlePhoneClick(member)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-brand-teal/5 border border-slate-200 hover:border-brand-teal/20 text-slate-700 hover:text-brand-teal text-xs font-semibold transition cursor-pointer"
                    title="কল করুন"
                  >
                    <Phone size={12} />
                    <span>কল করুন</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    onClick={() => handleEmailClick(member)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 transition cursor-pointer"
                    title="ইমেইল করুন"
                  >
                    <Mail size={12} />
                  </a>
                </div>
                
                {/* View Full Profile */}
                <button
                  onClick={() => handleBioClick(member)}
                  className="w-full py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-brand-teal/10"
                >
                  <FileText size={12} />
                  <span>পরিচিতি কার্ড</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Profile Card (Biographies Popup) */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black"
            />

            {/* Profile Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 font-sans flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-1.5 bg-slate-950/20 hover:bg-slate-950/40 text-white rounded-full transition cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Picture frame */}
              <div className="md:w-2/5 h-64 md:h-auto bg-slate-100 shrink-0">
                <img
                  src={selectedMember.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body Brief info */}
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-orange font-bold block mb-1">
                    পরিচালনা কমিটি সদস্য
                  </span>
                  <h3 className="text-xl font-bold text-brand-dark mb-1">{selectedMember.name}</h3>
                  <span className="text-slate-500 font-semibold text-xs block mb-4 border-b border-slate-100 pb-2">
                    {selectedMember.position}
                  </span>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 text-justify">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Contact shortcuts */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex gap-2 items-center text-slate-600">
                    <Phone size={14} className="text-brand-teal shrink-0" />
                    <span>ফোন: <strong>{selectedMember.phone}</strong></span>
                  </div>
                  <div className="flex gap-2 items-center text-slate-600">
                    <Mail size={14} className="text-brand-teal shrink-0" />
                    <span>ইমেইল: <strong>{selectedMember.email}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
