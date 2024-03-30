import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default fetchDataSlice.reducer;
