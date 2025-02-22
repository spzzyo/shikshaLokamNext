import React, { useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
// import { MicIcon } from "../icons/sidebar/mic-icon"; // Assuming a microphone icon
import { SparklesIcon } from "lucide-react"; 
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isListening, setListening] = useState(false);

  const handleVoiceClick = () => {
    setModalOpen(true);
    setListening(true);
    setTimeout(() => setListening(false), 3000); // Simulating listening process
  };

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div className={Sidebar({ collapsed: collapsed })}>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>

            {/* 🔥 Shiksha AI Button */}
            <div className="flex justify-center mb-6">
              <Button
                className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white text-lg font-bold flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition"
                onClick={handleVoiceClick}
              >
                <SparklesIcon size={20} className="animate-pulse" />
                Shiksha AI Assistant
                <FilterIcon  />
              </Button>
            </div>

            {/* 📌 Sidebar Items */}
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
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>
          </div>

          {/* ⚙️ Sidebar Footer */}
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* 🎙️ Shiksha Voice Assistant Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="text-xl font-bold text-indigo-700">🎙️ Shiksha Voice Assistant</ModalHeader>
          <ModalBody className="text-gray-700">
            <div className="flex items-center gap-3 p-4 border border-indigo-300 rounded-lg">
              <div  className={`text-indigo-600 ${isListening ? "animate-pulse" : ""}`} />
              <p className="font-semibold">{isListening ? "Listening..." : "Say a command!"}</p>
            </div>

            {/* ℹ️ Info Box */}
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
            <Button onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </aside>
  );
};
