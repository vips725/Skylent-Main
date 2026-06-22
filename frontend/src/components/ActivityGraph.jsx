import React from "react";
import { FiActivity } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

/* LINE CHART DATA */
const data = [
  { name: "Jan", Revenue: 2750, Enrollments: 41 },
  { name: "Feb", Revenue: 6200, Enrollments: 96 },
  { name: "Mar", Revenue: 4200, Enrollments: 192 },
  { name: "Apr", Revenue: 8000, Enrollments: 50 },
  { name: "May", Revenue: 6550, Enrollments: 400 },
  { name: "Jun", Revenue: 10750, Enrollments: 200 },
  { name: "Jul", Revenue: 9000, Enrollments: 205 },
];

/* PIE CHART DATA */
const pieData = [
  { name: "Web Dev", value: 38 },
  { name: "Data Science", value: 24 },
  { name: "Design", value: 16 },
  { name: "AI/ML", value: 12 },
  { name: "Cloud", value: 10 },
];

const COLORS = ["#8b5cf6", "#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export const ActivityGraph = () => {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-4">

      {/* LINE CHART */}
      <div className="col-span-12 md:col-span-8 overflow-hidden rounded border border-stone-300 bg-white">
        <div className="p-4 border-b border-stone-200">
          <h3 className="flex items-center gap-1.5 font-medium text-stone-700">
            <FiActivity /> Revenue & Enrollments
          </h3>
        </div>

        <div className="h-72 px-4 py-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#e4e4e7" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="#8b5cf6"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="Enrollments"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="col-span-12 md:col-span-4 overflow-hidden rounded border border-stone-300 bg-white">

        <div className="p-4 border-b border-stone-200">
          <h3 className="font-medium text-stone-700">
            Enrollments by Category
          </h3>
        </div>

        <div className="h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
                label
              >
                <LabelList dataKey="value" fill="#1f2937" />
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 LEGEND UNDER PIE CHART */}
        <div className="px-4 pb-4 space-y-2">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-stone-600">{item.name}</span>
              </div>

              <span className="text-stone-500 font-medium">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};