import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, Users, Star, Search, Plus, Eye, Pencil, Trash2, X, Clock, BookOpen } from "lucide-react";

const dummyCourses = [
  // Certificate Courses (8)
  {
    id: 101,
    title: "Full-Stack Web Development Bootcamp",
    category: "Technology",
    level: "Beginner",
    rating: 4.8,
    students: 12450,
    instructor: "Priya Sharma",
    duration: "42 hours",
    price: 4999,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 102,
    title: "Digital Marketing Masterclass 2025",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.7,
    students: 8920,
    instructor: "Rahul Verma",
    duration: "28 hours",
    price: 3999,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 103,
    title: "UI/UX Design Fundamentals with Figma",
    category: "Design",
    level: "Beginner",
    rating: 4.9,
    students: 6340,
    instructor: "Ananya Patel",
    duration: "35 hours",
    price: 4499,
    badge: "New",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 104,
    title: "Data Science & Machine Learning with Python",
    category: "Technology",
    level: "Advanced",
    rating: 4.6,
    students: 7100,
    instructor: "Vikram Singh",
    duration: "60 hours",
    price: 7999,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 105,
    title: "Content Strategy & SEO for Growth",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.5,
    students: 4200,
    instructor: "Meera Joshi",
    duration: "22 hours",
    price: 2999,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 106,
    title: "Graphic Design Masterclass — Photoshop to Illustrator",
    category: "Design",
    level: "Beginner",
    rating: 4.7,
    students: 5680,
    instructor: "Kavya Nair",
    duration: "38 hours",
    price: 3499,
    badge: "New",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 107,
    title: "Cybersecurity & Ethical Hacking",
    category: "Technology",
    level: "Advanced",
    rating: 4.8,
    students: 3450,
    instructor: "Arjun Mehta",
    duration: "48 hours",
    price: 5999,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  {
    id: 108,
    title: "AI & Machine Learning Masterclass",
    category: "Technology",
    level: "Intermediate",
    rating: 4.9,
    students: 15600,
    instructor: "Dr. Priya Nair",
    duration: "52 hours",
    price: 8999,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    programType: "Certificate",
  },
  // Master Degree Courses (4)
  {
    id: 201,
    title: "MBA Digital Business Management",
    category: "Marketing",
    level: "Degree",
    rating: 4.7,
    students: 2100,
    instructor: "Prof. Vikram Singh",
    duration: "24 months",
    price: 149999,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    programType: "Master Degree",
  },
  {
    id: 202,
    title: "Cloud Computing with AWS & Azure",
    category: "Technology",
    level: "Degree",
    rating: 4.6,
    students: 5200,
    instructor: "Rohan Desai",
    duration: "18 months",
    price: 129999,
    badge: "Degree Program",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    programType: "Master Degree",
  },
  {
    id: 203,
    title: "Master of Computer Applications (MCA)",
    category: "Technology",
    level: "Degree",
    rating: 4.8,
    students: 4800,
    instructor: "Prof. Arjun Mehta",
    duration: "24 months",
    price: 199999,
    badge: "Degree Program",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    programType: "Master Degree",
  },
  {
    id: 204,
    title: "MBA Data Science & Analytics",
    category: "Technology",
    level: "Degree",
    rating: 4.9,
    students: 3100,
    instructor: "Prof. Priya Nair",
    duration: "24 months",
    price: 179999,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    programType: "Master Degree",
  },
];

export default function CoursesAdminPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewCourse, setViewCourse] = useState(null);

  // Keep API fetch as comment/wrapped in fallback
  useEffect(() => {
    // Uncomment when backend is ready:
    // axios.get("/api/admin/courses")
    //   .then(r => setCourses(r.data.courses || []))
    //   .catch(() => setCourses(dummyCourses))
    //   .finally(() => setLoading(false));
    setCourses(dummyCourses);
    setLoading(false);
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(search.toLowerCase())
  );

  const totalEnrolled = courses.reduce((sum, c) => sum + (c.students || 0), 0);
  const avgRating = courses.length
    ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1)
    : "0.0";

  const programBadge = (type) => {
    if (type === "Master Degree") return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };

  const handleOpenAdd = () => {
    navigate('/admin/courses/new');
  };

  const handleOpenEdit = (course) => {
    navigate(`/admin/courses/${course.id}/edit`);
  };

  const handleOpenView = (course) => {
    setViewCourse(course);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <span className="text-sm font-bold block text-gray-900">Courses Administration</span>
          <span className="text-xs block text-gray-500">Manage all programs and course content</span>
        </div>

        {/* Top Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Courses */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-violet-100">
              <Layers size={22} className="text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{loading ? "—" : courses.length}</p>
              <p className="text-xs text-gray-500">Total Courses</p>
            </div>
          </div>

          {/* Total Enrolled */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-violet-100">
              <Users size={22} className="text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{loading ? "—" : totalEnrolled.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Enrolled</p>
            </div>
          </div>

          {/* Avg Rating */}
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-violet-100">
              <Star size={22} className="text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{loading ? "—" : avgRating}</p>
              <p className="text-xs text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Search + Add Button Row */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
            />
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Add New Course
          </button>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/70 backdrop-blur-md border border-white/40 rounded-xl">
            <BookOpen size={40} className="text-gray-400 mb-3" />
            <p className="text-gray-500 font-medium">No courses found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new course</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Course Image */}
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(course.title)}`;
                    }}
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                  {/* Program Type Badge */}
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${programBadge(course.programType)}`}>
                    {course.programType || "Certificate"}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {course.students?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      {course.level}
                    </span>
                  </div>

                  {/* Rating + Price */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {course.price >= 1000
                        ? `₹${(course.price / 1000).toFixed(0)}K`
                        : `₹${course.price}`}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 px-4 pb-4">
                  <button
                    onClick={() => handleOpenView(course)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium rounded-lg border border-gray-200 transition-colors"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium rounded-lg border border-gray-200 transition-colors"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Course Modal */}
      {showViewModal && viewCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"
            onClick={() => setShowViewModal(false)}
          />
          <div className="relative bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Course Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Course Image */}
            <div className="relative">
              <img
                src={viewCourse.image}
                alt={viewCourse.title}
                className="w-full aspect-video object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x340/f3f4f6/9ca3af?text=${encodeURIComponent(viewCourse.title)}`;
                }}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {viewCourse.category}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${programBadge(viewCourse.programType)}`}>
                  {viewCourse.programType || "Certificate"}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{viewCourse.title}</h3>
                <p className="text-sm text-gray-500">by {viewCourse.instructor}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-gray-800">{viewCourse.duration}</p>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Level</p>
                  <p className="text-sm font-semibold text-gray-800">{viewCourse.level}</p>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Students</p>
                  <p className="text-sm font-semibold text-gray-800">{viewCourse.students?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-gray-800">{viewCourse.rating}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="text-xl font-bold text-gray-900">
                  {viewCourse.price >= 1000
                    ? `₹${viewCourse.price.toLocaleString()}`
                    : `₹${viewCourse.price}`}
                </p>
              </div>

              {viewCourse.badge && (
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {viewCourse.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleOpenEdit(viewCourse);
                }}
                className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Edit Course
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 rounded-xl text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}