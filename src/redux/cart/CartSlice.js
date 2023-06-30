import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartArray: [],
  totalPrice: 0,
  check:0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReducer: (state, action) => (
      state.check = 0;
      state.cartArray.map((product) => 
        if (product.productId === action.payload.productId) {
          product.productTotal += action.payload.productTotal;
          product.productRepeat += action.payload.productRepeat;
          state.check = 1;
        }
      ));
      if (state.check == 0) {
        state.cartArray = [...state.cartArray, action.payload];
      }
    },
    productCardReducer: (state, action) => (
      state.cartArray.map((product) => {
        if (product.productId === action.payload[0]) {
          product.productRepeat += action.payload[1];
        }
      });
    ),
    productTotalReducer: (state, action) => (
      state.cartArray.map((product) => {
        if (product.productId === action.payload[0]) {
          product.productTotal = action.payload[1];
        }
      });
    ),
    productDelete: (state, action) => (
      state.cartArray.splice(action.payload, 1);
    ),
    cartTotalReducer: (state, action) => (
      state.totalPrice = action.payload;
    ),
  },
});

export const { cartReducer } = cartSlice.actions;
export const { productCardReducer } = cartSlice.actions;
export const { productTotalReducer } = cartSlice.actions;
export const { productDelete } = cartSlice.actions;
export const { cartTotalReducer } = cartSlice.actions;
export default cartSlice.reducer;
