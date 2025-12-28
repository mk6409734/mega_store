import React from "react";
import { FaRegImages } from "react-icons/fa6";
export const UploadBox = ({multiple}) => {
  return (
    <div className="relative p-3 rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-full bg-gray-50 dark:bg-zinc-600 cursor-pointer hover:bg-gray-100 flex flex-col items-center justify-center">
      <FaRegImages className="text-4xl opacity-35" />
      <h1 className="dark:text-white">Image Upload</h1>

      <input
        type="file"
        multiple={multiple !== undefined ? multiple : false}
        className="absolute inset-0 w-full h-full z-50 opacity-0"
      />
    </div>
  );
};
