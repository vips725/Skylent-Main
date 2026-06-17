import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Plus, Trash2, GripVertical, ChevronDown, ChevronRight,
  Video, FileText, HelpCircle, Code, Save, Eye, CheckCircle,
  DollarSign, Image as ImageIcon, Layers, PlayCircle
} from 'lucide-react';
import axios from 'axios';

const LESSON_TYPES = [
  { type: 'video', icon: Video, label: 'Video', color: 'text-red-500 bg-red-50' },
  { type: 'text', icon: FileText, label: 'Article', color: 'text-blue-500 bg-blue-50' },
  { type: 'quiz', icon: HelpCircle, label: 'Quiz', color: 'text-purple-500 bg-purple-50' },
  { type: 'code', icon: Code, label: 'Coding', color: 'text-green-500 bg-green-50' },
];

function LessonTypeIcon({ type, size = 14 }) {
  const found = LESSON_TYPES.find(t => t.type === type) || LESSON_TYPES[0];
  const Icon = found.icon;
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${found.color}`}>
      <Icon size={size} />
    </span>
  );
}

function LessonRow({ lesson, moduleIdx, lessonIdx, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl group hover:bg-violet-50/40 transition-all">
      <GripVertical size={14} className="text-gray-300 cursor-grab shrink-0" />
      <LessonTypeIcon type={lesson.type} />
      {editing ? (
        <input
          autoFocus
          value={lesson.title}
          onChange={e => onUpdate(moduleIdx, lessonIdx, { ...lesson, title: e.target.value })}
          onBlur={() => setEditing(false)}
          onKeyDown={e => e.key === 'Enter' && setEditing(false)}
          className="flex-1 text-sm bg-white border border-violet-300 rounded-lg px-2 py-1 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
        />
      ) : (
        <span
          className="flex-1 text-sm text-gray-700 cursor-text hover:text-gray-900"
          onClick={() => setEditing(true)}
        >
          {lesson.title || <span className="text-gray-400 italic">Untitled lesson</span>}
        </span>
      )}
      <div className="flex items-center gap-1 shrink-0">
        <select
          value={lesson.type}
          onChange={e => onUpdate(moduleIdx, lessonIdx, { ...lesson, type: e.target.value })}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-violet-400"
        >
          {LESSON_TYPES.map(t => <option key={t.type} value={t.type}>{t.label}</option>)}
        </select>
        <input
          type="text"
          placeholder="0:00"
          value={lesson.duration || ''}
          onChange={e => onUpdate(moduleIdx, lessonIdx, { ...lesson, duration: e.target.value })}
          className="w-14 text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-center focus:outline-none focus:border-violet-400"
        />
        <button
          onClick={() => onUpdate(moduleIdx, lessonIdx, { ...lesson, preview: !lesson.preview })}
          title="Free preview"
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${lesson.preview ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
        >
          <Eye size={12} />
        </button>
        <button
          onClick={() => onDelete(moduleIdx, lessonIdx)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

function ModuleBlock({ module, moduleIdx, onUpdate, onDelete, onAddLesson, onUpdateLesson, onDeleteLesson }) {
  const [open, setOpen] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Module header */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-100">
        <GripVertical size={16} className="text-gray-300 cursor-grab shrink-0" />
        <button onClick={() => setOpen(o => !o)} className="text-gray-400 hover:text-gray-600">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 shrink-0">
          {moduleIdx + 1}
        </div>
        {editingTitle ? (
          <input
            autoFocus
            value={module.title}
            onChange={e => onUpdate(moduleIdx, { ...module, title: e.target.value })}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={e => e.key === 'Enter' && setEditingTitle(false)}
            className="flex-1 font-semibold bg-white border border-violet-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
          />
        ) : (
          <span
            className="flex-1 font-semibold text-gray-800 text-sm cursor-text hover:text-violet-600"
            onClick={() => setEditingTitle(true)}
          >
            {module.title || <span className="text-gray-400 italic">Untitled module</span>}
          </span>
        )}
        <span className="text-xs text-gray-400 shrink-0">{module.lessons.length} lessons</span>
        <button
          onClick={() => {
            if (!confirm('Delete this module?')) return;
            onDelete(moduleIdx);
          }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Lessons */}
      {open && (
        <div className="p-3 space-y-2">
          {module.lessons.map((lesson, lessonIdx) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              moduleIdx={moduleIdx}
              lessonIdx={lessonIdx}
              onUpdate={onUpdateLesson}
              onDelete={onDeleteLesson}
            />
          ))}
          <button
            onClick={() => onAddLesson(moduleIdx)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-violet-600 hover:bg-violet-50 rounded-xl transition-all font-medium border-2 border-dashed border-violet-200 hover:border-violet-400"
          >
            <Plus size={14} /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}

const INPUT_CLASS = 'w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30';
const SELECT_CLASS = 'w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-300 text-gray-900 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 cursor-pointer';

export default function CourseBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id && id !== 'new';

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [form, setForm] = useState({
    title: '',
    instructor: '',
    duration: '',
    programType: 'Professional Certificate',
    category: 'Technology',
    level: 'Beginner',
    status: 'Draft',
    image: '',
    description: '',
    sellingPrice: '',
    originalPrice: '',
  });

  const [modules, setModules] = useState([
    {
      id: 'mod-1',
      title: 'Introduction',
      lessons: [
        { id: 'l-1', title: 'Welcome to the Course', type: 'video', duration: '5:00', preview: true },
        { id: 'l-2', title: 'Course Overview', type: 'text', duration: '2:00', preview: true },
      ],
    },
  ]);

  // Fetch course data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    axios.get(`/api/admin/courses/${id}`)
      .then(res => {
        const d = res.data;
        setForm({
          title: d.title || '',
          instructor: d.instructor || '',
          duration: d.duration || '',
          programType: d.programType || 'Professional Certificate',
          category: d.category || 'Technology',
          level: d.level || 'Beginner',
          status: d.status || 'Draft',
          image: d.image || '',
          description: d.description || '',
          sellingPrice: d.sellingPrice ?? d.price ?? '',
          originalPrice: d.originalPrice ?? '',
        });
        if (d.curriculum && Array.isArray(d.curriculum) && d.curriculum.length > 0) {
          setModules(d.curriculum);
        }
      })
      .catch(() => setFetchError(true));
  }, [id, isEditMode]);

  const addModule = () => {
    const newMod = { id: `mod-${Date.now()}`, title: '', lessons: [] };
    setModules(m => [...m, newMod]);
  };

  const updateModule = (idx, updated) => {
    setModules(m => m.map((mod, i) => i === idx ? updated : mod));
  };

  const deleteModule = (idx) => {
    setModules(m => m.filter((_, i) => i !== idx));
  };

  const addLesson = (moduleIdx) => {
    const lesson = { id: `l-${Date.now()}`, title: '', type: 'video', duration: '', preview: false };
    setModules(m => m.map((mod, i) => i === moduleIdx
      ? { ...mod, lessons: [...mod.lessons, lesson] }
      : mod
    ));
  };

  const updateLesson = (moduleIdx, lessonIdx, updated) => {
    setModules(m => m.map((mod, i) => i === moduleIdx
      ? { ...mod, lessons: mod.lessons.map((l, j) => j === lessonIdx ? updated : l) }
      : mod
    ));
  };

  const deleteLesson = (moduleIdx, lessonIdx) => {
    setModules(m => m.map((mod, i) => i === moduleIdx
      ? { ...mod, lessons: mod.lessons.filter((_, j) => j !== lessonIdx) }
      : mod
    ));
  };

  const discountPct = (() => {
    const sp = parseFloat(form.sellingPrice);
    const op = parseFloat(form.originalPrice);
    if (sp && op && op > sp) {
      return Math.round((1 - sp / op) * 100);
    }
    return null;
  })();

  const handleSave = async () => {
    if (!form.title.trim()) {
      alert('Please enter a course title.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        sellingPrice: parseFloat(form.sellingPrice) || 0,
        originalPrice: parseFloat(form.originalPrice) || 0,
        price: parseFloat(form.sellingPrice) || 0,
        curriculum: modules,
      };
      if (isEditMode) {
        await axios.put(`/api/admin/courses/${id}`, payload);
      } else {
        await axios.post('/api/admin/courses', payload);
      }
      setSaved(true);
      setTimeout(() => navigate('/admin/courses'), 1200);
    } catch {
      alert('Failed to save. Please check if the backend is running.');
    } finally {
      setSaving(false);
    }
  };

  const pageTitle = isEditMode ? 'Edit Course' : 'Create New Course';
  const breadcrumbCourse = isEditMode
    ? (form.title || 'Untitled Course')
    : 'Untitled Course';

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Breadcrumb row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/admin/courses"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Courses
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">All Courses</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">{breadcrumbCourse}</span>
        </div>
      </div>

      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
      </div>

      {/* Fetch error notice */}
      {fetchError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          Could not load course data from the server. You can still edit and save.
        </div>
      )}

      {/* ── Card A: Course Details ──────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-5">📋 Course Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* title */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Course Title <span className="text-red-400">*</span>
              </label>
              <input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Full Stack Web Development"
                className={INPUT_CLASS}
              />
            </div>
            {/* instructor */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Instructor <span className="text-red-400">*</span>
              </label>
              <input
                value={form.instructor}
                onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))}
                placeholder="Prof. Name"
                className={INPUT_CLASS}
              />
            </div>
            {/* duration */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Duration</label>
              <input
                value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                placeholder="e.g., 42 hours"
                className={INPUT_CLASS}
              />
            </div>
            {/* programType */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Program Type</label>
              <select
                value={form.programType}
                onChange={e => setForm(f => ({ ...f, programType: e.target.value }))}
                className={SELECT_CLASS}
              >
                <option>Professional Certificate</option>
                <option>Master Degree</option>
              </select>
            </div>
            {/* category */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className={SELECT_CLASS}
              >
                {['Technology', 'Marketing', 'Design', 'MBA', 'Finance', 'Other'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* level */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Level</label>
              <select
                value={form.level}
                onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                className={SELECT_CLASS}
              >
                {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            {/* status */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className={SELECT_CLASS}
              >
                <option>Draft</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
            </div>
            {/* image */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Thumbnail Image URL</label>
              <input
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                placeholder="https://..."
                className={INPUT_CLASS}
              />
            </div>
          </div>
          {/* description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Enter course description..."
              rows={4}
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* ── Card B: Pricing ──────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-5">💰 Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* sellingPrice */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Selling Price <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="number"
                value={form.sellingPrice}
                onChange={e => setForm(f => ({ ...f, sellingPrice: e.target.value }))}
                placeholder="29999"
                className={`${INPUT_CLASS} pl-8`}
              />
            </div>
          </div>
          {/* originalPrice */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Original Price</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="number"
                value={form.originalPrice}
                onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                placeholder="49999"
                className={`${INPUT_CLASS} pl-8`}
              />
            </div>
          </div>
        </div>
        {/* Discount badge */}
        {discountPct !== null && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {discountPct}% off
            </span>
          </div>
        )}
      </div>

      {/* ── Card C: Modules & Content ───────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-5">🔨 Modules & Content</h2>

        {/* Add module input + button */}
        <div className="flex gap-3 mb-4">
          <input
            id="new-module-input"
            placeholder="New module title..."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const val = e.target.value.trim();
                if (val) {
                  setModules(m => [...m, { id: `mod-${Date.now()}`, title: val, lessons: [] }]);
                  e.target.value = '';
                }
              }
            }}
            className={`${INPUT_CLASS} flex-1`}
          />
          <button
            onClick={() => {
              const input = document.getElementById('new-module-input');
              const val = input.value.trim();
              if (val) {
                setModules(m => [...m, { id: `mod-${Date.now()}`, title: val, lessons: [] }]);
                input.value = '';
              }
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors shrink-0"
          >
            <Plus size={15} /> Add Module
          </button>
        </div>

        {/* Modules list */}
        <div className="space-y-3">
          {modules.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8 italic">No modules yet. Add your first module above.</p>
          ) : (
            modules.map((mod, idx) => (
              <ModuleBlock
                key={mod.id}
                module={mod}
                moduleIdx={idx}
                onUpdate={updateModule}
                onDelete={deleteModule}
                onAddLesson={addLesson}
                onUpdateLesson={updateLesson}
                onDeleteLesson={deleteLesson}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Bottom Save Bar ─────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pb-4">
        <Link
          to="/admin/courses"
          className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-all"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-violet-600 hover:bg-violet-700 text-white hover:shadow-md'
          }`}
        >
          {saved ? (
            <><CheckCircle size={15} /> Saved!</>
          ) : saving ? (
            'Saving...'
          ) : (
            <><Save size={15} /> Save Course</>
          )}
        </button>
      </div>
    </div>
  );
}