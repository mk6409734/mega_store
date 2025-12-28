import { create } from "zustand";
import { authAPI } from "../Utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

export const FrontStore = create((set, get) => ({
  loading: false,
  message: "",
  setLoading: (state) => set({ loading: state }),
  setMessage: (msg) => set({ message: msg }),

  // Authentication

  Register: async (userdata) => {
    set({ loading: true });
    try {
      const res = await authAPI.register(userdata);
      if (res.data.success) {
        toast.success(res.data.message || "Register successfully!");
        // Store token and user info as needed
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          // In registration, user data might be returned too
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
        }
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
          localStorage.setItem("token", res.data.data.accesstoken);
          if (res.data.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
          }
        }
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
}));
