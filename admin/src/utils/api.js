import axios from "axios";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 second timeout
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
  },
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
  },
);

// API methods
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
  UpdateUser: (data, id) => api.put(`/user/:${id}`, data),
};

export const AdderssApi = {
  addAdderss: (address) => api.post("/address/add-address", address),
  getAddress: () => api.get("/address/get-address"),
};
