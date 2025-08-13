import React from 'react'
import { Pencil } from "lucide-react"

const Category: React.FC<{ id: string; tag: string; category: string }> = ({ id, tag, category }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 my-1 w-full relative">
      <p className="text-lg font-bold">{category}</p>

      <p className="mb-1">Tag: {tag}</p>

      
    </div>
  );
}

export default Category