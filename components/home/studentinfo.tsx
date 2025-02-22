import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import Image from "next/image";
import { useParams } from "next/navigation";
import { users } from "../table/data";
import { User, Cake, GraduationCap, HeartPulse, BadgePercent, Phone, Book, Droplets, BadgeCheck, BrainCircuit } from "lucide-react";

export const BasicInfo = () => {
   const params = useParams();
    const id = params?.id;
    const user = users.find((user) => user.id === Number(id));
    if (!user) return <h2 className="text-center text-red-500">User not found</h2>;
  
  return (
    <Card className="xl:max-w-sm bg-white rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
       <div>
           <h4 className="text-md font-bold text-gray-800 flex items-center gap-2">
             <User size={18} /> Basic Information
           </h4>
           <p className="text-gray-700 flex items-center gap-2"><BadgePercent size={18} /> Name: {user.name}</p>
           <p className="text-gray-700 flex items-center gap-2"><GraduationCap size={18} /> Grade: {user.grade}, Section: {user.section}</p>
           <p className="text-gray-700 flex items-center gap-2"><BadgeCheck size={18} /> Student ID: {user.id}</p>
         </div>
      </CardBody>
    </Card>
  );
};
