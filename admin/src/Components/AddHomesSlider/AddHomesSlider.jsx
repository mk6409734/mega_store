import { useState } from "react";
import { HomeSliderApi } from "../../utils/api";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa6";

export const AddHomeSlider = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) {
      toast.error("Please select images");
      return;
    }
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    try {
      await HomeSliderApi.add(formData);
      toast.success("Slide added");
      setImages([]);
    } catch (err) {
      toast.error("Failed to add slide");
    }
  };

  return (
    <section className="p-8 dark:bg-zinc-700">
      <form onSubmit={handleSubmit} className="">
        <div className="w-full space-y-4">
          <div className="relative p-3 rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-50 bg-gray-50 dark:bg-zinc-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-500 flex flex-col items-center justify-center transition-colors">
            <FaRegImages className="text-4xl opacity-35" />
            <h1 className="dark:text-white text-sm mt-1">Upload Images</h1>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full z-50 opacity-0 cursor-pointer"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-6 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <span
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute w-6 h-6 rounded-full overflow-hidden bg-red-700 -top-2 right-5 flex items-center justify-center z-50 cursor-pointer hover:bg-red-800 transition-colors"
                  >
                    <IoClose className="text-white" />
                  </span>
                  <div className="relative rounded-md overflow-hidden border border-dashed border-gray-500 h-40 w-50 bg-gray-50 dark:bg-zinc-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-500 flex flex-col items-center justify-center">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            <Button
              type="submit"
              className="!bg-blue-600 !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2"
            >
              <FaCloudUploadAlt className="text-xl" />
              Publish and View
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};
