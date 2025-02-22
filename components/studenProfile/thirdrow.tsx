"use client";

import { Card } from "@/components/ui/card";
import { Phone, Mail, Users, Globe } from "lucide-react";

const parentProfile = {
  name: "Ramesh & Sunita Sharma",
  literacyLevel: "Basic Education",
  preferredCommunication: "Phone Calls & In-Person Meetings",
  digitalAccess: "Limited (No personal devices, relies on community resources)",
  involvement: "Occasionally attends meetings, prefers verbal updates",
  recentComments: "Prefers printed materials for updates, struggles with using digital platforms. Requests teacher assistance for online submissions.",
  language: "Hindi, Basic English"
};

export default function ParentProfile() {
  return (
    <div className=" mx-auto p-4  rounded-lg border shadow-md  flex flex-col">

<h4 className="text-lg font-semibold text-blue-600  mb-1">{"Parents' Information"}</h4>
      <div className="flex">
        {/* Left Column */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md w-1/3 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Communication Tools</h3>
          <div className="space-y-2">
            <button className="w-full bg-white text-gray-800 py-1 px-3 rounded-md shadow hover:bg-blue-200">Send a Mail</button>
            <button className="w-full bg-white text-gray-800 py-1 px-3 rounded-md shadow hover:bg-blue-200">Send an SMS/WhatsApp</button>
            <button className="w-full bg-white text-gray-800 py-1 px-3 rounded-md shadow hover:bg-blue-200">Schedule a Meeting</button>
            <button className="w-full bg-white text-gray-800 py-1 px-3 rounded-md shadow hover:bg-blue-200">Last Message from Parent</button>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="grid grid-cols-3 gap-2 w-2/3 p-2">
          <Card className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Parent Information</h3>
            <p className="text-xs text-gray-700"><strong>Name:</strong> {parentProfile.name}</p>
            <p className="text-xs text-gray-700"><strong>Literacy Level:</strong> {parentProfile.literacyLevel}</p>
          </Card>
          
          <Card className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <Phone size={14} /> Preferred Communication
            </h3>
            <p className="text-xs text-gray-700">{parentProfile.preferredCommunication}</p>
          </Card>
          
          <Card className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-purple-600">Digital Access</h3>
            <p className="text-xs text-gray-700">{parentProfile.digitalAccess}</p>
          </Card>
          
          <Card className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-orange-600 flex items-center gap-1">
              <Users size={14} /> Parental Involvement
            </h3>
            <p className="text-xs text-gray-700">{parentProfile.involvement}</p>
          </Card>
          
          <Card className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-red-600 flex items-center gap-1">
              <Mail size={14} /> Recent Comments
            </h3>
            <p className="text-xs text-gray-700">{parentProfile.recentComments}</p>
          </Card>
          
          <Card className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-indigo-600 flex items-center gap-1">
              <Globe size={14} /> Language
            </h3>
            <p className="text-xs text-gray-700">{parentProfile.language}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
