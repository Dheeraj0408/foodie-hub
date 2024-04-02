import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  filteredData: [], // Add filteredData to store filtered results
  isError: null,
};

export const fetchProducts = createAsyncThunk(
  "fetchData/fetchProducts",
  async () => {
    const response = await fetch("https://food-app-backend-ko1k.onrender.com/items");
    return response.json();
  }
);

export const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      const filterValue = action.payload;
      switch (filterValue) {
        case "priceLowToHigh":
          state.filteredData = state.data.slice().sort((a, b) => a.price - b.price);
          break;
        case "priceHighToLow":
          state.filteredData = state.data.slice().sort((a, b) => b.price - a.price);
          break;
        case "ratingLowToHigh":
          state.filteredData = state.data.slice().sort((a, b) => a.rating - b.rating);
          break;
        case "ratingHighToLow":
          state.filteredData = state.data.slice().sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filteredData = state.data;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload; // Initialize filteredData with fetched data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const { setFilteredData } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
