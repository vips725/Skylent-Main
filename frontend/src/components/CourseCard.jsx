import { Link } from 'react-router-dom';
import { Star, Users, Clock, TrendingUp } from 'lucide-react';

const badgeColors = {
  Bestseller: 'bg-orange-100 text-orange-700',
  Hot: 'bg-red-100 text-red-700',
  Popular: 'bg-purple-100 text-purple-700',
  Premium: 'bg-yellow-100 text-yellow-700',
  New: 'bg-green-100 text-green-700',
  Trending: 'bg-blue-100 text-blue-700',
};

export default function CourseCard({ course }) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  return (
    <Link to={`/courses/${course.id}`} className="card group cursor-pointer overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {course.badge && (
          <span className={`absolute top-3 left-3 badge ${badgeColors[course.badge] || 'bg-gray-100 text-gray-700'}`}>
            {course.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 badge bg-green-500 text-white">{discount}% OFF</span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2">{course.category}</span>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} /> {course.students.toLocaleString()}</span>
          <span className="flex items-center gap-1"><TrendingUp size={11} /> {course.level}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
          <span className="text-xs text-gray-400">({course.students.toLocaleString()} students)</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-lg text-gray-900">₹{course.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
          </div>
          <span className="text-xs bg-brand-50 text-brand-600 font-semibold px-2.5 py-1 rounded-lg">Enroll Now</span>
        </div>
      </div>
    </Link>
  );
}
