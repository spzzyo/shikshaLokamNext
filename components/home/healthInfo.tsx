import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { useParams } from "next/navigation";
import { users } from "../table/data";
import { HeartPulse, Cake, Droplets, Phone } from "lucide-react";

export const HealthInfo = () => {
  const params = useParams();
  const id = params?.id;
  const user = users.find((user) => user.id === Number(id));
  if (!user) return <h2 className="text-center text-red-500">User not found</h2>;

  return (
    <Card className="xl:max-w-sm bg-white rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div>
          <h4 className="text-md font-bold text-gray-800 flex items-center gap-2">
            <HeartPulse size={18} /> Health & Identity
          </h4>
          <p className="text-gray-700 flex items-center gap-2">
            <Cake size={18} /> Age: {user.age}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Droplets size={18} /> Blood Group: B+
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Phone size={18} /> Emergency Contact: {user.phone}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
