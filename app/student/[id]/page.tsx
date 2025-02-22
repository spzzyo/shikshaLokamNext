"use client";
import { useParams } from "next/navigation";
import { users } from "@/components/table/data";

const Home = () => {
    const params = useParams();
    const id = params?.id;
  
    const user = users.find((user) => user.id === Number(id));
  
    if (!user) return <h2>User not found</h2>;

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Grade:</strong> {user.grade}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
};

export default Home;
