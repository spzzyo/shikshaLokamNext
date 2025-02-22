import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

const attendanceData = [
  { month: "Jan", attendance: 90 },
  { month: "Feb", attendance: 85 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 88 },
  { month: "May", attendance: 95 }
];

const progressData = [
  { month: "Jan", score: 60 },
  { month: "Feb", score: 70 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 85 },
  { month: "May", score: 90 }
];

const performanceData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 72 },
  { subject: "English", score: 88 },
  { subject: "History", score: 78 }
];

const engagementData = [
  { time: "Morning", activity: 50 },
  { time: "Afternoon", activity: 70 },
  { time: "Evening", activity: 90 }
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

export default function DashboardGraphs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 shadow-lg border rounded-lg">
      {/* Attendance Record */}
      <Card className="shadow-lg border rounded-lg p-4 bg-white">
        <h4 className="text-lg font-semibold text-blue-600 mb-10 ">Attendance Record</h4>
        <ResponsiveContainer width="100%" height={120} >
          <LineChart data={attendanceData}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Progress Graph */}
      <Card className="shadow-lg border rounded-lg p-4 bg-white">
        <h4 className="text-lg font-semibold mb-10 text-green-600">Progress Graph</h4>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={progressData}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Breakdown (Pie Chart) */}
      <Card className="shadow-lg border rounded-lg p-4 bg-white">
        <h4 className="text-lg font-semibold text-purple-600">Subjectwise Performance Breakdown</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={performanceData} dataKey="score" nameKey="subject" cx="50%" cy="50%" outerRadius={60} fill="#A855F7" label>
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Engagement Radar Chart */}
      <Card className="shadow-lg border rounded-lg p-4 bg-white">
        <h4 className="text-lg font-semibold text-red-600">Engagement Radar</h4>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart outerRadius={70} data={engagementData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="time" />
            <PolarRadiusAxis />
            <Radar name="Activity" dataKey="activity" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}