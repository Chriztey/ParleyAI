import { dummyTranscript } from "../data/dummy";

export default function TranscriptSidebar() {
  return (
    <div className="relative flex flex-col rounded-3xl h-full max-h-screen backdrop-blur-xl bg-gradient-to-b from-slate-900/80 via-blue-900/70 to-gray-900/80 border border-white/10 shadow-2xl overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 right-1/3 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Inner gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

      {/* Fixed Header */}
      <div className="relative flex-shrink-0 p-6 pb-4 z-10">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl hover:bg-white/15 transition-all duration-300 group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <h3 className="relative font-bold text-white flex items-center gap-3 text-lg">
            <div className="relative">
              <div className="w-4 h-4 bg-green-400/80 rounded-full animate-pulse shadow-lg border border-green-300/50"></div>
              <div className="absolute inset-0 w-4 h-4 bg-green-400/40 rounded-full animate-ping"></div>
            </div>
            <span className="drop-shadow-sm">Chat History</span>
          </h3>
        </div>
      </div>

      {/* Scrollable Messages Container */}
      <div className="relative flex-1 min-h-0 overflow-y-auto px-6 pb-4 z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
        <div className="flex flex-col gap-4">
          {dummyTranscript.map((entry, idx) => {
            const isAI = entry.speaker === "AI";
            return (
              <div
                key={idx}
                className={`flex ${isAI ? "justify-start" : "justify-end"} group`}
              >
                <div
                  className={`relative max-w-[85%] backdrop-blur-md border shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                    isAI
                      ? "bg-blue-500/20 border-blue-400/30 text-white rounded-2xl rounded-bl-lg hover:bg-blue-500/30"
                      : "bg-green-500/20 border-green-400/30 text-white rounded-2xl rounded-br-lg hover:bg-green-500/30"
                  }`}
                >
                  {/* Inner gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isAI 
                      ? "from-blue-400/20 to-transparent" 
                      : "from-green-400/20 to-transparent"
                  }`}></div>
                  
                  <div className="relative z-10 p-5">
                    {/* Speaker and Time Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shadow-sm border ${
                          isAI 
                            ? "bg-blue-300/80 border-blue-200/50" 
                            : "bg-green-300/80 border-green-200/50"
                        }`}></div>
                        <span className="font-bold text-sm text-white/90 drop-shadow-sm">
                          {entry.speaker}
                        </span>
                      </div>
                      <span className="text-xs text-white/70 font-medium backdrop-blur-sm bg-black/20 px-2 py-1 rounded-full">
                        {entry.time}
                      </span>
                    </div>

                    {/* Message Text */}
                    <div className="text-sm leading-relaxed text-white/90 drop-shadow-sm">
                      {entry.text}
                    </div>
                  </div>

                  {/* Subtle inner border */}
                  <div className={`absolute inset-0 rounded-2xl border opacity-50 pointer-events-none ${
                    isAI ? "border-blue-300/20" : "border-green-300/20"
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="relative flex-shrink-0 px-6 pb-6 z-10">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-12 h-2 bg-gradient-to-r from-blue-400/60 via-green-400/60 to-indigo-400/60 rounded-full shadow-lg backdrop-blur-sm border border-white/20"></div>
            <div className="absolute inset-0 w-12 h-2 bg-gradient-to-r from-blue-400/30 via-green-400/30 to-indigo-400/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Subtle edge glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none"></div>
    </div>
  );
}