import { useState } from "react";
import { BarChart, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Pie } from "recharts";
import { Card } from "@/components/ui/card";

const initialData = [
  { name: "Sports", participation: 5 },
  { name: "Music", participation: 3 },
  { name: "Art & Crafts", participation: 6 },
  { name: "Dance", participation: 2 },
  { name: "Drama", participation: 4 },
];

export default function ExtraCurricularGraph() {
  const [data, setData] = useState(initialData);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">🎭 Extracurricular Participation</h2>
      <p className="text-gray-600 text-sm mb-4">
        This chart shows the participation levels of the student across different activities over time.
      </p>

      {/* Bar Chart */}
      <Card className="p-4 shadow-md rounded-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Participation Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="participation" fill="#4F46E5">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#4F46E5", "#22C55E", "#FACC15", "#EF4444", "#3B82F6"][index % 5]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Pie Chart */}
      <Card className="p-4 shadow-md rounded-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🍰 Activity Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="participation" nameKey="name" outerRadius={100} fill="#6366F1" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#4F46E5", "#22C55E", "#FACC15", "#EF4444", "#3B82F6"][index % 5]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
