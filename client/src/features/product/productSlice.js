import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//! Get Product details
export const getProducts = createAsyncThunk("products/getProducts", async (payload, { rejectWithValue }) => {
  try {
    // console.log("payload:", payload);

    if (payload.customError) {
      return rejectWithValue(payload.customError);
    }

    const keyword = payload.keyword;
    const page = payload.page || 1;
    const category = payload.category;

    let link = `/api/v1/products?page=` + page;

    // const { data } = await axios.get(`${keyword ? `/api/v1/products?keyword=${keyword}&page=${page}` : `/api/v1/products?page=${page}`}`);

    if (keyword) {
      link += `&keyword=${keyword}`;
    }

    if (category) {
      link += `&category=${category}`;
    }

    const { data } = await axios.get(link);

    return data;
  } catch (error) {
    console.log("GetProductsErr:", error);
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

//! Submit Product review
export const createReview = createAsyncThunk("product/createReview", async (payload, { rejectWithValue }) => {
  // console.log("ReviewPayload", payload);

  try {
    const { data } = await axios.put(`/api/v1/review`, payload);

    return data;
  } catch (error) {
    console.log("error", error);

    return rejectWithValue(error.response?.data.message) || "Submit Product Review Error";
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
    reviewSuccess: false,
    reviewLoading: false,
  },
  //! reducers
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeReviewSuccess: (state) => {
      state.reviewSuccess = false;
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

      state.error = action.payload.message || "No Products Found";
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
      state.error = action.payload.message || "Something went wrong";
    });

    //! Submit Product Review
    builders.addCase(createReview.pending, (state) => {
      state.reviewLoading = true;
      state.error = null;
    });

    builders.addCase(createReview.fulfilled, (state, action) => {
      state.reviewLoading = false;
      state.error = null;
      state.product = action.payload.product;
      state.reviewSuccess = true;
    });

    builders.addCase(createReview.rejected, (state, action) => {
      state.reviewLoading = false;
      state.error = action.payload || "Submit Product Review Error";
    });
  },
});

export const { removeError, removeReviewSuccess } = productSlice.actions;
export default productSlice.reducer;
