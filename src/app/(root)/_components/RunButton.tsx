"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    setError(null);

    try {
      await runCode();
      const result = getExecutionResult();

      if (!user) {
        setError("You must be logged in to save executions.");
        return;
      }

      if (!result || !result.code) {
        setError("No execution result found.");
        return;
      }

      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    } catch (err) {
      if (err instanceof Error && err.message.includes("Pro subscription required")) {
        setError("This language requires a Pro subscription.");
      } else {
        setError("An error occurred while saving the execution.");
      }
      console.error(err);
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden
        disabled:cursor-not-allowed disabled:opacity-70
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
      `}
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full 
        opacity-100 group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all duration-300"
      />
      <div
        className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative flex items-center gap-2">
        {isRunning ? (
          <>
            <div className="relative flex items-center justify-center w-5 h-5">
              <Loader2 className="w-5 h-5 animate-spin text-white/80" />
              <div className="absolute inset-0 bg-indigo-400/30 blur animate-pulse rounded-full" />
            </div>
            <span className="text-sm font-semibold text-white/90 tracking-tight">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-5 h-5">
              <Play
                className="w-5 h-5 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white"
              />
            </div>
            <span className="text-sm font-semibold text-white/90 group-hover:text-white tracking-tight">
              Run Code
            </span>
          </>
        )}
      </div>
      {error && (
        <span className="absolute -bottom-8 left-0 right-0 text-xs font-medium text-red-400 text-center tracking-tight">
          {error}
        </span>
      )}
    </motion.button>
  );
}

export default RunButton;