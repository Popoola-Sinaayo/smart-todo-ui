"use client";
import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Category from "@/components/Category";
  import { ToastContainer, toast } from "react-toastify";
import api from "@/request";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [categoryData, setCategoryData] = useState<{ id: string, tag: string, category: string }[]>([]);
  
  const [form, setForm] = useState<{ category: string; tag: string }>({
    category: "",
    tag: "",
  });

  const addCategory = async (category: string, tag: string) => {
    try {
      const response = await api.post("/categories/", { category, tag });
      if (response?.data) {
        toast.success("Category added successfully");
        setCategoryData([...categoryData, response.data]);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
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
  }, [])
  return (
    <div className="min-h-screen bg-white flex">
      <ToastContainer />
      <NavigationBar activeTab="categories" />
      <div className="pt-6 px-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            Categories
          </p>
          <button
            className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Category Form" : "Add Category"}
          </button>
        </div>

        {showForm && (
          <div className="border border-gray-300 rounded-md p-4 mt-8">
            <p className="text-left font-semibold text-lg mb-4">New Category</p>
            <p className="text-left">Category</p>
            <input
              type="text"
              className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
              placeholder="Enter category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <p className="text-left">Tag</p>
            <input
              type="text"
              className="border-0 rounded-md px-2 py-1 w-full mb-4 bg-gray-100"
              placeholder="Enter tag"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            />
            <button className="bg-[#602BEF] text-white rounded-md px-4 py-1 cursor-pointer hover:bg-[#602BEF4D] transition-colors duration-200 w-full"
            
            onClick={() => addCategory(form.category, form.tag)}
            >
              Create Category
            </button>
          </div>
        )}

        <div>
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            All Categories
          </p>
          {categoryData.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              tag={category.tag}
              category={category.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
