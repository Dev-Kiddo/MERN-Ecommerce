import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config/api";
axios.defaults.withCredentials = true;

export const createOrder = createAsyncThunk("order/createOrder", async (payload, { rejectWithValue }) => {
  try {
    if (payload.customError) {
      rejectWithValue(payload.customError);
    }

    // console.log("CreateOrderPayload:", payload);

    const { data } = await axios.post(`${API}/new/order`, payload.orderData);
    // console.log("CreaterderData:", data);

    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

export const getAllUserOrders = createAsyncThunk("order/getAllUserOrders", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios(`${API}/orders/user`);
    // console.log("data:", data);

    return data;
  } catch (error) {
    console.log("error:", error);

    return rejectWithValue(error.response?.data.message || "Get all orders failed");
  }
});

// get Order Details
export const getOrderDetails = createAsyncThunk("order/getOrderDetails", async (payload, { rejectWithValue }) => {
  try {
    // console.log(payload);

    const { data } = await axios.post(`${API}/order/${payload.orderId}`);
    // console.log("getOrderDetails:", data);

    return data;
  } catch (error) {
    console.log("error:", error);

    return rejectWithValue(error.response?.data.message || "Get order details failed");
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

    // Get Order Detail
    builders.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.order = action.payload.order;
    });

    builders.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Get order details failed";
    });
  },
});

export const { removeError, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;
