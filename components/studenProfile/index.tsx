"use client";
import React from "react";
import { useParams } from "next/navigation";
import { users } from "@/components/table/data";
import { BarChart, Bar, LineChart, Line, PieChart, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { FaUser, FaBirthdayCake, FaSchool, FaHeartbeat, FaIdCard, FaPhone, FaBook, FaTint, FaIdBadge, FaBrain } from "react-icons/fa";
import Image from "next/image";
import { BasicInfo } from "../home/studentinfo";
import { HealthInfo } from "../home/healthInfo";
import { AiOverview } from "../home/aiOverview";
import { Subjects } from "../home/subjects";
import DashboardGraphs from "./secondRow";
import ParentProfile from "./thirdrow";
import LessonPlan from "./fourthRow";
import ExtraCurricular from "./fifthrow";

export const StudentProfile = () => {
  const params = useParams();
  const id = params?.id;
  const user = users.find((user) => user.id === Number(id));
  if (!user) return <h2 className="text-center text-red-500">User not found</h2>;

  const gradesData = [
    { subject: "Math", grade: 85 },
    { subject: "Science", grade: 90 },
    { subject: "History", grade: 78 },
    { subject: "English", grade: 88 },
  ];

  const attendanceData = [
    { month: "Jan", attendance: 95 },
    { month: "Feb", attendance: 92 },
    { month: "Mar", attendance: 90 },
    { month: "Apr", attendance: 96 },
  ];

  const activityData = [
    { name: "Sports", value: 30 },
    { name: "Arts", value: 20 },
    { name: "Clubs", value: 25 },
    { name: "Volunteering", value: 25 },
  ];

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">Student Profile</h3>
     

<div className="flex items-start justify-between shadow-lg border rounded-lg gap-6 p-6">
  {/* User Avatar */}
  <div className="flex-shrink-0 w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
    <Image width={300} height={300} src={user.avatar} alt={user.name} className="w-full h-full object-cover blur-sm" />
  </div>

 <BasicInfo/>
<HealthInfo/>
<Subjects/>
<AiOverview/>
</div>

      <DashboardGraphs/>
      <ParentProfile/>
      <LessonPlan/>
      <ExtraCurricular/>

      <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h4 className="text-lg font-semibold">Extracurricular Activities</h4>
         
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="text-lg font-semibold">Teachers Notes</h4>
          <p className="text-gray-700">{ "No notes available."}</p>
        </div>
      </div>
    </div>
  );
};