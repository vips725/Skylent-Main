import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

import {
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiBookOpen,
} from "react-icons/fi";

/* ---------------- COLORS ---------------- */
const VIOLET = "#5b21b6";

/* ---------------- DATA ---------------- */

const activityData = [
  { name: "Mon", dau: 420, sessions: 610 },
  { name: "Tue", dau: 520, sessions: 720 },
  { name: "Wed", dau: 610, sessions: 880 },
  { name: "Thu", dau: 580, sessions: 790 },
  { name: "Fri", dau: 700, sessions: 940 },
  { name: "Sat", dau: 640, sessions: 860 },
  { name: "Sun", dau: 590, sessions: 810 },
];

const radarData = [
  { feature: "Completion", value: 92 },
  { feature: "Quizzes", value: 78 },
  { feature: "Assignments", value: 85 },
  { feature: "Discussion", value: 64 },
  { feature: "Certificates", value: 72 },
  { feature: "Video Watch", value: 88 },
];

const retentionData = [
  { week: "Week 1", users: 1000 },
  { week: "Week 2", users: 820 },
  { week: "Week 3", users: 690 },
  { week: "Week 4", users: 540 },
];

const completionData = [
  { category: "Web Dev", value: 88 },
  { category: "Data Science", value: 81 },
  { category: "Design", value: 76 },
  { category: "AI/ML", value: 72 },
  { category: "Cloud", value: 68 },
];

const quizData = [
  { name: "JS Fundamentals", avg: 76, pass: 84 },
  { name: "CSS Layout", avg: 82, pass: 91 },
  { name: "React Hooks", avg: 68, pass: 73 },
  { name: "Python DS", avg: 71, pass: 79 },
  { name: "Git & VCS", avg: 88, pass: 95 },
];

const courses = [
  { course: "AWS Cloud Practitioner", category: "Cloud", enrolled: "15,000", rating: 4.8, completion: 71 },
  { course: "React & TypeScript Mastery", category: "Web Dev", enrolled: "12,400", rating: 4.9, completion: 68 },
  { course: "Python for Data Science", category: "Data Science", enrolled: "9,800", rating: 4.8, completion: 54 },
  { course: "Node.js Backend Architecture", category: "Backend", enrolled: "7,300", rating: 4.6, completion: 62 },
  { course: "SQL & Database Design", category: "Backend", enrolled: "8,700", rating: 4.5, completion: 58 },
];

/* ---------------- PAGE ---------------- */

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="border-b border-stone-200 px-4 pb-4">
        <h1 className="text-sm font-bold">Analytics Dashboard</h1>
        <p className="text-xs text-stone-500">
          LMS insights & performance metrics
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={FiDollarSign} title="Revenue" value="₹12.5L" />
        <StatCard icon={FiUsers} title="Students" value="8,420" />
        <StatCard icon={FiBookOpen} title="Courses" value="24" />
        <StatCard icon={FiTrendingUp} title="Enrollments" value="18,300" />
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LINE */}
        <div className="bg-white border border-stone-300 rounded p-4">
          <h3 className="text-sm font-medium mb-4">
            DAU vs Sessions
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid stroke="#e4e4e7" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Line dataKey="sessions" stroke="#111" strokeWidth={2} />
                <Line dataKey="dau" stroke={VIOLET} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RADAR */}
        <div className="bg-white border border-stone-300 rounded p-4">
          <h3 className="text-sm font-medium mb-4">
            Learner Engagement
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="feature" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar dataKey="value" stroke="#111" fill="#111" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* RETENTION */}
        <div className="bg-white border border-stone-300 rounded p-4">
          <h3 className="text-sm font-medium mb-4">
            User Retention
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid stroke="#e4e4e7" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />

                <Line dataKey="users" stroke="#111" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPLETION (FIXED 🔥) */}
        <div className="bg-white border border-stone-300 rounded p-4">
          <h3 className="text-sm font-medium mb-4">
            Completion Rate
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />

                {/* 🔥 FIXED BAR COLOR (purple + black SaaS blend) */}
                <Bar
                  dataKey="value"
                  fill={VIOLET}
                  radius={[10, 10, 0, 0]}
                  style={{
                    filter:
                      "drop-shadow(0px 0px 8px rgba(91,33,182,0.6))",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* QUIZ */}
      <div className="bg-white border border-stone-300 rounded p-4">
        <h3 className="text-sm font-medium mb-4">Quiz Performance</h3>

        <div className="space-y-3">
          {quizData.map((q, i) => (
            <div key={i} className="space-y-1">

              <div className="flex justify-between text-xs">
                <span>{q.name}</span>
                <span className="text-stone-500">
                  Avg {q.avg}% • Pass {q.pass}%
                </span>
              </div>

              <div className="h-2 bg-stone-200 rounded-full">
                <div
                  className="h-full bg-slate-600 rounded-full"
                  style={{ width: `${q.pass}%` }}
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* TOP COURSES */}
      <div className="bg-white border border-stone-300 rounded p-4">

        <h3 className="text-sm font-semibold mb-4">
          Top Performing Courses
        </h3>

        <div className="space-y-3">

          {courses.map((c, i) => (
            <div key={i} className="grid grid-cols-12 text-xs items-center">

              <div className="col-span-4 font-medium">{c.course}</div>
              <div className="col-span-2 text-stone-500">{c.category}</div>
              <div className="col-span-2">{c.enrolled}</div>
              <div className="col-span-1">⭐ {c.rating}</div>

              <div className="col-span-3 flex items-center gap-2">
                <div className="h-1.5 w-full bg-stone-200 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-black"
                    style={{
                      width: `${c.completion}%`,
                    }}
                  />
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="p-4 bg-white border border-stone-300 rounded">
      <div className="flex items-center gap-2 text-stone-500 text-sm">
        <Icon />
        {title}
      </div>
      <div className="text-xl font-semibold mt-2">{value}</div>
    </div>
  );
}