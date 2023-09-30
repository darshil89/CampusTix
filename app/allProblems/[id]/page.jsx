"use client";

import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
export default function Problem({ params: { id } }) {
  const [problem, setProblem] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problem data
        const problemRes = await fetch(
          `http://localhost:3000/api/problem/${id}`,
          {
            cache: "no-cache",
          }
        );

        if (!problemRes.ok) {
          throw new Error("Problem not found");
        }

        const problemData = await problemRes.json();
        setProblem(problemData);

        // Fetch user data
        const userRes = await fetch(
          `http://localhost:3000/api/user/${problemData.problem.userId}`,
          {
            cache: "no-cache",
          }
        );

        if (!userRes.ok) {
          throw new Error("User not found");
        }

        const userData = await userRes.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!problem || !user) {
    return <SyncLoader className="text-center mt-10" color="#2e3634" />;
  }

  const { title, content, floorNumber, roomNumber, buildingNumber, createdAt } =
    problem.problem;

  const { name, email } = user.user;

  return (
    <>
      <div className="text-xl">Problem</div>
      <div>My Problem id is = {id}</div>
      <div>Time = {createdAt}</div>
      <div>My Problem title is = {title}</div>
      <div>My Problem content is = {content}</div>
      <div>My Problem floorNumber is = {floorNumber}</div>
      <div>My Problem roomNumber is = {roomNumber}</div>
      <div>My Problem buildingNumber is = {buildingNumber}</div>
      <div className="text-xl">User</div>
      <div>User Name = {name}</div>
      <div>User Email = {email}</div>
    </>
  );
}
