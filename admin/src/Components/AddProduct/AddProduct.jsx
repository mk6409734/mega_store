import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./AddProduct.css";
import { UploadBox } from "../UploadBox/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { adminStore } from "../../Store/Store";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export const AddProduct = () => {
  const {
    CreateProduct,
    UploadProductImages,
    GetCategory,
    uploading,
    loading,
    handleClose,
  } = adminStore();

  // ─── Category state (3 levels) ───────────────────────────────────────────
  const [rootCategories, setRootCategories] = useState([]); // Level 1
  const [subCategories, setSubCategories] = useState([]); // Level 2
  const [thirdCategories, setThirdCategories] = useState([]); // Level 3

  // ─── Form state ──────────────────────────────────────────────────────────
  const [data, setData] = useState({
    name: "",
    description: "",
    // Level 1
    catName: "",
    catId: "",
    // Level 2
    SubcatName: "",
    SubcatId: "",
    // Level 3
    ThirdcatName: "",
    ThirdcatId: "",
    // Other
    price: "",
    oldPrice: "",
    Isfeatured: "false",
    countInStock: "",
    brand: "",
    discount: "",
    productWeight: [],
    size: [],
    productRam: [],
    rating: 0,
  });

  const [previewImages, setPreviewImages] = useState([]); // { file, url }
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // ─── Fetch categories on mount ────────────────────────────────────────────
  useEffect(() => {
    const loadCategories = async () => {
      const res = await GetCategory();
      if (res?.success && Array.isArray(res.data)) {
        // res.data is the nested tree: [ { _id, name, children: [...] } ]
        setRootCategories(res.data);
      }
    };
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Cascade: when root category changes, update subcategories ───────────
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = rootCategories.find((c) => c._id === selectedId);

    setData((prev) => ({
      ...prev,
      catId: selectedId,
      catName: selected?.name || "",
      // reset deeper levels
      SubcatId: "",
      SubcatName: "",
      ThirdcatId: "",
      ThirdcatName: "",
    }));
    setSubCategories(selected?.children || []);
    setThirdCategories([]);
  };

  // ─── Cascade: when subcategory changes, update third cats ────────────────
  const handleSubCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = subCategories.find((c) => c._id === selectedId);

    setData((prev) => ({
      ...prev,
      SubcatId: selectedId,
      SubcatName: selected?.name || "",
      // reset deeper level
      ThirdcatId: "",
      ThirdcatName: "",
    }));
    setThirdCategories(selected?.children || []);
  };

  // ─── Cascade: when third category changes ────────────────────────────────
  const handleThirdCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = thirdCategories.find((c) => c._id === selectedId);

    setData((prev) => ({
      ...prev,
      ThirdcatId: selectedId,
      ThirdcatName: selected?.name || "",
    }));
  };

  // ─── Generic field handler ────────────────────────────────────────────────
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ─── Image previews ───────────────────────────────────────────────────────
  const handleFileChange = (files) => {
    if (!files || files.length === 0) return;
    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removePreview = (index) => {
    setPreviewImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(previewImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPreviewImages(items);
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrls = [...uploadedImageUrls];

    // 1. Upload pending images to Cloudinary first
    if (previewImages.length > 0) {
      const files = previewImages.map((p) => p.file);
      const res = await UploadProductImages(files);
      if (res?.success && res.image) {
        imageUrls = [...imageUrls, ...res.image];
        setUploadedImageUrls(imageUrls);
        previewImages.forEach((p) => URL.revokeObjectURL(p.url));
        setPreviewImages([]);
      } else {
        return; // abort if upload failed
      }
    }

    // 2. Build payload
    const payload = {
      ...data,
      images: imageUrls,
      price: Number(data.price),
      oldPrice: Number(data.oldPrice) || 0,
      countInStock: Number(data.countInStock),
      discount: Number(data.discount) || 0,
      Isfeatured: data.Isfeatured === "true",
      rating: Number(data.rating) || 0,
    };

    const res = await CreateProduct(payload);
    if (res?.success) {
      // Reset form
      setData({
        name: "",
        description: "",
        catName: "",
        catId: "",
        SubcatName: "",
        SubcatId: "",
        ThirdcatName: "",
        ThirdcatId: "",
        price: "",
        oldPrice: "",
        Isfeatured: "false",
        countInStock: "",
        brand: "",
        discount: "",
        productWeight: [],
        size: [],
        productRam: [],
        rating: 0,
      });
      setPreviewImages([]);
      setUploadedImageUrls([]);
      setSubCategories([]);
      setThirdCategories([]);
      if (handleClose) handleClose();
    }
  };

  const isSubmitting = loading || uploading;

  // ─── Select field class ───────────────────────────────────────────────────
  const selectClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const numberInputClass =
    inputClass +
    " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  // Configuration for React Select to somewhat match Tailwind styles
  const reactSelectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "rgb(249 250 251)", // bg-gray-50
      borderColor: "rgb(209 213 219)", // border-gray-300
      borderRadius: "0.5rem", // rounded-lg
      minHeight: "42px",
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "rgb(224 242 254)", // bg-sky-100
      borderRadius: "0.25rem",
    }),
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: "rgb(3 105 161)", // text-sky-700
      fontWeight: "500",
    }),
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      color: "rgb(3 105 161)",
      ":hover": {
        backgroundColor: "rgb(186 230 253)", // bg-sky-200
        color: "rgb(3 105 161)",
      },
    }),
  };

  const weightOptions = [
    { value: "2kg", label: "2 KG" },
    { value: "4kg", label: "4 KG" },
    { value: "5kg", label: "5 KG" },
    { value: "10kg", label: "10 KG" },
  ];

  const sizeOptions = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
    { value: "xxl", label: "XXL" },
  ];

  const ramOptions = [
    { value: "4gb", label: "4 GB" },
    { value: "6gb", label: "6 GB" },
    { value: "8gb", label: "8 GB" },
    { value: "12gb", label: "12 GB" },
    { value: "16gb", label: "16 GB" },
  ];

  return (
    <section className="p-8 dark:bg-zinc-700">
      <form onSubmit={handleSubmit}>
        {/* ── Product Name ──────────────────────────────────────────────── */}
        <div className="mb-4">
          <label className="block mb-1 font-medium dark:text-white text-sm">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            className={inputClass}
            type="text"
            name="name"
            value={data.name}
            onChange={handleInput}
            placeholder="Enter product name..."
          />
        </div>

        {/* ── Description ───────────────────────────────────────────────── */}
        <div className="mb-4">
          <label className="block mb-1 font-medium dark:text-white text-sm">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            className={inputClass}
            name="description"
            value={data.description}
            onChange={handleInput}
            rows={4}
            placeholder="Enter product description..."
          />
        </div>

        {/* ── Category Dropdowns (3 levels) ─────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-4 border border-dashed border-blue-200 rounded-lg bg-blue-50 dark:bg-zinc-600 dark:border-zinc-500">
          <div className="col-span-3">
            <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wide">
              Category Selection
            </h2>
          </div>

          {/* Level 1 — Root Category */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              className={selectClass}
              value={data.catId}
              onChange={handleCategoryChange}
              disabled={rootCategories.length === 0}
            >
              <option value="">
                {rootCategories.length === 0
                  ? "Loading..."
                  : "— Select Category —"}
              </option>
              {rootCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level 2 — Sub Category */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Sub Category
            </label>
            <select
              className={selectClass}
              value={data.SubcatId}
              onChange={handleSubCategoryChange}
              disabled={subCategories.length === 0}
            >
              <option value="">
                {!data.catId
                  ? "— Select category first —"
                  : subCategories.length === 0
                    ? "No sub-categories"
                    : "— Select Sub Category —"}
              </option>
              {subCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level 3 — Third Category */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Third Level Category
            </label>
            <select
              className={selectClass}
              value={data.ThirdcatId}
              onChange={handleThirdCategoryChange}
              disabled={thirdCategories.length === 0}
            >
              <option value="">
                {!data.SubcatId
                  ? "— Select sub-category first —"
                  : thirdCategories.length === 0
                    ? "No third-level categories"
                    : "— Select Third Category —"}
              </option>
              {thirdCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Show selected category path as breadcrumb */}
          {data.catName && (
            <div className="col-span-3">
              <p className="text-xs text-blue-600 dark:text-blue-300 flex items-center gap-1 flex-wrap">
                <span className="font-semibold">Selected:</span>
                <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-blue-800 dark:text-blue-200">
                  {data.catName}
                </span>
                {data.SubcatName && (
                  <>
                    <span className="text-gray-400">›</span>
                    <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-blue-800 dark:text-blue-200">
                      {data.SubcatName}
                    </span>
                  </>
                )}
                {data.ThirdcatName && (
                  <>
                    <span className="text-gray-400">›</span>
                    <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-blue-800 dark:text-blue-200">
                      {data.ThirdcatName}
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* ── Other product fields ─────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              required
              className={numberInputClass}
              type="number"
              name="price"
              value={data.price}
              onChange={handleInput}
              placeholder="Enter price..."
            />
          </div>

          {/* Old Price */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Old Price
            </label>
            <input
              className={numberInputClass}
              type="number"
              name="oldPrice"
              value={data.oldPrice}
              onChange={handleInput}
              placeholder="Enter old price..."
            />
          </div>

          {/* Is Featured */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Is Featured?
            </label>
            <select
              className={selectClass}
              name="Isfeatured"
              value={data.Isfeatured}
              onChange={handleInput}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              required
              className={numberInputClass}
              type="number"
              name="countInStock"
              value={data.countInStock}
              onChange={handleInput}
              placeholder="Enter stock quantity..."
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Brand
            </label>
            <input
              className={inputClass}
              type="text"
              name="brand"
              value={data.brand}
              onChange={handleInput}
              placeholder="Enter brand..."
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Discount (%) <span className="text-red-500">*</span>
            </label>
            <input
              required
              className={numberInputClass}
              type="number"
              name="discount"
              value={data.discount}
              onChange={handleInput}
              placeholder="e.g. 10"
            />
          </div>

          {/* Weight */}
          <div className="z-30">
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Product Weight
            </label>
            <Select
              isMulti
              options={weightOptions}
              styles={reactSelectStyles}
              placeholder="Select Weights..."
              value={weightOptions.filter((opt) =>
                data.productWeight.includes(opt.value),
              )}
              onChange={(selected) => {
                setData((prev) => ({
                  ...prev,
                  productWeight: selected ? selected.map((s) => s.value) : [],
                }));
              }}
            />
          </div>

          {/* Size */}
          <div className="z-20">
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Product Size
            </label>
            <Select
              isMulti
              options={sizeOptions}
              styles={reactSelectStyles}
              placeholder="Select Sizes..."
              value={sizeOptions.filter((opt) => data.size.includes(opt.value))}
              onChange={(selected) => {
                setData((prev) => ({
                  ...prev,
                  size: selected ? selected.map((s) => s.value) : [],
                }));
              }}
            />
          </div>

          {/* RAM */}
          <div className="z-10">
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Product RAM
            </label>
            <Select
              isMulti
              options={ramOptions}
              styles={reactSelectStyles}
              placeholder="Select RAM..."
              value={ramOptions.filter((opt) =>
                data.productRam.includes(opt.value),
              )}
              onChange={(selected) => {
                setData((prev) => ({
                  ...prev,
                  productRam: selected ? selected.map((s) => s.value) : [],
                }));
              }}
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Rating
            </label>
            <Rating
              name="rating"
              value={Number(data.rating)}
              precision={0.5}
              onChange={(_, newValue) =>
                setData((prev) => ({ ...prev, rating: newValue ?? 0 }))
              }
            />
          </div>
        </div>

        {/* ── Media & Images ─────────────────────────────────────────────── */}
        <div className="w-full mb-5">
          <h1 className="font-semibold mb-4 dark:text-white">
            Media &amp; Images
          </h1>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="image-grid" direction="horizontal">
              {(provided) => (
                <div
                  className="grid grid-cols-7 gap-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {previewImages.map((preview, i) => (
                    <Draggable
                      key={preview.url}
                      draggableId={preview.url}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`relative ${snapshot.isDragging ? "z-50 scale-105 shadow-xl" : ""}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span
                            onClick={() => removePreview(i)}
                            className="absolute w-6 h-6 rounded-full overflow-hidden bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer hover:bg-red-800 transition-colors"
                          >
                            <IoClose className="text-white text-sm" />
                          </span>
                          <div className="relative rounded-md overflow-hidden border border-dashed border-gray-400 h-40 w-full bg-gray-50 cursor-grab active:cursor-grabbing">
                            <LazyLoadImage
                              className="w-full h-full object-cover"
                              alt={`preview-${i}`}
                              effect="blur"
                              src={preview.url}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {/* Upload box */}
                  <div className="h-40">
                    <UploadBox
                      multiple={true}
                      onChange={(e) => handleFileChange(e.target.files)}
                    />
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {previewImages.length > 0 && (
            <p className="text-xs text-gray-400 mt-2">
              {previewImages.length} image(s) selected — they will be uploaded
              when you publish.
            </p>
          )}
        </div>

        {/* ── Submit ─────────────────────────────────────────────────────── */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="!bg-blue-600 !rounded-md !px-4 !py-2 !text-white !flex !items-center !gap-2 disabled:opacity-60!"
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={18} color="inherit" />
              <span>
                {uploading ? "Uploading images…" : "Creating product…"}
              </span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-xl" />
              Publish
            </>
          )}
        </Button>
      </form>
    </section>
  );
};
