





import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./sidebar.styles";
import {
  Avatar,
  Tooltip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { SparklesIcon } from "lucide-react";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";

import * as XLSX from "xlsx";


export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isListening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const languages = [
    { code: "en-IN", label: "English (India)" },
    { code: "kn-IN", label: "Kannada" },
    { code: "hi-IN", label: "Hindi" },
    { code: "ta-IN", label: "Tamil" },
    { code: "te-IN", label: "Telugu" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");


  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = selectedLanguage;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onresult = (event: globalThis.SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      console.log("Recognized:", spokenText);
    };
    

    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleVoiceClick = () => {
    setModalOpen(true);
    setTranscript("");
  };

  const handleModalClose = () => {
    stopListening();
    setModalOpen(false);
  };

  const performTool = async () => {

    const queryParam = encodeURIComponent(transcript); // Encode special characters for URL
    const apiUrl = `  https://chief-formerly-civet.ngrok-free.app/voice_assisstant?user_input=${queryParam}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Accept': '*/*'  // Accepts any content type
      }
  });
  if (response.ok) {
    let contentType = response.headers.get("Content-Type");

    if (!contentType) {
      // If Content-Type is null, try to detect manually
      try {
          const text = await response.text();
          if (text.startsWith("{") || text.startsWith("[")) {
              contentType = "application/json"; // Guess JSON
          } else if (text.includes(",")) {
              contentType = "text/csv"; // Guess CSV
          } else {
              contentType = "application/octet-stream"; // Fallback
          }
      } catch (error) {
          console.error("Error reading response:", error);
      }
  }
  else {

    if (contentType.includes("application/json")) {
        // Handle JSON response
        const jsonData = await response.json();
        console.log("JSON Response:", jsonData);
        alert("Performed task: " + JSON.stringify(jsonData));

    } else if (contentType.includes("text/csv")) {
        // Handle CSV file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        alert("CSV file downloaded successfully!");

    } else if (contentType.includes("application/pdf")) {
        // Handle PDF file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank"); // Open PDF in new tab
        alert("PDF opened in a new tab");

    } else {
        alert("Unknown response type received.");
    }
  }
} else {
    alert("Error occurred while performing the task");
}
   
    
};

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed && <div className={Sidebar.Overlay()} onClick={setCollapsed} />}
      <div className={Sidebar({ collapsed })}>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <div className="flex justify-center mb-6">
              <Button
                className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white text-lg font-bold flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
                onClick={handleVoiceClick}
              >
                <SparklesIcon size={20} className="animate-pulse" />
                Shiksha AI Assistant
                <FilterIcon />
              </Button>
            </div>

            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/dashboard/students"}
                title="Students"
                icon={<AccountsIcon />}
                href="/dashboard/students"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/attendance"}
                title="Attendance"
                icon={<CustomersIcon />}
                href="/dashboard/attendance"
              />
              <SidebarItem
                icon={<BalanceIcon />}
                isActive={pathname === "/dashboard/qpaper"}
                title="AI - Question Paper Generator"
                href="/dashboard/qpaper"
              />
              <SidebarItem isActive={pathname === "/reports"} title="Reports" icon={<ReportsIcon />} />
            </SidebarMenu>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalContent>
          <ModalHeader className="text-xl font-bold text-indigo-700">
            🎙️ Shiksha Voice Assistant
          </ModalHeader>
          <ModalBody className="text-gray-700">
            <div className="flex flex-col items-center gap-3 p-4 border border-indigo-300 rounded-lg">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
              <p className="font-semibold">{isListening ? "Listening..." : "Click to start speaking!"}</p>
              <Button onClick={startListening} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Start Speaking
              </Button>
            </div>
            {transcript && (
            <div>
              
              <div className="p-3 mt-4 bg-gray-100 text-gray-800 rounded-md">
                <p className="font-medium">📝 Recognized Text:</p>
                <textarea
                  className="w-full p-2 mt-2 border rounded-md text-lg"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={3}
                />
            </div>
            <Button onClick={performTool} className="bg-blue-600 text-white  px-4 py-2 rounded-lg">
                Send
              </Button>
              </div>
              
    )}


    <div className="p-4 bg-blue-100 text-blue-700 rounded-md shadow-md mt-4">
<p className="font-semibold">How can Shiksha help?</p>
<ul className="list-disc ml-5 text-sm">
  <li>📅 Schedule classes & events</li>
  <li>📝 Create & manage files effortlessly</li>
  <li>⏰ Set reminders for deadlines</li>
  <li>🗣️ Works in your **preferred language**</li>
</ul>
</div> 

          </ModalBody>
          <ModalFooter>
            <Button onClick={handleModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </aside>
  );
};
