"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.split("\n");
  const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 sm:p-4 bg-[#1e1e2e] border border-white/10 rounded-lg shadow-lg shadow-black/30">
      {/* Code Display */}
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={atomOneDark}
        customStyle={{
          padding: "1rem",
          borderRadius: "0.5rem",
          background: "rgba(15, 15, 20, 0.8)", // Glassmorphism
          overflowX: "auto",
          fontSize: "0.9rem",
        }}
      >
        {displayCode}
      </SyntaxHighlighter>

      {/* Show More / Show Less Button */}
      {lines.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 right-2 px-3 py-1 text-xs text-blue-400 bg-blue-500/20 backdrop-blur-md 
          rounded-lg flex items-center gap-1 hover:bg-blue-500/30 transition-all shadow-md shadow-blue-500/10"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;
