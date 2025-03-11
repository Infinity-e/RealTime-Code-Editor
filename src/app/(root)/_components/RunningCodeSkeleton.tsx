const RunningCodeSkeleton = () => (
  <div className="space-y-6 animate-pulse px-2 sm:px-4">
    <div className="space-y-3">
      <div className="h-4 bg-gray-700/60 rounded-full w-3/4 transition-all duration-1000" />
      <div className="h-4 bg-gray-700/60 rounded-full w-1/2 transition-all duration-1000" />
      <div className="h-4 bg-gray-700/60 rounded-full w-5/6 transition-all duration-1000" />
    </div>

    <div className="space-y-3 pt-4">
      <div className="h-4 bg-gray-700/60 rounded-full w-2/3 transition-all duration-1000" />
      <div className="h-4 bg-gray-700/60 rounded-full w-4/5 transition-all duration-1000" />
      <div className="h-4 bg-gray-700/60 rounded-full w-3/4 transition-all duration-1000" />
    </div>
  </div>
);

export default RunningCodeSkeleton;