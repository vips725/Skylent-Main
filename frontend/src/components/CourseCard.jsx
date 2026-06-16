import { Link } from 'react-router-dom';
import { Star, Users, Clock, BarChart2 } from 'lucide-react';

const badgeColors = {
  Bestseller: 'bg-amber-100 text-amber-700',
  Hot: 'bg-red-100 text-red-700',
  Popular: 'bg-blue-100 text-blue-700',
  Premium: 'bg-yellow-100 text-yellow-700',
  New: 'bg-emerald-100 text-emerald-700',
  Trending: 'bg-blue-100 text-blue-700',
  'Degree Program': 'bg-blue-100 text-blue-700',
};

export default function CourseCard({ course, theme }) {

  return (
    <Link
      to={`/courses/${course.id}`}
      className="card group cursor-pointer overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {course.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
              badgeColors[course.badge] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {course.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider mb-2 text-blue-500">
          {course.category}
        </span>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 transition-colors line-clamp-2 group-hover:text-blue-600">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} /> {course.duration}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Users size={11} /> {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <BarChart2 size={11} /> {course.level}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
          <span className="text-xs text-gray-400">({course.students.toLocaleString()} students)</span>
        </div>

        {/* Semester Plan section - only for Master Degree */}
        {course.programType === 'Master Degree' && course.semesterPlan && course.semesterPlan.length > 0 && (
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="grid grid-cols-2 gap-3">
              {course.semesterPlan.filter(s => s.sem <= 2).map((semester) => (
                <div key={semester.sem}>
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-1.5 tracking-wide">
                    Semester {semester.sem}
                  </h4>
                  <ul className="space-y-1">
                    {semester.subjects.map((subject, si) => (
                      <li key={si} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                        <span className="leading-tight">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enroll badge */}
        <div className="mt-auto pt-1">
          <span className="bg-blue-50 text-blue-600 font-semibold px-3 py-1.5 rounded-lg text-xs inline-block transition-colors duration-200">
            Enroll Now
          </span>
        </div>
      </div>
    </Link>
  );
}