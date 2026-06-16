import { useState, useEffect } from 'react';
import { Search, Award, GraduationCap, ChevronDown, Wand2, Check } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const sortOptions = ['Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low', 'Newest'];

const dummyCourses = [
  // Certificate Courses (8)
  {
    id: 101,
    title: 'Full-Stack Web Development Bootcamp',
    category: 'Technology',
    level: 'Beginner',
    rating: 4.8,
    students: 12450,
    instructor: 'Priya Sharma',
    duration: '42 hours',
    price: 4999,
    originalPrice: 12999,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 102,
    title: 'Digital Marketing Masterclass 2025',
    category: 'Marketing',
    level: 'Intermediate',
    rating: 4.7,
    students: 8920,
    instructor: 'Rahul Verma',
    duration: '28 hours',
    price: 3999,
    originalPrice: 9999,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 103,
    title: 'UI/UX Design Fundamentals with Figma',
    category: 'Design',
    level: 'Beginner',
    rating: 4.9,
    students: 6340,
    instructor: 'Ananya Patel',
    duration: '35 hours',
    price: 4499,
    originalPrice: 11999,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 104,
    title: 'Data Science & Machine Learning with Python',
    category: 'Technology',
    level: 'Advanced',
    rating: 4.6,
    students: 7100,
    instructor: 'Vikram Singh',
    duration: '60 hours',
    price: 7999,
    originalPrice: 19999,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 105,
    title: 'Content Strategy & SEO for Growth',
    category: 'Marketing',
    level: 'Intermediate',
    rating: 4.5,
    students: 4200,
    instructor: 'Meera Joshi',
    duration: '22 hours',
    price: 2999,
    originalPrice: 7999,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 106,
    title: 'Graphic Design Masterclass — Photoshop to Illustrator',
    category: 'Design',
    level: 'Beginner',
    rating: 4.7,
    students: 5680,
    instructor: 'Kavya Nair',
    duration: '38 hours',
    price: 3499,
    originalPrice: 9999,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 107,
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Technology',
    level: 'Advanced',
    rating: 4.8,
    students: 3450,
    instructor: 'Arjun Mehta',
    duration: '48 hours',
    price: 5999,
    originalPrice: 14999,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  {
    id: 108,
    title: 'AI & Machine Learning Masterclass',
    category: 'Technology',
    level: 'Intermediate',
    rating: 4.9,
    students: 15600,
    instructor: 'Dr. Priya Nair',
    duration: '52 hours',
    price: 8999,
    originalPrice: 24999,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    programType: 'Certificate',
  },
  // Master Degree Courses (4)
  {
    id: 201,
    title: 'MBA Digital Business Management',
    category: 'Marketing',
    level: 'Degree',
    rating: 4.7,
    students: 2100,
    instructor: 'Prof. Vikram Singh',
    duration: '24 months',
    price: 149999,
    originalPrice: 299999,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    programType: 'Master Degree',
    semesterPlan: [
      { sem: 1, subjects: ['Digital Strategy', 'Marketing Analytics', 'Consumer Behavior', 'Financial Management'] },
      { sem: 2, subjects: ['E-Commerce Management', 'Brand Building', 'Operations Management', 'Entrepreneurship'] },
      { sem: 3, subjects: ['Industry Project', 'Leadership'] },
      { sem: 4, subjects: ['Capstone', 'Dissertation'] },
    ],
  },
  {
    id: 202,
    title: 'Cloud Computing with AWS & Azure',
    category: 'Technology',
    level: 'Degree',
    rating: 4.6,
    students: 5200,
    instructor: 'Rohan Desai',
    duration: '18 months',
    price: 129999,
    originalPrice: 249999,
    badge: 'Degree Program',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
    programType: 'Master Degree',
    semesterPlan: [
      { sem: 1, subjects: ['Cloud Fundamentals', 'AWS Core Services', 'Azure Administration', 'DevOps Practices'] },
      { sem: 2, subjects: ['Kubernetes & Docker', 'Serverless Architecture', 'Cloud Security', 'Advanced Networking'] },
      { sem: 3, subjects: ['Industry Project', 'Leadership'] },
      { sem: 4, subjects: ['Capstone', 'Dissertation'] },
    ],
  },
  {
    id: 203,
    title: 'Master of Computer Applications (MCA)',
    category: 'Technology',
    level: 'Degree',
    rating: 4.8,
    students: 4800,
    instructor: 'Prof. Arjun Mehta',
    duration: '24 months',
    price: 199999,
    originalPrice: 399999,
    badge: 'Degree Program',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    programType: 'Master Degree',
    semesterPlan: [
      { sem: 1, subjects: ['Advanced Algorithms', 'Database Systems', 'Software Engineering', 'Web Technologies'] },
      { sem: 2, subjects: ['Machine Learning', 'Cloud Computing', 'Mobile App Development', 'Project Management'] },
      { sem: 3, subjects: ['Industry Project', 'Leadership'] },
      { sem: 4, subjects: ['Capstone', 'Dissertation'] },
    ],
  },
  {
    id: 204,
    title: 'MBA Data Science & Analytics',
    category: 'Technology',
    level: 'Degree',
    rating: 4.9,
    students: 3100,
    instructor: 'Prof. Priya Nair',
    duration: '24 months',
    price: 179999,
    originalPrice: 349999,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    programType: 'Master Degree',
    semesterPlan: [
      { sem: 1, subjects: ['Statistical Methods', 'Data Mining', 'Python for Data Science', 'SQL & Databases'] },
      { sem: 2, subjects: ['Deep Learning', 'Big Data Analytics', 'Business Intelligence', 'Predictive Modeling'] },
      { sem: 3, subjects: ['Industry Project', 'Leadership'] },
      { sem: 4, subjects: ['Capstone', 'Dissertation'] },
    ],
  },
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Most Popular');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('certificates');
  const [degreeType, setDegreeType] = useState('master');

  useEffect(() => {
    axios.get('/api/courses')
      .then(r => {
        const apiCourses = r.data.courses || [];
        const allCourses = apiCourses.length > 0 ? apiCourses : dummyCourses;
        setCourses(allCourses);
        setFiltered(allCourses);
      })
      .catch(() => {
        setCourses(dummyCourses);
        setFiltered(dummyCourses);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...courses];

    // Filter by section
    if (activeSection === 'certificates') {
      result = result.filter(c => c.programType === 'Certificate');
    } else if (activeSection === 'degrees' && degreeType === 'master') {
      result = result.filter(c => c.programType === 'Master Degree');
    } else if (activeSection === 'degrees' && degreeType === 'bachelor') {
      result = [];
    }

    if (search) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'Highest Rated') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.students - a.students);

    setFiltered(result);
  }, [courses, search, activeSection, degreeType, sort]);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header */}
      <div className="mesh-bg border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-brand-600 mb-3">Explore Our Programs</h1>
            <p className="text-gray-500 text-lg">Industry-ready courses designed with 50+ hiring partners</p>
          </div>
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses, skills, or topics..."
              className="w-full border border-gray-200 bg-white rounded-2xl pl-12 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 shadow-sm text-sm"
            />
          </div>
        </div>
      </div>

      {/* CTA Section Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500">
          {/* Professional Certificates Card */}
          <button
            onClick={() => { setActiveSection('certificates'); setSearch(''); }}
            className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              activeSection === 'certificates'
                ? 'bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-200/50'
                : 'bg-white text-gray-800 shadow-lg border border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="flex items-start gap-5">
              <div className={`p-4 rounded-2xl ${activeSection === 'certificates' ? 'bg-white/20' : 'bg-blue-50'}`}>
                <Award size={32} className={activeSection === 'certificates' ? 'text-white' : 'text-blue-500'} />
              </div>
              <div className="flex-1">
                <h3 className={`font-display text-xl font-bold mb-2 ${activeSection === 'certificates' ? 'text-white' : 'text-gray-900'}`}>
                  Professional Certificates
                </h3>
                <p className={`text-sm ${activeSection === 'certificates' ? 'text-blue-100' : 'text-gray-500'}`}>
                  Short-term, focused programs to skill up fast
                </p>
              </div>
            </div>
            <div className={`mt-5 flex items-center gap-2 text-sm font-semibold ${activeSection === 'certificates' ? 'text-blue-100' : 'text-blue-500'}`}>
              <span>Explore Certificates</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          {/* Degree Programs Card */}
          <button
            onClick={() => { setActiveSection('degrees'); setSearch(''); }}
            className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              activeSection === 'degrees'
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50'
                : 'bg-white text-gray-800 shadow-lg border border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="flex items-start gap-5">
              <div className={`p-4 rounded-2xl ${activeSection === 'degrees' ? 'bg-white/20' : 'bg-blue-50'}`}>
                <GraduationCap size={32} className={activeSection === 'degrees' ? 'text-white' : 'text-blue-500'} />
              </div>
              <div className="flex-1">
                <h3 className={`font-display text-xl font-bold mb-2 ${activeSection === 'degrees' ? 'text-white' : 'text-gray-900'}`}>
                  Degree Programs
                </h3>
                <p className={`text-sm ${activeSection === 'degrees' ? 'text-blue-100' : 'text-gray-500'}`}>
                  Master and Bachelor degree programs
                </p>
              </div>
            </div>
            <div className={`mt-5 flex items-center gap-2 text-sm font-semibold ${activeSection === 'degrees' ? 'text-blue-100' : 'text-blue-500'}`}>
              <span>Explore Degrees</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* Degree Programs Sub-section */}
      {activeSection === 'degrees' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-medium text-gray-600">Explore Degrees:</span>
            <div className="relative w-48">
              <Listbox value={degreeType} onChange={setDegreeType}>
                <div className="relative">
                  <ListboxButton className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between gap-2 text-sm font-medium text-blue-700 shadow-sm hover:border-blue-300 w-full">
                    <span>{degreeType === 'master' ? 'Master Degree' : 'Bachelor Degree'}</span>
                    <ChevronDown size={16} className="text-blue-400 transition-transform duration-200 ui-open:rotate-180" />
                  </ListboxButton>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <ListboxOptions className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto">
                      {[
                        { value: 'master', label: 'Master Degree' },
                        { value: 'bachelor', label: 'Bachelor Degree' },
                      ].map(option => (
                        <ListboxOption
                          key={option.value}
                          value={option.value}
                          className="px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-blue-50"
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? 'font-medium' : ''}>{option.label}</span>
                              {selected && <Check size={16} className="text-blue-500" />}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      )}

      {/* Bachelor Coming Soon */}
      {activeSection === 'degrees' && degreeType === 'bachelor' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Mesh background card */}
            <div className="relative w-full max-w-lg bg-gradient-to-br from-blue-50 via-sky-50 to-white rounded-3xl p-12 border border-blue-100 shadow-xl overflow-hidden">
              {/* Background mesh circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-200/20 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Kimchi logo icon */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-200/50 mb-6">
                  <Wand2 size={48} className="text-white" />
                </div>

                {/* Floating tagline */}
                <div className="animate-float mb-6">
                  <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full">
                    let us cook
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  Bachelor Degree Programs
                </h2>
                <p className="text-gray-500 text-base mb-2">
                  Coming Soon
                </p>
                <p className="text-gray-400 text-sm">
                  Stay tuned! We're cooking up something special for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course grid area */}
      {(activeSection === 'certificates' || (activeSection === 'degrees' && degreeType === 'master')) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          {/* Sort dropdown */}
          <div className="flex items-center justify-end mb-6">
            <div className="relative w-48">
              <Listbox value={sort} onChange={setSort}>
                <div className="relative">
                  <ListboxButton className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between gap-2 text-sm font-medium text-blue-700 shadow-sm hover:border-blue-300 w-full">
                    <span>{sort}</span>
                    <ChevronDown size={16} className="text-blue-400 transition-transform duration-200 ui-open:rotate-180" />
                  </ListboxButton>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <ListboxOptions className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto">
                      {sortOptions.map(s => (
                        <ListboxOption
                          key={s}
                          value={s}
                          className="px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-blue-50"
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? 'font-medium' : ''}>{s}</span>
                              {selected && <Check size={16} className="text-blue-500" />}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filtered.length}</span> programs
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-5 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
              {filtered.map((course, idx) => (
                <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}