/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Preferences from "@/components/Preferences";
import { ToastContainer, toast } from "react-toastify";
import api from "@/request";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [preferences, setPreferences] = useState<
    { key: string; value: string }[]
  >([]);
  const [form, setForm] = useState<{ key: string; value: string }>({
    key: "",
    value: "",
  });
  const addPreference = async (key: string, value: string) => {
    try {
      const response = await api.post("/preferences/", { preferences: {[key]: value} });
      if (response?.data) {
        toast.success("Preference added successfully");
      }
    } catch (error) {
      console.error("Error adding preference:", error);
      toast.error("Failed to add preference");
    }
  };
  useEffect(() => {
    const getAllPreferences = async () => {
      const response = await api.get("/preferences");
      if (response?.data) {
        toast.success("Preferences fetched successfully");
        setPreferences(
          response.data?.map((pref: any) => {
            return {
              key: Object.keys(pref.preferences)[0],
              value: Object.values(pref.preferences)[0],
            };
          })
        );
      }
    };
    getAllPreferences();
  }, []);
  return (
    <div className="min-h-screen bg-white flex">
      <ToastContainer />
      <NavigationBar activeTab="preferences" />
      <div className="pt-6 px-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            Preferences
          </p>
          <button
            className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Preferences" : "Add Preferences"}
          </button>
        </div>

        {showForm && (
          <div className="border border-gray-300 rounded-md p-4 mt-8">
            <p className="text-left font-semibold text-lg mb-4">
              New Preference
            </p>
            <p className="text-left">Key</p>
            <input
              type="text"
              className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
              placeholder="Enter context"
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
            />
            <p className="text-left">Value</p>
            <input
              type="text"
              className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
              placeholder="Enter context"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
            />

            <button
              className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200 w-full"
              onClick={() => {
                if (form.key && form.value) {
                  addPreference(form.key, form.value);
                  setPreferences([
                    ...preferences,
                    { key: form.key, value: form.value },
                  ]);
                  setForm({ key: "", value: "" });
                } else {
                  toast.error("Please fill in both fields");
                }
              }}
            >
              Create Preference
            </button>
          </div>
        )}

        <div>
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            All Preferences
          </p>

          {preferences.map((pref, index) => (
            <Preferences key={index} keys={pref.key} value={pref.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
