import React from "react";
import { FaRegImages } from "react-icons/fa6";
import { adminStore } from "../../Store/Store";

export const UploadBox = ({ multiple, onChange }) => {
  const { UploadImage } = adminStore();

  // If a custom onChange is provided, use it (e.g. for local previews).
  // Otherwise fall back to the store's UploadImage (existing behaviour).
  const handleChange = onChange ?? UploadImage;

  return (
    <div className="relative p-3 rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-full bg-gray-50 dark:bg-zinc-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-500 flex flex-col items-center justify-center transition-colors">
      <FaRegImages className="text-4xl opacity-35" />
      <h1 className="dark:text-white text-sm mt-1">Image Upload</h1>
      <input
        type="file"
        name="images"
        multiple={multiple !== undefined ? multiple : false}
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full z-50 opacity-0 cursor-pointer"
      />
    </div>
  );
};
