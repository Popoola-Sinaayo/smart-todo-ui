"use client";
import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Context from "@/components/Contexts";
import { ToastContainer, toast } from "react-toastify";
import api from "@/request";

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<{ content: string; source: string; processed_insights: string }>({
    content: "",
    source: "",
    processed_insights: "",
  });

  const [contexts, setContexts] = useState<
    { content: string; source: string; processed_insights: string }[]
  >([]);

  const addContext = async (content: string, source: string, processed_insights: string) => {
    try {
      const response = await api.post("/context-entries/", { content, source, processed_insights });
      if (response?.data) {
        toast.success("Context added successfully");
        setContexts([...contexts, response.data]);
      }
    } catch (error) {
      console.error("Error adding context:", error);
      toast.error("Failed to add context");
    }
  };

  useEffect(() => {
    const getAllContexts = async () => {
      try {
        const response = await api.get("/context-entries");
        if (response?.data) {
          console.log("Fetched contexts:", response.data);
          setContexts(response.data);
          toast.success("Contexts fetched successfully");
        } else {
          toast.error("No contexts found");
        }
      } catch (error) {
        console.error("Error fetching contexts:", error);
        toast.error("Failed to fetch contexts");
      }
    };
    getAllContexts();
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      <ToastContainer />
      <NavigationBar activeTab="context" />
      <div className="pt-6 px-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            Context Entries
          </p>
          <button
            className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Context Form" : "Add Context Entries"}
          </button>
        </div>

        {showForm && (
          <div className="border border-gray-300 rounded-md p-4 mt-8">
            <p className="text-left font-semibold text-lg mb-4">New Context</p>
            <p className="text-left">Context</p>
            <input
              type="text"
              className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
              placeholder="Enter context"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <p className="text-left">Source</p>
            <select
              className="border-0 rounded-md px-2 py-2 w-full mb-4 bg-gray-100"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            >
              <option value="" disabled selected>
                Select source
              </option>
              <option value="whatsapp">Whatsapp</option>
              <option value="email">Email</option>
              <option value="personal-notes">Personal Notes</option>
            </select>
            <p className="text-left">Insight Priorities</p>
            <select
              className="border-0 rounded-md px-2 py-2 w-full mb-4 bg-gray-100"
              value={form.processed_insights}
              onChange={(e) => setForm({ ...form, processed_insights: e.target.value })}
            >
              <option value="" disabled selected>
                Select insight priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200 w-full"
              onClick={() => addContext(form.content, form.source, form.processed_insights)}
            >
              Create Context
            </button>
          </div>
        )}

        <div>
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            All Context Entries
          </p>
          {contexts.map((context, index) => (
            <Context
              key={index}
              context={context.content}
              source={context.source}
              processed_insights={context.processed_insights}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
