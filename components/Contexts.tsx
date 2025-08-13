import React from 'react'
import { Pencil } from "lucide-react"

const Context: React.FC<{ context: string; source: string; processed_insights: string }> = ({ context, source, processed_insights }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 my-1 w-full relative">
      <p className="text-lg font-bold">{context}</p>

      <p className="mb-1">Source: {source}</p>
      <p className="mb-1">Insights: {processed_insights}</p>

    </div>
  );
}

export default Context