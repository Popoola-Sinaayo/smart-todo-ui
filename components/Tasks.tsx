import React from 'react'
import { Pencil } from "lucide-react"
import { useRouter } from 'next/navigation';

const Tasks: React.FC<{
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  priority_score: number;
  deadline: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string;
}> = ({
  id,
  title,
  description,
  category,
  status,
  priority_score,
  deadline,
  created_at,
  updated_at
}) => {
  const router = useRouter();
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 my-1 w-full relative">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm">{description}</p>

      <p className="mb-1">Tags: {category}</p>
      <p className="mb-1">Status: {status}</p>
      <p className="mb-1">Date Created: {new Date(created_at).toLocaleDateString()}</p>

      <div className="absolute top-2 right-2 bg-red-500 text-white rounded-[999px] px-4 py-1">
        <p className="text-[10px] font-bold">Priority: {priority_score}</p>
      </div>

      <div
        className="absolute bottom-2 right-2 cursor-pointer"
        onClick={() => router.push(`/task/${id}`)}
      >
        <Pencil size="16px" />
      </div>
    </div>
  );
};

export default Tasks