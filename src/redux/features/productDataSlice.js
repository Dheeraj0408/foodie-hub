import { createSlice } from "@reduxjs/toolkit";
import cardsData from "../../components/cartData";


const initialState = {
  items: cardsData,
  filteredItems: cardsData,
};

const productDataSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilteredItems: (state, action) => {
      const filterValue = action.payload;
      switch (filterValue) {
        case "priceLowToHigh":
          state.filteredItems = state.items.slice().sort((a, b) => a.price - b.price);
          break;
        case "priceHighToLow":
          state.filteredItems = state.items.slice().sort((a, b) => b.price - a.price);
          break;
        case "ratingLowToHigh":
          state.filteredItems = state.items.slice().sort((a, b) => a.rating - b.rating);
          break;
        case "ratingHighToLow":
          state.filteredItems = state.items.slice().sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filteredItems = state.items;
          break;
      }
    },
  },
});

export const { setFilteredItems } = productDataSlice.actions;
export default productDataSlice.reducer;
