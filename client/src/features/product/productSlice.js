import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//! Get Product details
export const getProducts = createAsyncThunk("products/getProducts", async (payload, { rejectWithValue }) => {
  try {
    // console.log(payload);

    if (payload.customError) {
      return rejectWithValue(payload.customError);
    }

    const keyword = payload.keyword;
    const page = payload.page || 1;

    const { data } = await axios.get(`${keyword ? `/api/v1/products?keyword=${keyword}&page=${page}` : `/api/v1/products?page=${page}`}`);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

//! Get Single Product details
export const getProductDetails = createAsyncThunk("product/getProductDetails", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    return data;
  } catch (error) {
    console.log("error", error);

    return rejectWithValue(error.response?.data.message) || "An error occured";
  }
});

//! Create Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    numOfProduct: 0,
    isLoading: false,
    error: null,
    product: null,
    resultsPerpage: 0,
    totalPages: 0,
  },
  //! reducers
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  //! Extra reducers
  extraReducers: (builders) => {
    builders.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builders.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.products = action.payload.products;
      state.numOfProduct = action.payload.numofProducts;

      state.resultsPerpage = action.payload?.resultsPerPage;
      state.totalPages = action.payload?.totalPages;
      state.resultsPerpage = action.payload?.resultsPerpage;
    });

    builders.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);

      state.error = action.payload || "Something went wrong";
      state.products = [];
    });

    //! Get Product Details
    builders.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builders.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.product = action.payload.product;
    });

    builders.addCase(getProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { removeError } = productSlice.actions;
export default productSlice.reducer;
