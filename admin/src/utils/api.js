import axios from "axios";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000, // 60 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("avatar");
      localStorage.removeItem("mobile");
      localStorage.removeItem("userEmail");

      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error - server might be down");
    }

    return Promise.reject(error);
  }
);

// Users
export const authAPI = {
  register: (userData) => api.post("/user/register", userData),
  verifyOtp: (userData) => api.post("/user/verifyemail", userData),
  ReGenOtp: (userData) => api.post("/user/re-genrateotp", userData),
  login: (credentials) => api.post("/user/login", credentials),
  googleLogin: (idToken) => api.post("/user/google-login", { idToken }),
  forgotPassword: (email) => api.post("/user/forgotpassword", { email }),
  resetPassword: (data) => api.post("/user/resetpassword", data),
  verifyOtpforgot: (data) => api.post("/user/verifyforgotpassword", data),
  uploadImage: (data) =>
    api.put("/user/user-avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  removeAvatar: (url) =>
    api.delete("/user/delete-avatar", { params: { img: url } }),
  UpdateUser: (data) => api.put("/user/update-user", data),
  GetUser: () => api.get("/user/user-details"),
  GetAllUsers: () => api.get("/user/user-all-details"),
  deleteUser: (id) => api.delete(`/user/delete-user/${id}`),
  adminUpdateUser: (id, data) => api.put(`/user/admin-update-user/${id}`, data),
};

// Address
export const AdderssApi = {
  addAdderss: (address) => api.post("/address/add-address", address),
  getAddress: () => api.get("/address/get-address"),
};

// Category

export const CateoryApi = {
  UploadImage: (data) =>
    api.post("/category/uploadimages", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  DeleteImage: (imageUrl) =>
    api.delete("/category/deleteimage", { params: { img: imageUrl } }),
  CreateCategory: (data) => api.post("/category/createcategory", data),
  UpdateCategory: (id, data) => api.put(`/category/${id}`, data),
  GetCategory: () => api.get("/category/getcategory"),
  GetCategoryById: (id) => api.get(`/category/${id}`),
  deleteCategory: (categoryId) => api.delete(`/category/${categoryId}`),
};

// Products
export const ProductApi = {
  UploadImages: (data) =>
    api.post("/product/uploadimages", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  RemoveImage: (imageUrl) =>
    api.delete("/product/deleteimage", { params: { img: imageUrl } }),
  CreateProduct: (data) => api.post("/product/create-product", data),
  GetAllProducts: (page = 1, perpage = 10) =>
    api.get("/product/getallproducts", { params: { page, perpage } }),
  DeleteProduct: (id) => api.delete(`/product/${id}`),
  UpdateProduct: (id, data) => api.put(`/product/updateproduct/${id}`, data),
  GetProduct: (id) => api.get(`/product/${id}`),
};


// HomeSlider
export const HomeSliderApi = {
  getAll: () => api.get("/slider/all"),
  add: (data) =>
    api.post("/slider/addslider", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/slider/delete/${id}`),
  setActive: (id) => api.put(`/slider/set-active/${id}`),
};
