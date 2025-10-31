import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/v1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || "An error occured");
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    numOfProduct: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builders.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.product = action.payload.products;
      state.numOfProduct = action.payload.numofProducts;
    });

    builders.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);

      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { removeError } = productSlice.actions;
export default productSlice.reducer;
