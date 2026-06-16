import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Trash2, GripVertical, ChevronDown, ChevronRight,
  Video, FileText, HelpCircle, Code, Save, Eye, Upload, X,
  PlayCircle, Clock, BookOpen, Users, Star, CheckCircle, AlertCircle,
  Settings, Globe, Lock, Tag, DollarSign, Image as ImageIcon, Layers
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
    <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl group hover:bg-brand-50/40 transition-all">
      <GripVertical size={14} className="text-gray-300 cursor-grab shrink-0" />
      <LessonTypeIcon type={lesson.type} />
      {editing ? (
        <input
          autoFocus
          value={lesson.title}
          onChange={e => onUpdate(moduleIdx, lessonIdx, { ...lesson, title: e.target.value })}
          onBlur={() => setEditing(false)}
          onKeyDown={e => e.key === 'Enter' && setEditing(false)}
          className="flex-1 text-sm bg-white border border-brand-300 rounded-lg px-2 py-1 focus:outline-none focus:border-brand-500"
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
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-brand-400"
        >
          {LESSON_TYPES.map(t => <option key={t.type} value={t.type}>{t.label}</option>)}
        </select>
        <input
          type="text"
          placeholder="0:00"
          value={lesson.duration || ''}
          onChange={e => onUpdate(moduleIdx, lessonIdx, { ...lesson, duration: e.target.value })}
          className="w-14 text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-center focus:outline-none focus:border-brand-400"
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
    <div className="card border border-gray-200 overflow-hidden">
      {/* Module header */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-100">
        <GripVertical size={16} className="text-gray-300 cursor-grab shrink-0" />
        <button onClick={() => setOpen(o => !o)} className="text-gray-400 hover:text-gray-600">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600 shrink-0">
          {moduleIdx + 1}
        </div>
        {editingTitle ? (
          <input
            autoFocus
            value={module.title}
            onChange={e => onUpdate(moduleIdx, { ...module, title: e.target.value })}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={e => e.key === 'Enter' && setEditingTitle(false)}
            className="flex-1 font-semibold bg-white border border-brand-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-brand-500"
          />
        ) : (
          <span
            className="flex-1 font-semibold text-gray-800 text-sm cursor-text hover:text-brand-600"
            onClick={() => setEditingTitle(true)}
          >
            {module.title || <span className="text-gray-400 italic">Untitled module</span>}
          </span>
        )}
        <span className="text-xs text-gray-400 shrink-0">{module.lessons.length} lessons</span>
        <button
          onClick={() => onDelete(moduleIdx)}
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
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-brand-500 hover:bg-brand-50 rounded-xl transition-all font-medium border-2 border-dashed border-brand-200 hover:border-brand-400"
          >
            <Plus size={14} /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}

// ── Sidebar panel tabs ──────────────────────────────────────────────────────
function CourseInfoPanel({ form, setForm }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Course Title *</label>
        <input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Full Stack Web Development"
          className="input-field text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subtitle</label>
        <input
          value={form.subtitle}
          onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
          placeholder="A brief subtitle for the course"
          className="input-field text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="What will students learn?"
          rows={4}
          className="input-field text-sm resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field text-sm">
            {['Technology', 'Marketing', 'Design', 'MBA', 'Finance', 'Other'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Level</label>
          <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} className="input-field text-sm">
            {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Instructor</label>
        <input
          value={form.instructor}
          onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))}
          placeholder="Instructor name"
          className="input-field text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Duration</label>
        <input
          value={form.duration}
          onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
          placeholder="e.g. 6 months"
          className="input-field text-sm"
        />
      </div>
    </div>
  );
}

function PricingPanel({ form, setForm }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Selling Price (₹)</label>
        <div className="relative">
          <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            placeholder="29999"
            className="input-field text-sm pl-9"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Original Price (₹)</label>
        <div className="relative">
          <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            value={form.originalPrice}
            onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
            placeholder="49999"
            className="input-field text-sm pl-9"
          />
        </div>
      </div>
      {form.price && form.originalPrice && (
        <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2">
          <CheckCircle size={15} className="text-green-500" />
          <span className="text-sm text-green-700 font-medium">
            {Math.round((1 - form.price / form.originalPrice) * 100)}% discount
          </span>
        </div>
      )}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Badge</label>
        <input
          value={form.badge}
          onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
          placeholder="e.g. Bestseller, Hot, New"
          className="input-field text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Visibility</label>
        <div className="flex gap-2">
          {[
            { val: 'public', label: 'Public', icon: Globe },
            { val: 'private', label: 'Private', icon: Lock },
          ].map(({ val, label, icon: Icon }) => (
            <button
              key={val}
              onClick={() => setForm(f => ({ ...f, visibility: val }))}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                form.visibility === val
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tags (comma separated)</label>
        <div className="relative">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={form.tags}
            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
            placeholder="react, web dev, javascript"
            className="input-field text-sm pl-9"
          />
        </div>
      </div>
    </div>
  );
}

function MediaPanel({ form, setForm }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Thumbnail URL</label>
        <input
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          placeholder="https://..."
          className="input-field text-sm"
        />
        {form.image && (
          <img src={form.image} alt="thumbnail" className="mt-2 w-full h-32 object-cover rounded-xl border border-gray-200" />
        )}
        <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-brand-400 hover:bg-brand-50/30 transition-all cursor-pointer">
          <Upload size={20} className="mx-auto text-gray-300 mb-1" />
          <p className="text-xs text-gray-400">Or drag & drop an image</p>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Intro Video URL</label>
        <input
          value={form.introVideo}
          onChange={e => setForm(f => ({ ...f, introVideo: e.target.value }))}
          placeholder="https://youtube.com/..."
          className="input-field text-sm"
        />
      </div>
    </div>
  );
}

// ─── Main Course Builder ──────────────────────────────────────────────────────
export default function CourseBuilder() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activePanel, setActivePanel] = useState('info');

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'Technology',
    level: 'Beginner',
    instructor: '',
    duration: '',
    price: '',
    originalPrice: '',
    badge: '',
    visibility: 'public',
    tags: '',
    image: '',
    introVideo: '',
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

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);

  const addModule = () => {
    const id = `mod-${Date.now()}`;
    setModules(m => [...m, { id, title: '', lessons: [] }]);
  };

  const updateModule = (idx, updated) => {
    setModules(m => m.map((mod, i) => i === idx ? updated : mod));
  };

  const deleteModule = (idx) => {
    if (!confirm('Delete this module?')) return;
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

  const handleSave = async () => {
    if (!form.title) { alert('Please enter a course title.'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        originalPrice: Number(form.originalPrice) || 0,
        curriculum: modules,
      };
      await axios.post('/api/admin/courses', payload);
      setSaved(true);
      setTimeout(() => navigate('/admin/courses'), 1200);
    } catch (err) {
      alert('Failed to save. Please check if the backend is running.');
    } finally {
      setSaving(false);
    }
  };

  const panels = [
    { id: 'info', label: 'Info', icon: BookOpen },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'media', label: 'Media', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/courses" className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display font-bold text-gray-900 text-base leading-tight">Course Builder</h1>
            <p className="text-xs text-gray-400 leading-none">{form.title || 'New Course'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/courses"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            <Eye size={15} /> Preview
          </Link>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-md'
            }`}
          >
            {saved ? <><CheckCircle size={15} /> Saved!</> : saving ? 'Saving...' : <><Save size={15} /> Save Course</>}
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left: Curriculum */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Modules', value: modules.length, icon: Layers, color: 'text-blue-500 bg-blue-50' },
              { label: 'Lessons', value: totalLessons, icon: PlayCircle, color: 'text-purple-500 bg-purple-50' },
              { label: 'Free Previews', value: modules.reduce((s, m) => s + m.lessons.filter(l => l.preview).length, 0), icon: Eye, color: 'text-green-500 bg-green-50' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}><Icon size={18} /></div>
                <div>
                  <div className="font-display font-bold text-xl text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Curriculum heading */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-gray-900">Curriculum</h2>
            <span className="text-xs text-gray-400">Click titles to edit</span>
          </div>

          {/* Modules */}
          <div className="space-y-3">
            {modules.map((mod, idx) => (
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
            ))}
          </div>

          <button
            onClick={addModule}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50/30 transition-all font-medium text-sm"
          >
            <Plus size={16} /> Add Module
          </button>
        </div>

        {/* Right: Settings panel */}
        <aside className="w-80 bg-white border-l border-gray-100 flex flex-col overflow-hidden shrink-0">
          {/* Panel tabs */}
          <div className="flex border-b border-gray-100 px-2 pt-2">
            {panels.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActivePanel(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
                  activePanel === id
                    ? 'text-brand-600 bg-brand-50 border-b-2 border-brand-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'info' && <CourseInfoPanel form={form} setForm={setForm} />}
            {activePanel === 'pricing' && <PricingPanel form={form} setForm={setForm} />}
            {activePanel === 'media' && <MediaPanel form={form} setForm={setForm} />}
          </div>

          {/* Tips */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-brand-50 rounded-xl p-3 flex gap-2">
              <AlertCircle size={14} className="text-brand-500 mt-0.5 shrink-0" />
              <p className="text-xs text-brand-700">
                Click any module or lesson title to edit it inline. Use the <Eye size={10} className="inline" /> icon to mark lessons as free previews.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}