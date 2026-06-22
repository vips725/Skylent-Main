import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play, Lock, CheckCircle, ChevronDown, ChevronUp,
  Video, FileText, HelpCircle, Code, ChevronLeft, ChevronRight,
  ArrowLeft,
} from 'lucide-react';

const SAMPLE_CURRICULUM = [
  {
    title: 'Module 1',
    lessons: [
      { title: 'Welcome & Course Overview', type: 'video', duration: '5:00', preview: true },
      { title: 'Setup Your Environment', type: 'video', duration: '12:00', preview: true },
      { title: 'Introduction Quiz', type: 'quiz', duration: '5:00', preview: false },
      { title: 'Fundamentals Explained', type: 'video', duration: '18:00', preview: false },
    ],
  },
  {
    title: 'Module 2',
    lessons: [
      { title: 'Deep Dive - Part 1', type: 'video', duration: '22:00', preview: false },
      { title: 'Deep Dive - Part 2', type: 'video', duration: '20:00', preview: false },
      { title: 'Coding Exercise', type: 'code', duration: '30 min', preview: false },
      { title: 'Midterm Assessment', type: 'quiz', duration: '15 min', preview: false },
    ],
  },
  {
    title: 'Module 3',
    lessons: [
      { title: 'Advanced Patterns I', type: 'video', duration: '25:00', preview: false },
      { title: 'Advanced Patterns II', type: 'video', duration: '25:00', preview: false },
      { title: 'Group Project Phase 1', type: 'code', duration: '45 min', preview: false },
    ],
  },
  {
    title: 'Module 4',
    lessons: [
      { title: 'Real-World Case Study', type: 'text', duration: '20 min', preview: false },
      { title: 'Industry Best Practices', type: 'video', duration: '18:00', preview: false },
      { title: 'Group Project Phase 2', type: 'code', duration: '50 min', preview: false },
    ],
  },
  {
    title: 'Module 5',
    lessons: [
      { title: 'Final Project', type: 'code', duration: '60 min', preview: false },
      { title: 'Portfolio Review', type: 'video', duration: '15:00', preview: false },
      { title: 'Final Assessment', type: 'quiz', duration: '30 min', preview: false },
      { title: 'Certificate & Next Steps', type: 'video', duration: '8:00', preview: false },
    ],
  },
];

// Build a flat ordered list of all lessons with module context for prev/next navigation
function buildFlatList(curriculum) {
  const items = [];
  curriculum.forEach((mod, modIdx) => {
    mod.lessons.forEach((lesson, lesIdx) => {
      items.push({ ...lesson, modIdx, lesIdx, moduleTitle: mod.title });
    });
  });
  return items;
}

function LessonIcon({ type, className }) {
  const map = {
    video: { icon: Video, defaultClass: 'text-red-400' },
    text: { icon: FileText, defaultClass: 'text-blue-400' },
    quiz: { icon: HelpCircle, defaultClass: 'text-blue-400' },
    code: { icon: Code, defaultClass: 'text-green-400' },
  };
  const { icon: Icon, defaultClass } = map[type] || map.video;
  return <Icon size={14} className={className || defaultClass} />;
}

export default function CourseLecture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const flatList = buildFlatList(SAMPLE_CURRICULUM);

  // Initially unlocked: all preview lessons + the very first lesson
  const getInitialUnlocked = () => {
    const unlocked = new Set();
    flatList.forEach((lesson, idx) => {
      if (lesson.preview || idx === 0) unlocked.add(idx);
    });
    return unlocked;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [watchedThisSession, setWatchedThisSession] = useState(false);
  const [unlockedLessons, setUnlockedLessons] = useState(getInitialUnlocked);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const videoRef = useRef(null);

  const [expandedModules, setExpandedModules] = useState(
    SAMPLE_CURRICULUM.reduce((acc, _, i) => ({ ...acc, [i]: i === 0 }), {})
  );

  const activeLesson = flatList[activeIndex];

  // Reset watchedThisSession and overlay when switching lessons
  useEffect(() => {
    setWatchedThisSession(false);
    setShowCompletionOverlay(false);
  }, [activeIndex]);

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const goToLesson = (index) => {
    if (!unlockedLessons.has(index)) return;
    setActiveIndex(index);
    // Ensure the module containing this lesson is expanded
    const modIdx = flatList[index].modIdx;
    setExpandedModules(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { next[k] = Number(k) === modIdx; });
      return next;
    });
  };

  const handleVideoEnd = () => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.add(activeIndex);
      return next;
    });
    setWatchedThisSession(true);
    setShowCompletionOverlay(true);
    // Unlock next lesson
    const nextIdx = activeIndex + 1;
    if (nextIdx < flatList.length) {
      setUnlockedLessons(prev => {
        const next = new Set(prev);
        next.add(nextIdx);
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) goToLesson(activeIndex - 1);
  };

  const handleNext = () => {
    const nextIdx = activeIndex + 1;
    if (nextIdx < flatList.length && unlockedLessons.has(nextIdx)) {
      goToLesson(nextIdx);
    }
  };

  // Derive video src for current lesson
  const videoSrc =
    activeLesson?.type === 'video'
      ? `https://imgsrc.pub/video/1280x720?duration=2&text=${encodeURIComponent(activeLesson.title)}`
      : null;

  // Check if Next button should be disabled
  const isLastLesson = activeIndex === flatList.length - 1;
  const currentIsVideo = activeLesson?.type === 'video';
  const currentCompleted = completedLessons.has(activeIndex);
  const isNextLocked = !unlockedLessons.has(activeIndex + 1);
  const nextDisabled =
    isLastLesson || (currentIsVideo && !currentCompleted) || isNextLocked;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <button
          onClick={() => navigate('/student/courses')}
          className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Go Back to My Courses
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-stone-500 mb-4">
          <Link to="/student/courses" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
            My Courses
          </Link>
          <ChevronRight size={14} className="text-gray-300 dark:text-stone-300" />
          <span className="text-gray-700 dark:text-stone-300 font-medium">Course Lecture</span>
        </div>

        {/* Main grid: video + sidebar */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Left: video player + lesson info + nav buttons */}
          <div className="space-y-4">
            {/* Video player */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-stone-700 bg-black">
              {activeLesson?.type === 'video' ? (
                <video
                  ref={videoRef}
                  key={activeIndex}
                  controls
                  autoPlay={false}
                  onEnded={handleVideoEnd}
                  poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop"
                  className="w-full aspect-video"
                >
                  {videoSrc && <source src={videoSrc} type="video/mp4" />}
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-stone-800 text-stone-400 text-sm">
                  No video for this lesson type
                </div>
              )}
            </div>

            {/* Video completion overlay */}
            {showCompletionOverlay && activeLesson?.type === 'video' && (
              <div className="bg-brand-500/10 border border-brand-200 rounded-xl p-4 text-center mt-4">
                <p className="text-brand-700 font-bold text-lg mb-2">🎉 New lesson unlocked!</p>
                <button
                  onClick={() => {
                    const nextIdx = activeIndex + 1;
                    if (nextIdx < flatList.length && unlockedLessons.has(nextIdx)) {
                      goToLesson(nextIdx);
                    }
                  }}
                  disabled={!unlockedLessons.has(activeIndex + 1)}
                  className="btn-primary px-4 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  Go to Next Lesson
                </button>
              </div>
            )}

            {/* Lesson title + module badge */}
            <div className="bg-gray-50 dark:bg-stone-800 rounded-xl p-4 border border-gray-100 dark:border-stone-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-brand-500 dark:text-brand-500 bg-brand-50 dark:bg-brand-900/30 px-2.5 py-1 rounded-full">
                  {activeLesson?.moduleTitle}
                </span>
                <span className="text-xs text-gray-400 dark:text-stone-400">{activeLesson?.duration}</span>
              </div>
              <h1 className="font-display text-xl font-bold text-gray-900 dark:text-stone-100 leading-snug">
                {activeLesson?.title}
              </h1>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  activeIndex === 0
                    ? 'border-gray-100 text-gray-300 dark:border-stone-700 dark:text-stone-300 cursor-not-allowed'
                    : 'border-gray-200 dark:border-stone-700 text-gray-700 dark:text-stone-300 hover:bg-gray-50 dark:hover:bg-stone-800 hover:border-gray-300 dark:hover:border-stone-600'
                }`}
              >
                <ChevronLeft size={16} />
                Previous Lesson
              </button>
              <button
                onClick={handleNext}
                disabled={nextDisabled}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  nextDisabled
                    ? 'border-gray-100 text-gray-300 dark:border-stone-700 dark:text-stone-300 cursor-not-allowed'
                    : 'border-brand-500 bg-brand-500 text-white hover:bg-brand-600 dark:hover:bg-brand-700'
                }`}
              >
                Next Lesson
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right: scrollable module/lesson list */}
          <div className="bg-white dark:bg-stone-900 rounded-xl border border-gray-100 dark:border-stone-700 shadow-sm overflow-hidden">
            <div className="px-4 py-3.5 border-b border-gray-100 dark:border-stone-700 bg-gray-50 dark:bg-stone-800">
              <h2 className="font-display font-bold text-gray-900 dark:text-stone-100 text-sm">
                Course Content
              </h2>
              <p className="text-xs text-gray-400 dark:text-stone-400 mt-0.5">
                {SAMPLE_CURRICULUM.length} modules · {flatList.length} lessons
              </p>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
              <div className="divide-y divide-gray-50 dark:divide-stone-800">
                {SAMPLE_CURRICULUM.map((module, modIdx) => (
                  <div key={modIdx}>
                    {/* Module header (collapsible) */}
                    <button
                      onClick={() => toggleModule(modIdx)}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-stone-800 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-600 shrink-0">
                          {modIdx + 1}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 dark:text-stone-100 text-sm block">
                            {module.title}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-stone-400">
                            {module.lessons.length} lessons
                          </span>
                        </div>
                      </div>
                      {expandedModules[modIdx] ? (
                        <ChevronUp size={15} className="text-gray-400 dark:text-stone-400 shrink-0" />
                      ) : (
                        <ChevronDown size={15} className="text-gray-400 dark:text-stone-400 shrink-0" />
                      )}
                    </button>

                    {/* Lesson list */}
                    {expandedModules[modIdx] && (
                      <div className="divide-y divide-gray-50 dark:divide-stone-800">
                        {module.lessons.map((lesson, lesIdx) => {
                          // Find this lesson's global index
                          const globalIdx = flatList.findIndex(
                            l => l.modIdx === modIdx && l.lesIdx === lesIdx
                          );
                          const isActive = globalIdx === activeIndex;
                          const isLocked = !unlockedLessons.has(globalIdx);

                          return (
                            <button
                              key={lesIdx}
                              onClick={() => goToLesson(globalIdx)}
                              className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left ${
                                isActive
                                  ? 'bg-brand-50 dark:bg-brand-900/30 border-l-2 border-brand-500'
                                  : 'hover:bg-gray-50 dark:hover:bg-stone-800'
                              }`}
                            >
                              <div className="shrink-0">
                                {isActive ? (
                                  <Play size={13} className="text-brand-500" />
                                ) : isLocked ? (
                                  <Lock size={13} className="text-gray-300 dark:text-stone-300" />
                                ) : (
                                  <LessonIcon type={lesson.type} className="text-gray-400 dark:text-stone-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span
                                  className={`text-sm block truncate ${
                                    isActive
                                      ? 'font-semibold text-brand-600 dark:text-brand-600'
                                      : isLocked
                                      ? 'text-gray-400 dark:text-stone-400'
                                      : 'text-gray-700 dark:text-stone-300'
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                                <span className="text-xs text-gray-400 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                                  <LessonIcon type={lesson.type} className="text-gray-300 dark:text-stone-300" />
                                  {lesson.duration}
                                </span>
                              </div>
                              {lesson.preview && !isLocked && (
                                <span className="shrink-0 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-600 font-semibold px-1.5 py-0.5 rounded-full">
                                  Free
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}