"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react"; // Added for error state

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);
  const [error, setError] = useState<string | null>(null); // Track execution errors

  const handleRun = async () => {
    setError(null); // Reset error state

    try {
      await runCode(); // Ensure the code runs first
      const result = getExecutionResult(); // Get the execution result after it finishes

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
        group relative inline-flex items-center gap-2.5 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
    >
      {/* bg with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
      {error && (
        <span className="absolute -bottom-8 text-xs text-red-500">{error}</span>
      )}
    </motion.button>
  );
}

export default RunButton;
