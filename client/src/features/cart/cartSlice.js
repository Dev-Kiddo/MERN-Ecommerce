import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk("cart/addItemsToCart", async (payload, { rejectWithValue }) => {
  try {
    if (payload.customError) {
      return rejectWithValue(payload.customError);
    }

    // console.log("Add items to cart payload:", payload);

    const { data } = await axios(`/api/v1/product/${payload.productId}`);

    return {
      productId: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity: payload.quantity,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data.message || "An error occured");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    loading: false,
    error: null,
    success: false,
    message: null,
    shippinginfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  },
  reducers: {
    removeCartError(state) {
      state.error = null;
    },
    removeCartMessage(state) {
      state.message = null;
    },
    removeCartSuccess(state) {
      state.succuess = false;
    },
    removeItemFromCart(state, action) {
      const updatedCart = (state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload));

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    },
    saveShippingInfo(state, action) {
      state.shippinginfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippinginfo));
    },
    clearCartItems(state) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingInfo");
    },
  },
  extraReducers: (builders) => {
    builders.addCase(addItemsToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(addItemsToCart.fulfilled, (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((product) => product.productId === item.productId);
      // console.log("existingItem:", existingItem);

      if (existingItem) {
        existingItem.quantity = item.quantity;
        state.message = `Cart updated successfully`;
      } else {
        state.cartItems.push(item);
        state.message = `${item.name} is added to cart successfully`;
      }

      state.loading = false;
      state.error = null;
      state.success = true;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });

    builders.addCase(addItemsToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to perform this task";
    });
  },
});

export const { removeCartMessage, removeCartError, removeCartSuccess, removeItemFromCart, saveShippingInfo, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
