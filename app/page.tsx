"use client";
import NavigationBar from "@/components/NavigationBar";
import Tasks from "@/components/Tasks";
import api from "@/request";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<
    {
      id: number;
      title: string;
      description: string;
      category: string;
      status: string;
      priority_score: number;
      deadline: string; // ISO date string
      created_at: string; // ISO date string
      updated_at: string;
    }[]
  >([]);
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await api.get("/tasks");
        if (response?.data) {
          console.log("Fetched tasks:", response.data);
          setTasks(response.data);
        } else {
          console.error("No tasks found");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getAllTasks();
  }, []);
  return (
    <div className="min-h-screen bg-white flex">
      <NavigationBar activeTab="dashboard" />
      <div className="pt-6 px-6 w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
          <p>Overview of all your tasks and productivity insights</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-semibold text-gray-800 mt-4">
              All Tasks
            </p>
            <select className="border border-gray-300 rounded-md px-1 py-1 bg-white w-[150px]">
              <option value="today" disabled>
                Filter
              </option>
              <option value="today">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="high-priority">High Priority</option>
              <option value="medium-priority">Medium Priority</option>
              <option value="low-priority">Low Priority</option>
              <option value="work-category">Work Category</option>
              <option value="health-category">Health Category</option>
            </select>
          </div>
          <div>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Tasks
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  category={task.category}
                  status={task.status}
                  priority_score={task.priority_score}
                  deadline={task.deadline}
                  created_at={task.created_at}
                  updated_at={task.updated_at}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <p className="text-gray-500">No tasks available</p>
              </div>
            )}
            {/* <Tasks />
            <Tasks />
            <Tasks />
            <Tasks /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
