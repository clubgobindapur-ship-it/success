import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Lock, Mail, ShieldCheck, AlertTriangle, Key, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "../components/Toast";
import { trackEvent } from "../utils/analytics";

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToast("error", "ত্রুটি!", "ইমেইল ও পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showToast("success", "লগইন সফল!", "এডমিন ড্যাশবোর্ডে স্বাগতম।");
      trackEvent("admin_login_success", { email });
      onLoginSuccess(userCredential.user);
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      
      // Guide the user specifically based on Firebase response codes
      let message = "লগইন করতে ব্যর্থ হয়েছে। পাসওয়ার্ড বা ইমেইল চেক করুন।";
      if (error.code === "auth/user-not-found") {
        message = "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট খুঁজে পাওয়া যায়নি। অনুগ্রহ করে নিচে দেওয়া অ্যাকাউন্ট তৈরির গাইডটি দেখুন।";
      } else if (error.code === "auth/wrong-password") {
        message = "ভুল পাসওয়ার্ড। দয়া করে সঠিক পাসওয়ার্ড দিন।";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Firebase এ Email/Password Authentication সক্ষম (Enabled) করা নেই।";
      }

      showToast("error", "লগইন ব্যর্থ!", message);
      trackEvent("admin_login_failed", { email, code: error.code });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-brand-light font-sans flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden mb-8">
        {/* Banner header */}
        <div className="bg-brand-dark p-8 text-center relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-2xl" />
          <div className="w-12 h-12 bg-brand-teal/20 text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-teal/30">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-xl font-extrabold tracking-wide">Success সমবায় সমিতি</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Lightweight CMS Admin Portal</p>
        </div>

        {/* Form panel */}
        <form onSubmit={handleLogin} className="p-6 md:p-8 flex flex-col gap-5">
          {/* Email input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              অ্যাডমিন ইমেইল
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@success-samabay.org"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/10 focus:border-brand-teal transition font-medium"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              অ্যাডমিন পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/10 focus:border-brand-teal transition font-medium"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-brand-teal/15 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>যাচাই করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <Lock size={14} />
                <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
