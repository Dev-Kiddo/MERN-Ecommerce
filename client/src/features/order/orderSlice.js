import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("order/createOrder", async (payload, { rejectWithValue }) => {
  try {
    if (payload.customError) {
      rejectWithValue(payload.customError);
    }

    // console.log("CreateOrderPayload:", payload);

    const { data } = await axios.post("api/v1/new/order", payload.orderData);
    // console.log("CreaterderData:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

export const getAllUserOrders = createAsyncThunk("order/getAllUserOrders", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios("api/v1/orders/user");
    // console.log("data:", data);

    return data;
  } catch (error) {
    console.log("error:", error);

    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    orders: [],
    order: {},
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
  extraReducers(builders) {
    builders.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.order = action.payload.order;
    });
    builders.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Create Order Failed";
    });

    // Get All Orders
    builders.addCase(getAllUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(getAllUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.orders = action.payload.orders;
    });

    builders.addCase(getAllUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Get all orders failed";
    });
  },
});

export const { removeError, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;
