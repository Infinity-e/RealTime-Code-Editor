"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);

    try {
      const code = getCode();
      if (!code) {
        throw new Error("No code to share");
      }
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully");
    } catch (error) {
      console.error("Error creating snippet:", error);
      toast.error(error instanceof Error ? error.message : "Error creating snippet");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-[#1e1e2e] shadow-xl shadow-black/40 rounded-2xl p-6 w-full max-w-md border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">🚀 Share Your Snippet</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleShare}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
                Snippet Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-md hover:shadow-blue-500/30"
                placeholder="Enter snippet title"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSharing}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSharing ? "Sharing..." : "Share"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      <Toaster position="top-right" />
    </>
  );
}

export default ShareSnippetDialog;
