import { dummyMood } from "../data/dummy";

export default function MoodAnalysis() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg p-6 rounded-xl h-full overflow-auto">
      {/* Header with mood indicator */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl bg-white rounded-full p-3 shadow-sm">
          {dummyMood.emoji}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {dummyMood.label}
          </h2>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            Overall Emotion
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
        <p className="text-gray-700 leading-relaxed text-base">
          {dummyMood.description}
        </p>
      </div>

      {/* Optional: Add a subtle animation */}
      <div className="mt-4 h-1 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 rounded-full"></div>
    </div>
  );
}