import { create } from "zustand";
import { authAPI, AddressApi } from "../Utils/api";
import { toast } from "react-hot-toast";

// const navigate = useNavigate();

export const FrontStore = create((set, get) => ({
  loading: false,
  islogin: !!localStorage.getItem("accesstoken"),
  message: "",
  setLoading: (state) => set({ loading: state }),
  setMessage: (msg) => set({ message: msg }),
  setIsLogin: (state) => set({ islogin: state }),

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
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
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
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },

  // Address

  AddAddress: async (address) => {
    set({ loading: true });
    try {
      const res = await AddressApi.addAddress(address);
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
      const res = await AddressApi.getAddress();
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data.message;
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },
}));
