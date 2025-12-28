import { create } from "zustand";

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
  isLogin: false,
  user: null,
  cartItems: [],
  cartCount: 0,
  favorites: [],
  compareItems: [],

  // Actions
  // open the dialog and optionally provide a component and props to render
  handleClickOpen: (component = null, props = {}) =>
    set({ open: true, dialogComponent: component, dialogProps: props }),
  // close and clear the dialog component/props
  handleClose: () => set({ open: false, dialogComponent: null, dialogProps: {} }),
  setDarkMode: (status) => set({ darkmode: status }),
  setIsSidebarCollapsed: (status) => set({ isSidebarCollapsed: status }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setLogin: (status) => set({ isLogin: status }),
  setUser: (userData) => set({ user: userData }),
  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
      cartCount: state.cartCount + 1,
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
      cartCount: state.cartCount - 1,
    })),
  addToFavorites: (item) =>
    set((state) => ({
      favorites: [...state.favorites, item],
    })),
  removeFromFavorites: (itemId) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== itemId),
    })),
  addToCompare: (item) =>
    set((state) => ({
      compareItems: [...state.compareItems, item],
    })),
  removeFromCompare: (itemId) =>
    set((state) => ({
      compareItems: state.compareItems.filter((item) => item.id !== itemId),
    })),
  logout: () =>
    set({
      isLogin: false,
      user: null,
      cartItems: [],
      cartCount: 0,
      favorites: [],
      compareItems: [],
    }),

  // Computed values (getters)
  getCartCount: () => get().cartCount,
  getFavoritesCount: () => get().favorites.length,
  getCompareCount: () => get().compareItems.length,
}));
