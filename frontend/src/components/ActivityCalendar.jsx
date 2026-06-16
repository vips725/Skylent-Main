import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Seeded pseudo-random for deterministic data
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateMockData = () => {
  const data = {};
  const today = new Date();

  // Generate 3 months of data (past 90 days)
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay();

    const seed = date.getTime() / 1000000;
    const rand = seededRandom(seed);

    let hours = 0;
    // Weekdays more active, weekends less
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekends - lower activity
      hours = rand > 0.5 ? +(Math.random() * 2).toFixed(1) : 0;
    } else {
      // Weekdays - higher activity with some gaps
      if (rand > 0.15) { // 85% chance of activity
        hours = +(Math.random() * 5 + 0.5).toFixed(1);
      }
    }

    data[dateStr] = hours;
  }

  return data;
};

const StudyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // June 2026
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const studyData = useMemo(() => generateMockData(), []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  const getStudyHours = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return studyData[dateStr] || 0;
  };

  const getIntensityClass = (hours) => {
    if (hours === 0) return "";
    if (hours >= 4) return "bg-green-300 dark:bg-green-700/50";
    if (hours >= 2) return "bg-green-200 dark:bg-green-800/40";
    return "bg-green-100 dark:bg-green-900/30";
  };

  const getCheckClass = (hours) => {
    if (hours === 0) return "";
    if (hours >= 4) return "text-green-600 dark:text-green-400";
    if (hours >= 2) return "text-green-500 dark:text-green-500";
    return "text-green-400 dark:text-green-600";
  };

  const calendarDays = [];

  // Padding days from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    calendarDays.push({
      day: dayNum,
      date: new Date(prevYear, prevMonth, dayNum),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Padding days from next month to complete the grid
  const remaining = 42 - calendarDays.length; // 6 rows * 7 days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      day: i,
      date: new Date(nextYear, nextMonth, i),
      isCurrentMonth: false,
    });
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const handleMouseEnter = (e, dayInfo) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay(dayInfo);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md border border-white/40 dark:border-stone-700/40 shadow-lg rounded-xl p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {MONTHS[month]} {year}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevMonth}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-stone-600 dark:text-stone-400"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-stone-600 dark:text-stone-400"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-stone-500 dark:text-stone-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayInfo, idx) => {
          const hours = getStudyHours(dayInfo.date);
          const isToday = isCurrentMonth && dayInfo.day === todayDate && dayInfo.isCurrentMonth;
          const intensityClass = getIntensityClass(hours);
          const checkClass = getCheckClass(hours);

          return (
            <div
              key={idx}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer
                transition-all duration-200 group
                ${intensityClass}
                ${isToday ? "ring-2 ring-violet-500" : ""}
                ${!dayInfo.isCurrentMonth ? "opacity-30" : ""}
                hover:ring-2 hover:ring-violet-400 dark:hover:ring-violet-500
              `}
              onMouseEnter={(e) => handleMouseEnter(e, { ...dayInfo, hours })}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`
                text-xs font-medium
                ${dayInfo.isCurrentMonth ? "text-stone-800 dark:text-stone-200" : "text-stone-400 dark:text-stone-600"}
                ${isToday ? "font-bold" : ""}
              `}>
                {dayInfo.day}
              </span>
              {hours > 0 && (
                <Check className={`w-3 h-3 ${checkClass} mt-0.5`} strokeWidth={3} />
              )}
            </div>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          {hoveredDay.hours > 0
            ? `Studied ${hoveredDay.hours} hour${hoveredDay.hours !== 1 ? "s" : ""}`
            : "No study recorded"}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-stone-200 dark:border-stone-700">
        <span className="text-xs text-stone-500 dark:text-stone-400">Study intensity:</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-green-400 dark:text-green-600" strokeWidth={3} />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">0.5-2h</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-800/40 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-green-500" strokeWidth={3} />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">2-4h</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-green-300 dark:bg-green-700/50 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-green-600 dark:text-green-400" strokeWidth={3} />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">4h+</span>
        </div>
      </div>
    </div>
  );
};

export default StudyCalendar;