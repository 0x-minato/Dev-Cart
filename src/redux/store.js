import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/CartSlice.js";
import productCardReducer from "./cart/CartSlice.js";
import productTotalReducer from "./cart/CartSlice.js";
import productDelete from "./cart/CartSlice.js";
import cartTotalReducer from "./cart/CartSlice.js";
import emptyCartReducer from "./cart/CartSlice.js";
import checkoutReducer from "./cart/CartSlice.js";
import loadingReducer from "./loading/loadingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    cart: cartReducer,
    productCardReducer,
    productTotalReducer,
    productDelete,
    cartTotalReducer,
    emptyCartReducer,
    checkoutReducer,
  },
});
