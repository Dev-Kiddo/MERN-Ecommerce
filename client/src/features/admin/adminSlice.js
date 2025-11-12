import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminProducts = createAsyncThunk("admin/getAdminProducts", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios("/api/v1/admin/products");
    // console.log("adminGetProductsData:", data);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data) || "Error fetching all products";
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    numOfProducts: 0,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    removeError(state) {
      state.error = null;
    },
    removeSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builders.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.products = action.payload.products;
      state.numOfProducts = action.payload.numOfProducts;
    });
    builders.addCase(getAdminProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload.message || "Admin Get All Products Failed";
    });
  },
});

export const { removeError, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;
