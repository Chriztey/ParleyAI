import { dummyTranscript } from "../data/dummy";

export default function TranscriptSidebar() {
  return (
    <div className="flex flex-col rounded-xl h-full max-h-screen bg-gradient-to-b from-slate-50 to-gray-100">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pb-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Chat History
          </h3>
        </div>
      </div>

      {/* Scrollable Messages Container - Key fix here */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-3">
          {dummyTranscript.map((entry, idx) => {
            const isAI = entry.speaker === "AI";
            return (
              <div
                key={idx}
                className={`flex ${isAI ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                    isAI
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-bl-md"
                      : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md"
                  }`}
                >
                  {/* Speaker and Time Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        isAI ? "bg-blue-200" : "bg-emerald-200"
                      }`}></div>
                      <span className="font-bold text-sm opacity-90">
                        {entry.speaker}
                      </span>
                    </div>
                    <span className="text-xs opacity-75 font-medium">
                      {entry.time}
                    </span>
                  </div>

                  {/* Message Text */}
                  <div className="text-sm leading-relaxed">
                    {entry.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex-shrink-0 px-4 pb-4">
        <div className="flex justify-center">
          <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
}