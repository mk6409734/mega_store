import { create } from "zustand";
import toast from "react-hot-toast";
import { AdderssApi, authAPI, CateoryApi, ProductApi } from "../utils/api";

export const adminStore = create((set, get) => ({
  // State
  // `open` must be a boolean. Previously it was the string "false" which is truthy
  // causing dialogs to appear open on page load. Use boolean false here.
  open: false, // open fulldialog
  // which component to render inside FullDialog (function or element)
  dialogComponent: null,
  // optional props for the dialog component
  dialogProps: {},
  darkmode: "light",
  isSidebarCollapsed: false,

  // Actions
  // open the dialog and optionally provide a component and props to render
  handleClickOpen: (component = null, props = {}) => {
    try {
      const active = typeof document !== "undefined" && document.activeElement;
      if (active && typeof active.blur === "function") active.blur();
    } catch (e) {
      // ignore errors from environments without document
    }
    set({ open: true, dialogComponent: component, dialogProps: props });
  },
  // close and clear the dialog component/props
  handleClose: () =>
    set({ open: false, dialogComponent: null, dialogProps: {} }),
  setDarkMode: (status) => set({ darkmode: status }),
  setIsSidebarCollapsed: (status) => set({ isSidebarCollapsed: status }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  loading: false,
  islogin: !!localStorage.getItem("accesstoken"),
  message: "",
  uploading: false,
  categories: [],
  setLoading: (state) => set({ loading: state }),
  setMessage: (msg) => set({ message: msg }),
  setIsLogin: (state) => set({ islogin: state }),
  setUploading: (state) => set({ uploading: state }),
  setCategories: (state) => set({ categories: state }),

  // Authentication

  Register: async (userdata) => {
    set({ loading: true });
    try {
      const res = await authAPI.register(userdata);
      if (res.data.success) {
        toast.success(res.data.message || "Register successfully!");

        return res.data;
      } else {
        // toast.error(res.data.message || "Registration failed");
        set({ message: res.data.message });
        return res.data;
      }
    } catch (err) {
      const errorData = err.response?.data;
      const errorMsg = errorData?.message || "Signup failed";
      // toast.error(errorMsg);
      set({ message: errorMsg });
      return errorData || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  GoogleLogin: async (idToken) => {
    set({ loading: true });
    try {
      const res = await authAPI.googleLogin(idToken);
      if (res.data.success) {
        toast.success(res.data.message || "Logged in with Google!");
        if (res.data.data.accesstoken) {
          localStorage.setItem("accesstoken", res.data.data.accesstoken);
          if (res.data.data.user) {
            localStorage.setItem(
              "name",
              JSON.stringify(res.data.data.user.name),
            );
            localStorage.setItem(
              "email",
              JSON.stringify(res.data.data.user.email),
            );
            localStorage.setItem(
              "avatar",
              JSON.stringify(res.data.data.user.avatar),
            );
          }
        }
        set({ islogin: true });
        return res.data;
      } else {
        set({ message: res.data.message });
        return res.data;
      }
    } catch (err) {
      const errorData = err.response?.data;
      const errorMsg = errorData?.message || "Google login failed";
      toast.error(errorMsg);
      set({ message: errorMsg });
      return errorData || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  VerifyOtp: async (userdata) => {
    set({ loading: true });
    try {
      const res = await authAPI.verifyOtp(userdata);
      if (res.data.success) {
        toast.success(res.data.message || "OTP verifyed successfully!");
        // navigate("/")
      }
      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data.message || "OTP verification failed!";
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  ReGenOtp: async (userdata) => {
    try {
      const res = await authAPI.ReGenOtp(userdata);
      if (res.data.success) {
        toast.success(res.data.message || "OTP Regenrated successfully!");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data.message || "OTP re-genration failed!";
      toast.error(errorMsg);
    }
  },

  Login: async (credential) => {
    set({ loading: true });
    try {
      const res = await authAPI.login(credential);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message || "Login Successfully!");
        localStorage.setItem("accesstoken", res.data?.data?.accesstoken);
        localStorage.setItem("refreshtoken", res.data?.data?.refreshtoken);
        if (res.data.user) {
          localStorage.setItem("name", JSON.stringify(res.data.user.name));
          localStorage.setItem("email", JSON.stringify(res.data.user.email));
          localStorage.setItem("avatar", JSON.stringify(res.data.user.avatar));
          localStorage.setItem("mobile", JSON.stringify(res.data.user.mobile));
        }
        set({ islogin: true });
        return res.data;
      } else {
        // toast.error(res.data.message || "Registration failed");
        set({ message: res.data.message });
        return res.data;
      }
    } catch (error) {
      const errorData = error.response?.data;
      const errorMsg = error.response?.data.message;
      // toast.error(errorMsg);
      set({ message: errorMsg });
      return errorData || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  Logout: () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("mobile");
    set({ islogin: false });
    toast.success("Logged out successfully!");
  },

  ForgotPassword: async (email) => {
    set({ loading: true });
    try {
      const res = await authAPI.forgotPassword(email);
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  VerifyForgotPassword: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.verifyOtpforgot(data);
      if (res.data.success) {
        toast.success(res.data.message || "OTP Verifiyed!");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  ResetPassword: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.resetPassword(data);
      if (res.data.success) {
        toast.success(res.data.message || "Password reset successfully!");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message || "Password reset failed";
      toast.error(errorMsg);
      return error.response?.data || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  UpdateUser: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.UpdateUser(data);
      if (res.data.success) {
        toast.success(res.data.message || "User details upload successfully!");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message || "Update failed";
      toast.error(errorMsg);
      return error.response?.data || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },
  GetUser: async () => {
    set({ loading: true });
    try {
      const res = await authAPI.GetUser();
      if (res.data.success) {
        toast.success(res.data.message || "User Fetched successfully!");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message || "Failed to fetch users";
      toast.error(errorMsg);
      return error.response?.data || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },
  GetAllUsers: async () => {
    set({ loading: true });
    try {
      const res = await authAPI.GetAllUsers();
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message || "Failed to fetch users";
      toast.error(errorMsg);
      return error.response?.data || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  DeleteUser: async (id) => {
    set({ loading: true });
    try {
      const res = await authAPI.deleteUser(id);
      if (res.data.success) {
        toast.success(res.data.message || "User deleted successfully");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message || "Failed to delete user";
      toast.error(errorMsg);
      return error.response?.data || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  AdminUpdateUser: async (id, data) => {
    set({ loading: true });
    try {
      const res = await authAPI.adminUpdateUser(id, data);
      if (res.data.success) {
        toast.success(res.data.message || "User updated successfully");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message || "Failed to update user";
      toast.error(errorMsg);
      return error.response?.data || { success: false, message: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  // Address

  AddAddess: async (address) => {
    set({ loading: true });
    try {
      const res = await AdderssApi.addAdderss(address);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  GetAddress: async () => {
    set({ loading: true });
    try {
      const res = await AdderssApi.getAddress();
      return res.data;
    } catch {
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  // Cateory
  UploadImage: async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    for (const file of fileList) {
      if (!validTypes.includes(file.type.toLowerCase())) {
        toast.error("Please select a valid jpg, png, or webp image file.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
    }

    try {
      set({ uploading: true });
      const formData = new FormData();
      for (const file of fileList) {
        formData.append("images", file);
      }

      const res = await CateoryApi.UploadImage(formData);

      if (res.data.success) {
        toast.success(res.data.message || "Image Uploaded Successfully");
        const newImage = res.data.image;
        localStorage.setItem("image", JSON.stringify(newImage));
      } else {
        toast.error(res.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during upload",
      );
    } finally {
      set({ uploading: false });
      e.target.value = "";
    }
  },

  CreateCategory: async (data) => {
    set({ loading: true });
    try {
      const res = await CateoryApi.CreateCategory(data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  DeleteImage: async (image) => {
    try {
      set({ uploading: true });
      await CateoryApi.DeleteImage(image);
      toast.success("Image removed successfully");
      localStorage.removeItem("image");
    } catch (err) {
      console.error("Remove Image failed:", err);
    } finally {
      set({ uploading: false });
    }
  },
  GetCategory: async () => {
    try {
      set({ loading: true });
      const res = await CateoryApi.GetCategory();
      return res.data;
    } catch (err) {
      console.error("failed to fetch Category:", err);
    } finally {
      set({ loading: false });
    }
  },
  GetCategoryById: async (id) => {
    try {
      set({ loading: true });
      const res = await CateoryApi.GetCategoryById(id);
      return res.data;
    } catch (err) {
      console.error("failed to fetch Category:", err);
    } finally {
      set({ loading: false });
    }
  },

  DeleteCategory: async (categoryId) => {
    try {
      const res = await CateoryApi.deleteCategory(categoryId);
      if (res.data.success) {
        toast.success("Category deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete category");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error deleting category";
      toast.error(errorMsg);
      console.error("Delete error:", error);
    }
  },

  // ─── Products ────────────────────────────────────────────────────────────────
  products: [],
  productTotalPages: 1,
  productPage: 1,
  setProducts: (products) => set({ products }),

  GetAllProducts: async (page = 1, perpage = 10) => {
    set({ loading: true });
    try {
      const res = await ProductApi.GetAllProducts(page, perpage);
      if (res.data.success) {
        set({
          products: res.data.data,
          productTotalPages: res.data.totalPages,
          productPage: res.data.page,
        });
      }
      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch products";
      toast.error(errorMsg);
      return error.response?.data || { success: false };
    } finally {
      set({ loading: false });
    }
  },

  UploadProductImages: async (files) => {
    set({ uploading: true });
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("images", file);
      }
      const res = await ProductApi.UploadImages(formData);
      if (res.data.success) {
        toast.success(res.data.message || "Images uploaded successfully");
      } else {
        toast.error(res.data.message || "Image upload failed");
      }
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Image upload failed";
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      set({ uploading: false });
    }
  },

  CreateProduct: async (data) => {
    set({ loading: true });
    try {
      const res = await ProductApi.CreateProduct(data);
      if (res.data.success) {
        toast.success(res.data.message || "Product created successfully!");
        // refresh the list
        get().GetAllProducts();
      } else {
        toast.error(res.data.message || "Failed to create product");
      }
      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to create product";
      toast.error(errorMsg);
      return error.response?.data || { success: false };
    } finally {
      set({ loading: false });
    }
  },

  DeleteProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await ProductApi.DeleteProduct(id);
      if (res.data.success) {
        toast.success(res.data.message || "Product deleted successfully");
        // remove from local state
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        }));
      } else {
        toast.error(res.data.message || "Failed to delete product");
      }
      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete product";
      toast.error(errorMsg);
      return error.response?.data || { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));
