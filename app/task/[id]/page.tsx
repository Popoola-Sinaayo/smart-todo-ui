"use client";
import NavigationBar from "@/components/NavigationBar";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [id, setId] = useState(params.id);
  console.log("Editing task with ID:", id);
  return (
    <div className="min-h-screen bg-white flex">
      <ToastContainer />
      <NavigationBar activeTab="create" />
      <div className="pt-6 px-6 w-full flex flex-col mx-auto text-center items-center justify-center">
        <p className="text-2xl font-bold">Edit Task</p>
        <div className="w-full max-w-md mt-4">
          <p className="text-left">Title</p>
          <input
            type="text"
            className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
            placeholder="Enter task title"
          />
          <p className="text-left">Description</p>
          <textarea
            className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
            placeholder="Enter task description"
            rows={4}
          ></textarea>
          <p className="text-left">Category</p>
          <select className="border-0 rounded-md px-2 py-2 w-full mb-4 bg-gray-100">
            <option value="" disabled selected>
              Select category
            </option>
            <option value="work">Work</option>
            <option value="health">Health</option>
            <option value="personal">Personal</option>
          </select>
          <p className="text-black text-left">Task Status</p>
          <select className="border-0 rounded-md px-2 py-2 w-full mb-4 bg-gray-100 text-black">
            <option value="" disabled selected>
              Select task status
            </option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="bg-blue-50 text-white rounded-md px-2 py-4 mb-4">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="text-blue-500" />
              <div>
                <p className="text-blue-500 text-lg">AI Enhanced Fields</p>
              </div>
            </div>
            <p className="text-blue-500 text-[10px]">
              Use AI to generate task details and suggestions
            </p>
            <div>
              <p className="text-black text-left">Priority Score</p>
              <input
                type="number"
                max={100}
                min={1}
                className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-white text-black"
                placeholder="Enter task priority score"
              />
              <p className="text-black text-left">Due Date</p>
              <input
                type="datetime-local"
                className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-white text-black"
                placeholder="Enter task due date"
              />
              <button className="bg-blue-500 text-white rounded-md px-4 py-1 cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                Refine And Complete With AI
              </button>
            </div>
          </div>

          <button className="bg-blue-500 text-white rounded-md px-4 py-1 cursor-pointer hover:bg-blue-600 transition-colors duration-200 w-full">
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
