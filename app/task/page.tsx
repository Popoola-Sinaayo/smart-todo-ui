"use client";
import NavigationBar from "@/components/NavigationBar";
import api from "@/request";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    priority_score: 0,
    deadline: new Date().toISOString().slice(0, 16), // Default to current date and time
  });

  const [categoryData, setCategoryData] = useState<
    { id: string; tag: string; category: string }[]
  >([]);

  const handleCreateTask = async () => {
    try {
      const response = await api.post("/tasks/", form);
      if (response?.data) {
        toast.success("Task created successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const getAISuggestions = async () => {
    try {
      const response = await api.post("/ai/tasks", {
        title: form.title,
        description: form.description,
        category: form.category,
      });
      console.log(response.data);
      if (response?.data) {
        setForm({
          ...form,
          priority_score: response.data.priority_score,
          deadline: response.data.deadline,
        });
        toast.success("AI suggestions applied");
      }
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      toast.error("Failed to get AI suggestions");
    }
  };

  const getAISuggestionsTask = async () => {
    try {
      const response = await api.get("/ai/tasks/suggestions");
      console.log(response.data);
      if (response?.data) {
        setForm({
          ...form,
          ...response.data,
        });
        toast.success("AI suggestions applied");
      }
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      toast.error("Failed to get AI suggestions");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        if (response?.data) {
          console.log("Fetched categories:", response.data);
          setCategoryData(response.data);
          toast.success("Categories fetched successfully");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      <ToastContainer />
      <NavigationBar activeTab="create" />
      <div className="pt-6 px-6 w-full flex flex-col mx-auto text-center items-center justify-center">
        <p className="text-2xl font-bold">Create New Task</p>
        <div className="w-full max-w-md mt-4">
          <p className="text-left">Title</p>
          <input
            type="text"
            className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <p className="text-left">Description</p>
          <textarea
            className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
            placeholder="Enter task description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
          <p className="text-left">Category</p>
          <select
            className="border-0 rounded-md px-2 py-2 w-full mb-4 bg-gray-100"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option disabled selected>
              Select category
            </option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
          <p className="text-black text-left">Task Status</p>
          <select
            className="border-0 rounded-md px-2 py-2 w-full mb-4 bg-gray-100 text-black"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
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
                value={form.priority_score}
                onChange={(e) =>
                  setForm({ ...form, priority_score: Number(e.target.value) })
                }
              />
              <p className="text-black text-left">Due Date</p>
              <input
                type="datetime-local"
                className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-white text-black"
                placeholder="Enter task due date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
              <button
                className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D]transition-colors duration-200"
                onClick={getAISuggestions}
              >
                Refine And Complete With AI
              </button>
            </div>
          </div>

          <button
            className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200 w-full"
            onClick={handleCreateTask}
          >
            Create Task
          </button>

          <button
            className="bg-white text-[#602BEF] rounded-md px-4 py-1 cursor-pointer transition-colors duration-200 w-full mt-4"
            onClick={handleCreateTask}
          >
            Get AI Suggested Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
