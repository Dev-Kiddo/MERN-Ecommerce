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

export const adminCreateProduct = createAsyncThunk("admin/adminCreateProduct", async (payload, { rejectWithValue }) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post("/api/v1/admin/product/create", payload, config);
    console.log("adminCreateProduct:", data);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data) || "Error fetching all products";
  }
});

export const adminUpdateProduct = createAsyncThunk("admin/adminUpdateProduct", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/api/v1/admin/product/${payload.id}`, payload.formData);
    console.log("adminUpdateProduct:", data);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data) || "Error Update product";
  }
});

export const adminDeleteProduct = createAsyncThunk("admin/adminDeleteProduct", async ({ id }, { rejectWithValue }) => {
  try {
    // console.log("heloo");

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    console.log("adminDeleteProduct:", data);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data) || "Error delete product";
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
    product: {},
    deletingProductId: null,
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
      state.success = action.payload.success;
      state.products = action.payload.products;
      state.numOfProducts = action.payload.numOfProducts;
    });
    builders.addCase(getAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Get All Products Failed";
    });

    // Admin create product
    builders.addCase(adminCreateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builders.addCase(adminCreateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.products.push(action.payload.product);
      console.log("New Updated Product List", state.products);
    });
    builders.addCase(adminCreateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Product Creation Failed";
    });

    // Admin Update Product
    builders.addCase(adminUpdateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builders.addCase(adminUpdateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.product = action.payload.product;
      console.log("New Updated Product List", state.product);
    });
    builders.addCase(adminUpdateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Update Product Failed";
    });

    // Admin Delete Product
    builders.addCase(adminDeleteProduct.pending, (state, action) => {
      console.log(action);

      state.deletingProductId = action.meta.arg.id;

      state.loading = true;
      state.error = null;
    });
    builders.addCase(adminDeleteProduct.fulfilled, (state, action) => {
      // console.log(action.meta.arg);
      // console.log(action.payload);
      state.loading = false;
      state.error = null;
      state.deletingProductId = null;
      state.success = action.payload.success;

      const deletedId = action.payload ?? action.meta.arg.id;
      // console.log("deletedId:", deletedId);

      // console.log("state:", state);

      state.products = state.products.filter((product) => product._id !== deletedId);
      // console.log("updatedProducts:", state.products);
    });
    builders.addCase(adminDeleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Product Deletion Failed";
    });
  },
});

export const { removeError, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;
