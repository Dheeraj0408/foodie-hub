import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  searchQuery: '',
};

// Cart Slice
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    // Add to Cart 
    addToCart: (state, action) => {
      const existingItem = state.carts.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qnty++;
      } else {
        state.carts.push({ ...action.payload, qnty: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.carts[itemIndex].qnty++;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1 && state.carts[itemIndex].qnty > 1) {
        state.carts[itemIndex].qnty--;
      }
    },
    // Remove from Cart
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    // Clear Cart
    emptyCartItem: (state, action) => {
      state.carts = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCartItem, setSearchQuery } = cartSlice.actions;
export default cartSlice.reducer;
