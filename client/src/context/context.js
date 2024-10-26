import { create } from "zustand";

// Assuming IPlate is defined in your project
export const useAuthStore = create((set) => {
  let initialState = false;
  if (typeof window !== "undefined") {
    initialState = window.localStorage.getItem("isLoggedIn") === "true";
  }

  return {
    isLoggedIn: initialState,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
  };
});

export const useOrderStore = create((set, get) => ({
  order: [],

  // Add quantity to an existing plate or add it if it doesn't exist
  addQuantity: (plat) =>
    set((state) => {
      const existingPlate = state.order.find(
        (item) => item.plat._id === plat._id
      );

      if (existingPlate) {
        return {
          order: state.order.map((item) =>
            item.plat._id === plat._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        order: [...state.order, { plat, quantity: 1 }],
      };
    }),

  // Decrease the quantity of a plate, and remove it if quantity becomes 0
  subQuantity: (platId) =>
    set((state) => ({
      order: state.order
        .map((item) =>
          item.plat._id === platId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Calculate the total amount of the order
  getTotalAmount: () => {
    const state = get(); // Access the state using `get()`
    return state.order.reduce(
      (total, item) => total + item.plat.price * item.quantity,
      0
    );
  },
}));
