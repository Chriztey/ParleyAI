import { dummyMood } from "../data/dummy";

export default function MoodAnalysis() {
  return (
    <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-500/20 via-blue-600/15 to-indigo-600/20 border border-blue-300/30 shadow-2xl p-8 rounded-3xl h-full overflow-auto hover:bg-blue-500/25 transition-all duration-300 group">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Inner gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header with mood indicator */}
        <div className="flex items-center gap-4 mb-6">
          {/* Glass emoji container */}
          <div className="relative backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-4 shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
            <div className="text-5xl relative z-10 filter drop-shadow-sm">
              {dummyMood.emoji}
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg tracking-wide">
              {dummyMood.label}
            </h2>
            <span className="inline-flex items-center backdrop-blur-sm bg-blue-400/20 border border-blue-300/30 text-white px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:bg-blue-400/30 transition-all duration-300">
              {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg> */}
              Overall Emotion
            </span>
          </div>
        </div>

        {/* Glass description panel */}
        <div className="relative backdrop-blur-lg bg-white/15 border border-white/25 rounded-2xl p-6 shadow-xl hover:bg-white/20 transition-all duration-300 group/desc">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/desc:opacity-100 transition-opacity duration-300"></div>
          
          <p className="relative z-10 text-white/90 leading-relaxed text-lg font-medium drop-shadow-sm">
            {dummyMood.description}
          </p>
          
          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
        </div>

        {/* Animated progress bar with glass effect */}
        <div className="mt-6 relative">
          <div className="h-2 backdrop-blur-sm bg-blue-500/15 border border-blue-300/30 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-400/80 via-indigo-400/80 to-purple-400/80 rounded-full shadow-lg animate-pulse backdrop-blur-sm border border-blue-300/40" 
                 style={{
                   background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.8) 0%, rgba(129, 140, 248, 0.8) 50%, rgba(168, 85, 247, 0.8) 100%)',
                   animation: 'shimmer 3s ease-in-out infinite'
                 }}>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-50 group-hover:opacity-75 transition-opacity duration-300">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full animate-ping delay-300"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full animate-ping delay-700"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); opacity: 0.6; }
          50% { transform: translateX(100%); opacity: 1; }
        }
      `}</style>
    </div>
  );
}