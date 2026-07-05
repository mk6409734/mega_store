import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminStore } from "../../Store/Store";
import { ProductApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { IoArrowBack } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { UploadBox } from "../../Components/UploadBox/UploadBox";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetCategory, UploadProductImages, uploading } = adminStore();

  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Category state
  const [rootCategories, setRootCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [thirdCategories, setThirdCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // flat list for reverse lookup

  // Form state
  const [data, setData] = useState(null);

  // Images
  const [productImages, setProductImages] = useState([]); // { id, isNew, url, file? }

  // ── Load product + categories on mount ─────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        setFetchLoading(true);

        // Fetch categories and product in parallel
        const [catRes, prodRes] = await Promise.all([
          GetCategory(),
          ProductApi.GetProduct(id),
        ]);

        // Build category tree
        if (catRes?.success && Array.isArray(catRes.data)) {
          setRootCategories(catRes.data);
          // Flatten all levels for reverse lookup
          const flat = [];
          catRes.data.forEach((l1) => {
            flat.push(l1);
            (l1.children || []).forEach((l2) => {
              flat.push(l2);
              (l2.children || []).forEach((l3) => flat.push(l3));
            });
          });
          setAllCategories(flat);
        }

        // Populate form with existing product data
        if (prodRes.data?.product) {
          const p = prodRes.data.product;
          setData({
            name: p.name || "",
            description: p.description || "",
            catName: p.catName || "",
            catId: p.catId || "",
            SubcatName: p.SubcatName || "",
            SubcatId: p.SubcatId || "",
            ThirdcatName: p.ThirdcatName || "",
            ThirdcatId: p.ThirdcatId || "",
            price: p.price ?? "",
            oldPrice: p.oldPrice ?? "",
            Isfeatured: p.Isfeatured ? "true" : "false",
            countInStock: p.countInStock ?? "",
            brand: p.brand || "",
            discount: p.discount ?? "",
            productWeight: p.productWeight || [],
            size: p.size || [],
            productRam: p.productRam || [],
            rating: p.rating || 0,
          });
          setProductImages(
            (p.images || []).map((url, i) => ({
              id: `existing-${url}-${i}`,
              isNew: false,
              url,
            })),
          );
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load product");
      } finally {
        setFetchLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Re-populate sub/third dropdowns when catId/SubcatId is loaded
  useEffect(() => {
    if (!data?.catId || rootCategories.length === 0) return;
    const root = rootCategories.find((c) => c._id === data.catId);
    if (root) {
      setSubCategories(root.children || []);
      if (data.SubcatId) {
        const sub = (root.children || []).find((c) => c._id === data.SubcatId);
        if (sub) setThirdCategories(sub.children || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootCategories, data?.catId, data?.SubcatId]);

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = rootCategories.find((c) => c._id === selectedId);
    setData((prev) => ({
      ...prev,
      catId: selectedId,
      catName: selected?.name || "",
      SubcatId: "",
      SubcatName: "",
      ThirdcatId: "",
      ThirdcatName: "",
    }));
    setSubCategories(selected?.children || []);
    setThirdCategories([]);
  };

  const handleSubCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = subCategories.find((c) => c._id === selectedId);
    setData((prev) => ({
      ...prev,
      SubcatId: selectedId,
      SubcatName: selected?.name || "",
      ThirdcatId: "",
      ThirdcatName: "",
    }));
    setThirdCategories(selected?.children || []);
  };

  const handleThirdCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = thirdCategories.find((c) => c._id === selectedId);
    setData((prev) => ({
      ...prev,
      ThirdcatId: selectedId,
      ThirdcatName: selected?.name || "",
    }));
  };

  // Remove an image (existing or new)
  const removeImage = (idx) => {
    setProductImages((prev) => {
      const updated = [...prev];
      if (updated[idx].isNew) {
        URL.revokeObjectURL(updated[idx].url);
      }
      updated.splice(idx, 1);
      return updated;
    });
  };

  // Add new local previews
  const handleFileChange = (files) => {
    if (!files || files.length === 0) return;
    const previews = Array.from(files).map((file, i) => ({
      id: `new-${Date.now()}-${file.name}-${i}`,
      isNew: true,
      file,
      url: URL.createObjectURL(file),
    }));
    setProductImages((prev) => [...prev, ...previews]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(productImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProductImages(items);
  };

  // ── Submit ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Extract the new images out of the unified list
      const newImages = productImages.filter((img) => img.isNew);
      let finalImageUrls = [];

      // Upload any new images first
      if (newImages.length > 0) {
        const files = newImages.map((p) => p.file);
        const uploadRes = await UploadProductImages(files);
        if (uploadRes?.success && uploadRes.image) {
          let newUploadIndex = 0;
          // Map over original array and replace local URLs with Cloudinary ones
          finalImageUrls = productImages.map((img) => {
            if (img.isNew) {
              return uploadRes.image[newUploadIndex++];
            }
            return img.url; // already a Cloudinary url for existing ones
          });
          newImages.forEach((p) => URL.revokeObjectURL(p.url));
        } else {
          setSaving(false);
          return;
        }
      } else {
        finalImageUrls = productImages.map((img) => img.url);
      }

      const payload = {
        ...data,
        images: finalImageUrls,
        price: Number(data.price),
        oldPrice: Number(data.oldPrice) || 0,
        countInStock: Number(data.countInStock),
        discount: Number(data.discount) || 0,
        Isfeatured: data.Isfeatured === "true",
        rating: Number(data.rating) || 0,
      };

      const res = await ProductApi.UpdateProduct(id, payload);
      if (res.data?.success) {
        toast.success(res.data.message || "Product updated successfully!");
        navigate(`/product/${id}`);
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };
  console.log("Product", productImages)

  // ── Shared class names ─────────────────────────────────────────────────
  const inputCls =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
  const selectCls = inputCls;
  const numCls =
    inputCls +
    " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  // ── Loading state ──────────────────────────────────────────────────────
  if (fetchLoading || !data) {
    return (
      <div className="flex justify-center items-center h-full py-40">
        <CircularProgress />
      </div>
    );
  }

  const isSubmitting = saving || uploading;

  return (
    <div className="bg-gray-100 dark:bg-zinc-700 min-h-full px-6 pt-5 pb-25 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outlined"
          size="small"
          startIcon={<IoArrowBack />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <h1 className="text-xl font-semibold dark:text-white">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm mb-5">
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              className={inputCls}
              type="text"
              name="name"
              value={data.name}
              onChange={handleInput}
              placeholder="Product name..."
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium dark:text-white">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              className={inputCls}
              name="description"
              value={data.description}
              onChange={handleInput}
              rows={4}
              placeholder="Product description..."
            />
          </div>

          {/* Category — 3 levels */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-4 border border-dashed border-blue-200 rounded-lg bg-blue-50 dark:bg-zinc-700 dark:border-zinc-500">
            <div className="col-span-3">
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Category
              </h3>
            </div>

            {/* L1 */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Category
              </label>
              <select
                className={selectCls}
                value={data.catId}
                onChange={handleCategoryChange}
              >
                <option value="">— Select Category —</option>
                {rootCategories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* L2 */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Sub Category
              </label>
              <select
                className={selectCls}
                value={data.SubcatId}
                onChange={handleSubCategoryChange}
                disabled={subCategories.length === 0}
              >
                <option value="">
                  {subCategories.length === 0
                    ? "No sub-categories"
                    : "— Select Sub Category —"}
                </option>
                {subCategories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* L3 */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Third Category
              </label>
              <select
                className={selectCls}
                value={data.ThirdcatId}
                onChange={handleThirdCategoryChange}
                disabled={thirdCategories.length === 0}
              >
                <option value="">
                  {thirdCategories.length === 0
                    ? "No third-level categories"
                    : "— Select Third Category —"}
                </option>
                {thirdCategories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                required
                className={numCls}
                type="number"
                name="price"
                value={data.price}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Old Price
              </label>
              <input
                className={numCls}
                type="number"
                name="oldPrice"
                value={data.oldPrice}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                required
                className={numCls}
                type="number"
                name="countInStock"
                value={data.countInStock}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Discount (%) <span className="text-red-500">*</span>
              </label>
              <input
                required
                className={numCls}
                type="number"
                name="discount"
                value={data.discount}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Brand
              </label>
              <input
                className={inputCls}
                type="text"
                name="brand"
                value={data.brand}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Is Featured?
              </label>
              <select
                className={selectCls}
                name="Isfeatured"
                value={data.Isfeatured}
                onChange={handleInput}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Weight
              </label>
              <select
                className={selectCls}
                value={data.productWeight?.[0] || ""}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    productWeight: e.target.value ? [e.target.value] : [],
                  }))
                }
              >
                <option value="">— Select —</option>
                <option value="2kg">2 KG</option>
                <option value="4kg">4 KG</option>
                <option value="5kg">5 KG</option>
                <option value="10kg">10 KG</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Size
              </label>
              <select
                className={selectCls}
                value={data.size?.[0] || ""}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    size: e.target.value ? [e.target.value] : [],
                  }))
                }
              >
                <option value="">— Select —</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                RAM
              </label>
              <select
                className={selectCls}
                value={data.productRam?.[0] || ""}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    productRam: e.target.value ? [e.target.value] : [],
                  }))
                }
              >
                <option value="">— Select —</option>
                <option value="4gb">4 GB</option>
                <option value="6gb">6 GB</option>
                <option value="8gb">8 GB</option>
                <option value="12gb">12 GB</option>
                <option value="16gb">16 GB</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Rating
              </label>
              <Rating
                value={Number(data.rating)}
                precision={0.5}
                onChange={(_, v) => setData((p) => ({ ...p, rating: v ?? 0 }))}
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="font-semibold mb-3 dark:text-white">Images</h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="image-grid" direction="horizontal">
                {(provided) => (
                  <div
                    className="grid grid-cols-7 gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {productImages.map((img, i) => (
                      <Draggable key={img.id} draggableId={img.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            className={`relative ${snapshot.isDragging ? "z-50 scale-105 shadow-xl" : ""}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span
                              onClick={() => removeImage(i)}
                              className={`absolute w-6 h-6 rounded-full -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer transition-colors ${img.isNew ? "bg-orange-500 hover:bg-orange-600" : "bg-red-700 hover:bg-red-800"}`}
                            >
                              <IoClose className="text-white text-sm" />
                            </span>
                            <div
                              className={`rounded-lg overflow-hidden border h-40 w-full cursor-grab active:cursor-grabbing ${img.isNew ? "border-dashed border-orange-400 bg-orange-50" : "border-gray-200 bg-gray-50"}`}
                            >
                              {img.isNew ? (
                                <LazyLoadImage
                                  className="w-full h-full object-cover"
                                  alt={`img-${i}`}
                                  effect="blur"
                                  src={img.url}
                                />
                              ) : (
                                <img
                                  src={img.url}
                                  alt={`img-${i}`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {/* Upload box */}
                    <div className="h-40">
                      <UploadBox
                        multiple
                        onChange={(e) => handleFileChange(e.target.files)}
                      />
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {productImages.some((img) => img.isNew) && (
              <p className="text-xs text-orange-500 mt-2">
                {productImages.filter((img) => img.isNew).length} new image(s)
                will be uploaded on save.
              </p>
            )}
          </div>
        </div>

        {/* Save button */}
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <FaCloudUploadAlt />
            )
          }
        >
          {isSubmitting
            ? uploading
              ? "Uploading images…"
              : "Saving…"
            : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};
