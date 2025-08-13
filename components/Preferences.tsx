import React from 'react'
import { Pencil } from "lucide-react"

const Preferences: React.FC<{keys: string, value: string}> = ({keys, value}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 my-1 w-full relative">
      <p className="text-lg font-bold">Preferences</p>

      <p className="mb-1">Key: {keys}</p>
      <p className="mb-1">Value: {value}</p>

    </div>
  );
}

export default Preferences