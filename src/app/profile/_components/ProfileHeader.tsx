import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Activity, Code2, Star, Timer, TrendingUp, Trophy, UserIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Id } from "../../../../convex/_generated/dataModel";
import { UserResource } from "@clerk/types";

interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    proSince?: number;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}

function ProfileHeader({ userStats, userData, user }: ProfileHeaderProps) {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      description: "Total code runs",
      metric: {
        label: "Last 24h",
        value: userStats?.last24Hours ?? 0,
        icon: Timer,
      },
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      description: "Saved for later",
      metric: {
        label: "Most starred",
        value: userStats?.mostStarredLanguage ?? "N/A",
        icon: Trophy,
      },
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      color: "from-purple-500 to-pink-500",
      description: "Different languages",
      metric: {
        label: "Most used",
        value: userStats?.favoriteLanguage ?? "N/A",
        icon: TrendingUp,
      },
    },
  ];

  return (
    <div className="relative mb-8 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-6 sm:p-8 border border-gray-800/50 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />

      {/* Profile Info */}
      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          {/* Profile Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-gray-800/50 relative z-10 group-hover:scale-105 transition-transform"
          />
          {userData.isPro && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-full z-20 shadow-lg animate-pulse">
              <Zap className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{userData.name}</h1>
            {userData.isPro && (
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs sm:text-sm font-medium">
                Pro Member
              </span>
            )}
          </div>
          <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1">
            <UserIcon className="w-4 h-4" />
            {userData.email}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {STATS.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-black/40 to-black/20 rounded-2xl overflow-hidden p-4 sm:p-6"
          >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-all duration-500`} />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-gray-400">{stat.description}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Additional Metric */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-800/50">
                <stat.metric.icon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">{stat.metric.label}:</span>
                <span className="text-xs font-medium text-white">{stat.metric.value}</span>
              </div>
            </div>

            {/* Subtle Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProfileHeader;
