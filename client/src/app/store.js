import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  middleware: (getDefault) =>
    getDefault({
      thunk: {
        extraArgument: {},
      },
      serializableCheck: false,
    }),
  devTools: {
    trace: true,
    traceLimit: 25,
  },
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});
