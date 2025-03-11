

import { Terminal } from "lucide-react";

export function EditorPanelSkeleton() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 rounded-2xl blur-3xl -z-10" />
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md rounded-2xl border border-gray-700/50 p-4 sm:p-6 shadow-lg h-[50vh] sm:h-[60vh] lg:h-[600px]">
        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-inner h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
          <div className="h-full bg-gray-800/50 backdrop-blur-sm p-4 overflow-hidden">
            {/* Code line skeletons with animation */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-3 animate-pulse">
                <div className="w-12 h-4 bg-gray-700/50 rounded-md" />
                <div
                  className="h-4 bg-gray-700/50 rounded-md transition-all duration-1000"
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 flex justify-end">
          <div className="w-40 h-6 bg-gray-700/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/80 border border-gray-600/50 shadow-sm transition-transform hover:scale-105">
              <Terminal className="w-5 h-5 text-indigo-400/70" />
            </div>
            <div className="w-20 h-4 bg-gray-700/50 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Output Area Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl -z-10" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 h-[50vh] sm:h-[60vh] lg:h-[600px] shadow-inner">
            <div className="flex items-center justify-center h-full">
              <div className="text-center animate-pulse">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-700/50 rounded-full transition-all duration-300" />
                <div className="w-56 h-4 mx-auto bg-gray-700/50 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}