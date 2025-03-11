"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Sparkles } from "lucide-react";

// Fallback implementation of useMounted if not defined
const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language] ?? LANGUAGE_CONFIG["javascript"]; // Fallback

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId: string) => {
    setLanguage(langId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 py-2 bg-gray-800/80 rounded-full 
        transition-all duration-300 border border-gray-700/50 hover:border-indigo-500/50 shadow-md"
      >
        <div
          className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        />
        <div className="size-7 rounded-full bg-gray-900/50 p-1 group-hover:scale-105 transition-transform">
          <Image
            src={currentLanguageObj.logoPath}
            alt={`${currentLanguageObj.label} logo`}
            width={24}
            height={24}
            className="w-full h-full object-contain relative z-10"
          />
        </div>
        <span className="text-gray-200 min-w-[80px] text-sm font-medium text-left group-hover:text-indigo-200 
        transition-colors tracking-tight">
          {currentLanguageObj.label}
        </span>
        <ChevronDownIcon
          className={`size-5 text-gray-400 transition-all duration-300 group-hover:text-indigo-300
            ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md
            rounded-xl border border-gray-700/50 shadow-xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-700/50">
              <p className="text-xs font-medium text-gray-400 tracking-tight">Select Language</p>
            </div>
            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 
            scrollbar-track-gray-800">
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => (
                <motion.div
                  key={lang.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group px-2"
                >
                  <button
                    className={`
                      relative w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                      ${language === lang.id ? "bg-indigo-500/20 text-indigo-300" : "text-gray-300"}
                      hover:bg-indigo-500/30
                    `}
                    onClick={() => handleLanguageSelect(lang.id)}
                  >
                    <div
                      className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                    />
                    <div
                      className={`
                        relative size-8 rounded-full p-1.5 group-hover:scale-105 transition-transform
                        ${language === lang.id ? "bg-indigo-500/20" : "bg-gray-800/50"}
                      `}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <Image
                        width={24}
                        height={24}
                        src={lang.logoPath}
                        alt={`${lang.label} logo`}
                        className="w-full h-full object-contain relative z-10"
                      />
                    </div>
                    <span className="flex-1 text-sm font-medium text-left group-hover:text-indigo-200 
                    transition-colors tracking-tight">
                      {lang.label}
                    </span>
                    {language === lang.id && (
                      <>
                        <motion.div
                          className="absolute inset-0 border-2 border-indigo-500/40 rounded-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                        <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;