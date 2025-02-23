"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Textarea, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  { ssr: false }
);

export const Content = () => {
  const [medium, setMedium] = useState("email");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [meetings, setMeetings] = useState<{ date: Date; time: string; agenda: string }[]>([]);

  const scheduleMeeting = () => {
    if (time) {
      setMeetings([...meetings, { date, time, agenda: message }]);
      setMessage("");
      setTime("");
    }
  };

  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-between gap-6 pt-3 px-4 lg:px-0 flex-wrap max-w-[90rem] mx-auto w-full">

        {/* Notification Broadcaster */}
        <div className="bg-default-50 shadow-lg rounded-2xl p-6 flex-1 min-w-[300px] min-h-min">
  <h3 className="text-2xl font-bold mb-2 text-primary">📢 Broadcast Notifications</h3>

  {/* Dropdown for selecting medium */}
  <Dropdown>
    <DropdownTrigger>
      <Button variant="bordered">{medium.toUpperCase()}</Button>
    </DropdownTrigger>
    <DropdownMenu onAction={(key) => setMedium(key as string)}>
      <DropdownItem key="email">Email</DropdownItem>
      <DropdownItem key="sms">Message</DropdownItem>
      <DropdownItem key="whatsapp">WhatsApp</DropdownItem>
    </DropdownMenu>
  </Dropdown>

  {/* Message Input */}
  <Textarea
    placeholder="📨 Draft your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="mt-4"
  />

  {/* Send Button */}
  <Button className="mt-4 w-full" color="primary">🚀 Send Notification</Button>

  {/* Feature Highlight */}
  <div className="mt-4 bg-primary-100 p-3 rounded-lg border-l-4 border-primary">
  <p className="text-gray-700">
  ✅ <span className="font-semibold">Reach Every Parent Instantly</span> – Notify parents in one go via their preferred communication channel.  <br/>
  ✅ <span className="font-semibold">Multi-Platform Support</span> – Send messages via Email, SMS, or WhatsApp.  <br/>
  ✅ <span className="font-semibold">Quick & Efficient</span> – Just type, select, and send!  <br/>
</p>

  </div>
</div>


        {/* Chart Component */}
        <div className="bg-default-50 shadow-lg rounded-2xl p-6 flex-1 min-w-[400px] min-h-min">
          <h3 className="text-xl font-semibold mb-2">Class Progress</h3>
          <Chart />
        </div>

        {/* Scheduling Component with Monthly Calendar */}
        <div className="bg-default-50 shadow-lg rounded-2xl p-6 flex-1 min-w-[300px] min-h-min">
          <h3 className="text-xl font-semibold mb-2">Schedule Meeting</h3>
          <Calendar
            onChange={(date) => setDate(date as Date)}
            value={date}
            className="w-full bg-white rounded-lg p-2"
          />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-2" />
          <Textarea placeholder="Meeting Agenda..." value={message} onChange={(e) => setMessage(e.target.value)} className="mt-4" />
          <Button className="mt-4 w-full" color="success" onClick={scheduleMeeting}>Schedule</Button>

          {/* Display Scheduled Meetings */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Upcoming Meetings</h4>
            {meetings.length === 0 ? (
              <p className="text-gray-500">No meetings scheduled.</p>
            ) : (
              <ul className="mt-2">
                {meetings.map((m, index) => (
                  <li key={index} className="text-sm">
                    📅 {m.date.toDateString()} 🕒 {m.time} - {m.agenda}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Forum Component */}
        <div className="bg-default-50 shadow-lg rounded-2xl p-6 flex-1 min-w-[300px] min-h-min">
          <h3 className="text-xl font-semibold mb-2">Teachers Forum</h3>
          <Textarea placeholder="Share your thoughts..." className="mt-2" />
          <Button className="mt-4 w-full" color="secondary">Post</Button>
          <div className="mt-4">
            <p><strong>Mr. Sharma:</strong> Todays session on AI was great!</p>
            <p><strong>Ms. Gupta:</strong> Looking forward to the sports meet!</p>
          </div>
        </div>

      </div>
    </div>
  );
};
