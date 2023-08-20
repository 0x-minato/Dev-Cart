import { createSlice } from "@reduxjs/toolkit";

const cart =
  localStorage.getItem("cartItems") != null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const checkout =
  localStorage.getItem("checkoutItems") != null
    ? JSON.parse(localStorage.getItem("checkoutItems"))
    : [];

const initialState = {
  cartArray: cart,
  checkoutArray: checkout,
  totalPrice: 0,
  check: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReducer: (state, action) => {
      state.check = action.payload.productCheck;
      state.cartArray.map((product) => {
        if (product.productId === action.payload.productId) {
          product.productTotal += action.payload.productTotal;
          product.productRepeat += action.payload.productRepeat;
          state.check = !action.payload.productCheck;
        }
        return true;
      });
      if (state.check === false) {
        state.cartArray = [...state.cartArray, action.payload];
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartArray.map((item) => item))
      );
    },
    productCardReducer: (state, action) => {
      state.cartArray.map((product) => {
        if (product.productId === action.payload[0]) {
          product.productRepeat += action.payload[1];
        }
        return true;
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartArray.map((item) => item))
      );
    },
    productTotalReducer: (state, action) => {
      state.cartArray.map((product) => {
        if (product.productId === action.payload[0]) {
          product.productTotal = action.payload[1];
        }
        return true;
      });
    },
    productDelete: (state, action) => {
      state.cartArray.splice(action.payload, 1);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartArray.map((item) => item))
      );
    },
    cartTotalReducer: (state, action) => {
      state.totalPrice = action.payload;
    },
    emptyCartReducer: (state, action) => {
      state.cartArray = action.payload;
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartArray.map((item) => item))
      );
    },
    checkoutReducer: (state, action) => {
      state.checkoutArray = action.payload;
      localStorage.setItem(
        "checkoutItems",
        JSON.stringify(state.checkoutArray.map((item) => item))
      );
    },
  },
});

export const { cartReducer } = cartSlice.actions;
export const { productCardReducer } = cartSlice.actions;
export const { productTotalReducer } = cartSlice.actions;
export const { productDelete } = cartSlice.actions;
export const { cartTotalReducer } = cartSlice.actions;
export const { emptyCartReducer } = cartSlice.actions;
export const { checkoutReducer } = cartSlice.actions;
export default cartSlice.reducer;
