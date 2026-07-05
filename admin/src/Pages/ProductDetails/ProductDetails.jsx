import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { adminStore } from "../../Store/Store";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";
import { ProductApi } from "../../utils/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { DeleteProduct } = adminStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await ProductApi.GetProduct(id);
        if (res.data?.product) setProduct(res.data.product);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await DeleteProduct(id);
    setDeleting(false);
    setConfirmOpen(false);
    if (res?.success) navigate("/products");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-40">
        <CircularProgress />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Button variant="contained" component={Link} to="/products">
          Back to Products
        </Button>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;

  return (
    <div className="bg-gray-100 dark:bg-zinc-700 min-h-full px-6 pt-10 pb-25 overflow-y-auto">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            size="small"
            startIcon={<IoArrowBack />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <h1 className="text-xl font-semibold dark:text-white">
            Product Details
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdOutlineModeEdit />}
            component={Link}
            to={`/product/edit/${id}`}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<LuTrash2 />}
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — Images */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm">
          {/* Main image */}
          <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-700 mb-4 aspect-square flex items-center justify-center">
            {product.images?.length > 0 ? (
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400 text-sm">No images</span>
            )}
          </div>
          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImg === i
                      ? "border-blue-500"
                      : "border-gray-200 dark:border-zinc-600"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          {/* Name & Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-snug">
              {product.name}
            </h2>
            {product.brand && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Brand:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {product.brand}
                </span>
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating
              value={product.rating || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="text-sm text-gray-500">
              ({product.rating ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-blue-600">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-lg line-through text-gray-400">
                ₹{product.oldPrice}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Stock badge */}
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.countInStock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.countInStock > 0
                ? `✓ In Stock (${product.countInStock} units)`
                : "✗ Out of Stock"}
            </span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Category", value: product.catName || "—" },
              { label: "Sub Category", value: product.SubcatName || "—" },
              { label: "Third Category", value: product.ThirdcatName || "—" },
              { label: "Featured", value: product.Isfeatured ? "Yes" : "No" },
              {
                label: "RAM",
                value: product.productRam?.join(", ") || "—",
              },
              { label: "Size", value: product.size?.join(", ") || "—" },
              {
                label: "Weight",
                value: product.productWeight?.join(", ") || "—",
              },
              {
                label: "Discount",
                value: product.discount ? `${product.discount}%` : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-50 dark:bg-zinc-700 rounded-lg px-3 py-2"
              >
                <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                <p className="font-medium text-gray-700 dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                Description
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Confirm Delete ───────────────────────────────────────────────── */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{product.name}</strong>?
            This also removes its images from Cloudinary and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
