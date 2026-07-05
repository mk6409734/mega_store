import React, { useEffect, useState } from "react";
import { UploadBox } from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { adminStore } from "../../Store/Store";
import { CateoryApi } from "../../utils/api";
import toast from "react-hot-toast";

export const EditSubCategory = () => {
  
  const {
    GetCategory,
    loading,
    dialogProps,
    handleClose,
    setCategories,
  } = adminStore();
  const [categories, setCategoriesState] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    parentId: "",
    parentCatName: "",
    _id: "",
  });
  const [selectedRoot, setSelectedRoot] = useState("");

  useEffect(() => {
    // Fetch categories for the parent dropdown
    const fetchCategories = async () => {
      const res = await GetCategory();
      if (res && res.data) {
        setCategoriesState(res.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (dialogProps?.categoryData) {
      const data = dialogProps.categoryData;
      setFormData({
        name: data.name || "",
        parentId: data.parentId || "",
        parentCatName: data.parentCatName || "",
        _id: data._id,
      });

      // Determine Root Category
      if (data.parentId) {
        // ... (Logic remains same)
      }
    }
  }, [dialogProps]);

  // Separate effect to set selectedRoot once categories are loaded and formData is set
  useEffect(() => {
    if (categories.length > 0 && formData.parentId) {
      const rootCat = categories.find((c) => c._id === formData.parentId);
      if (rootCat) {
        // The parent is a Root category
        setSelectedRoot(formData.parentId);
      } else {
        // The parent is likely a subcategory. Find its parent (the Root).
        const grandParent = categories.find(
          (c) =>
            c.children &&
            c.children.some((child) => child._id === formData.parentId),
        );
        if (grandParent) {
          setSelectedRoot(grandParent._id);
        }
      }
    }
  }, [categories, formData.parentId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "ProductCategory") {
      const selectedCat = categories.find((cat) => cat._id === value);
      setSelectedRoot(value);
      setFormData((prev) => ({
        ...prev,
        parentId: value,
        parentCatName: selectedCat ? selectedCat.name : "",
      }));
    } else if (name === "SecondLevelCategory") {
      if (value === "") {
        const rootCat = categories.find((cat) => cat._id === selectedRoot);
        setFormData((prev) => ({
          ...prev,
          parentId: selectedRoot,
          parentCatName: rootCat ? rootCat.name : "",
        }));
      } else {
        const root = categories.find((c) => c._id === selectedRoot);
        const sub = root?.children?.find((c) => c._id === value);
        setFormData((prev) => ({
          ...prev,
          parentId: value,
          parentCatName: sub ? sub.name : "",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.parentId) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      name: formData.name,
      parentId: formData.parentId,
      parentCatName: formData.parentCatName,
    };

    try {
      const res = await CateoryApi.UpdateCategory(formData._id, payload);
      if (res.data.success) {
        toast.success("SubCategory updated successfully");
        handleClose();

        // Refresh global categories if needed
        const updatedRes = await GetCategory();
        setCategories(updatedRes?.data || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating");
    }
  };

  return (
    <section className="p-8 dark:bg-zinc-700">
      <form onSubmit={handleSubmit} className="">
        <div className="w-1/2 p-5 px-0">
          <div>
            <h1 className="mb-3 dark:text-white">Parent Category</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="ProductCategory"
              value={selectedRoot}
              onChange={handleInput}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <br />

          {/* New dropdown for 2nd Level Category */}
          {categories.find((c) => c._id === selectedRoot)?.children?.length >
            0 && (
            <>
              <div>
                <h1 className="mb-3 dark:text-white">
                  Sub Category (Optional)
                </h1>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="SecondLevelCategory"
                  value={
                    categories
                      .find((c) => c._id === selectedRoot)
                      .children.some((child) => child._id === formData.parentId)
                      ? formData.parentId
                      : ""
                  }
                  onChange={handleInput}
                >
                  <option value="">Select Sub Category (For 3rd Level)</option>
                  {categories
                    .find((c) => c._id === selectedRoot)
                    .children.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
              <br />
            </>
          )}
          <div>
            <h1 className="mb-1 dark:text-white">Sub Category Name</h1>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              placeholder="Enter Sub Category Name"
            />
          </div>
        </div>

        <br />

        <Button
          type="submit"
          disabled={loading}
          className="!bg-blue-600 !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2 disabled:opacity-50"
        >
          <FaCloudUploadAlt className="text-xl" />
          {loading ? "Updating..." : "Update SubCategory"}
        </Button>
      </form>
    </section>
  );
};
