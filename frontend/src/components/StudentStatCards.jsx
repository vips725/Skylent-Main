import { useState } from "react";
import { BookOpen, CheckCircle, Award } from "lucide-react";

const cards = [
  {
    label: "Courses Enrolled",
    icon: BookOpen,
    value: "12",
    change: "+3 new",
    changeType: "emerald",
    subtitle: "this month",
    tooltip: "Web Development, Data Science, UI/UX Design, Python Programming, Cloud Computing",
  },
  {
    label: "Lessons Done",
    icon: CheckCircle,
    value: "48",
    change: "+5 this week",
    changeType: "emerald",
    subtitle: "out of 120",
    tooltip: "Web Development, Data Science, UI/UX Design",
  },
  {
    label: "Certificates",
    icon: Award,
    value: "3",
    change: "+1 earned",
    changeType: "emerald",
    subtitle: "total",
    tooltip: "Web Development, Data Science, UI/UX Design",
  },
];

const StudentStatCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className="relative group p-5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition cursor-default"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}
          {hoveredIndex === index && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-stone-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
              {card.tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-700" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-stone-100 dark:bg-stone-700 rounded-lg">
              <card.icon className="w-5 h-5 text-stone-600 dark:text-stone-300" />
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wide">
                {card.label}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-stone-800 dark:text-stone-100">
              {card.value}
            </span>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-block px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full">
                {card.change}
              </span>
              <span className="text-xs text-stone-400 dark:text-stone-500">{card.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentStatCards;