import { create } from "zustand";
import { ProductAPI } from "../Utils/api";
import { toast } from "react-hot-toast";

// const navigate = useNavigate();

export const ProductStore = create((set, get) => ({
  loading: false,
  product: [],
  setLoading: (state) => set({ loading: state }),
  setProduct: (state) => set({ product: state }),
  GetProducts: async () => {
    set({ loading: true });
    try {
      const res = await ProductAPI.getAll();
      set({product:res.data.data})
      return res.data.data;
    } catch (error) {
      return error.response?.message;
    } finally {
      set({ loading: false });
    }
  },
}));
