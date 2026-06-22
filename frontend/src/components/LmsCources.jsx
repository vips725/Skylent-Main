import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { course: "Full Stack Web Dev", students: 6100 },
  { course: "Data Science Master", students: 4820 },
  { course: "AI & ML", students: 3900 },
  { course: "Cloud & DevOps", students: 3100 },
  { course: "UI/UX Design", students: 2750 },
  { course: "Cybersecurity", students: 1980 },
];

export const LmsCources = () => {
  return (
    <div className="col-span-12 bg-white rounded border border-stone-300 p-6">

      {/* TITLE */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-stone-800">
          Top Performing Courses
        </h3>
        <p className="text-xs text-stone-500">
          Based on total student enrollments
        </p>
      </div>

      {/* CHART */}
      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="course"
              width={220}
              tick={{ fontSize: 13, fill: '#4b5563' }}
            />

            <Tooltip />

            <Bar
              dataKey="students"
              fill="#5b21b6"
              radius={[0, 10, 10, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};