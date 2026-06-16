import { useDarkMode } from "../context/DarkModeContext";
import { Flame, TrendingUp, MessageSquare } from "lucide-react";

const quotes = [
  "The journey of a thousand miles begins with a single step.",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  "An investment in knowledge pays the best interest.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
  "Knowledge is power. Information is liberating. Education is the premise of progress.",
  "Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young.",
];

const getGreeting = (hour) => {
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const GreetingPanel = () => {
  const { isDark } = useDarkMode();
  const hour = new Date().getHours();
  const greeting = getGreeting(hour);
  const quoteIndex = new Date().getDate() % quotes.length;
  const quote = quotes[quoteIndex];

  return (
    <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md border border-white/40 dark:border-stone-700/40 shadow-lg rounded-xl p-6">
      <div className="flex items-start justify-between gap-4">
        {/* Left side: greeting + quote */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
            {greeting}, Alex!
          </h2>
          <div className="flex items-start gap-2 mt-3">
            <MessageSquare className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-1 flex-shrink-0" />
            <p className="text-sm italic text-stone-600 dark:text-stone-300 leading-relaxed">
              {quote}
            </p>
          </div>
        </div>

        {/* Right side: streak */}
        <div className="flex flex-col items-center gap-1 px-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            <span className="text-3xl font-bold text-stone-800 dark:text-stone-100">15</span>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Active Days Streak
          </span>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs text-stone-500 dark:text-stone-400">Keep it up!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingPanel;