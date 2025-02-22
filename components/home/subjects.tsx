import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import Image from "next/image";
import { useParams } from "next/navigation";
import { users } from "../table/data";
import { FaUser, FaBirthdayCake, FaSchool, FaHeartbeat, FaIdCard, FaPhone, FaBook, FaTint, FaIdBadge, FaBrain } from "react-icons/fa";

export const Subjects = () => {
   const params = useParams();
    const id = params?.id;
    const user = users.find((user) => user.id === Number(id));
    if (!user) return <h2 className="text-center text-red-500">User not found</h2>;
  
  return (
    <Card className="xl:max-w-sm bg-white rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
       <div >
           <h4 className="text-md font-bold text-gray-800 flex items-center gap-2"> Subjects</h4>
    <ul className="list-disc pl-6 text-gray-700">
      {user.subjects?.length > 0 ? (
        user.subjects.map((subject, index) => (
          <li key={index}>{subject}</li>
        ))
      ) : (
        <li>No subjects available</li>
      )}
    </ul>
         </div>
        
      </CardBody>
    </Card>
  );
};


