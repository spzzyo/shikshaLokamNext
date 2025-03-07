"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button, Textarea, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Calendar from "./calendar";
import {users} from "@/components/table/data"; 


const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  { ssr: false }
);

export const Content = () => {
  const [medium, setMedium] = useState("email");
  const [message, setMessage] = useState("");
 

  const sendNotification = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        "https://chief-formerly-civet.ngrok-free.app/send-notification",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (response.ok) {
        alert("Notification sent successfully!");
        setMessage(""); // Clear input after sending
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Error sending notification.");
    }
  };
  

  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-between gap-6 pt-3 px-4 lg:px-0 flex-wrap max-w-[90rem] mx-auto w-full">

        {/* Notification Broadcaster */}
        <div className="bg-default-50 shadow-lg rounded-2xl p-6 flex-1 min-w-[300px] min-h-min">
  <h3 className="text-2xl font-bold mb-2 text-primary">Broadcast Notifications</h3>

  {/* Dropdown for selecting medium */}
  

  {/* Message Input */}
  <Textarea
    placeholder="📨 Draft your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="mt-4"
  />

  {/* Send Button */}
  <Button className="mt-4 w-full" color="primary" onClick={sendNotification}>Send Notification</Button>

  {/* Feature Highlight */}
  <div className="mt-4 bg-primary-100 p-3 rounded-lg border-l-4 border-primary">
  <p className="text-gray-700">
  ✅ <span className="font-semibold">Reach Every Parent Instantly</span> – Notify parents in one go via their preferred communication channel.  <br/>
  ✅ <span className="font-semibold">Multi-Platform Support</span> – Send messages via Email, SMS, or WhatsApp.  <br/>
  ✅ <span className="font-semibold">Quick & Efficient</span> – Just type, select, and send!  <br/>
</p>

  </div>
</div>


<div className="bg-default-50 shadow-lg rounded-2xl p-4 flex-1 min-w-[400px] min-h-min">
          <Calendar />
        </div>
        {/* Chart Component */}
        <div className="bg-default-50 shadow-lg rounded-2xl p-4 flex-1 min-w-[400px] min-h-min">
          <h3 className="text-xl font-semibold mb-2">Class Progress</h3>
          <Chart />
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
