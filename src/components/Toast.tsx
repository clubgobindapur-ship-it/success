import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, description: string) => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, title: string, description: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    
    // Automatically dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, toasts, dismissToast }}>
      {children}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={`p-4 rounded-xl shadow-lg border pointer-events-auto flex gap-3 items-start justify-between bg-white text-slate-800 ${
                toast.type === "success"
                  ? "border-teal-100 bg-teal-50/95"
                  : toast.type === "error"
                  ? "border-rose-100 bg-rose-50/95"
                  : "border-blue-100 bg-blue-50/95"
              }`}
            >
              <div className="flex gap-3">
                {toast.type === "success" && (
                  <CheckCircle className="text-teal-600 shrink-0 mt-0.5" size={20} />
                )}
                {toast.type === "error" && (
                  <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
                )}
                {toast.type === "info" && (
                  <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
                )}
                <div>
                  <h4 className="font-semibold text-sm text-slate-950 font-sans tracking-wide">
                    {toast.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-sans leading-relaxed">
                    {toast.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-slate-700 transition"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
