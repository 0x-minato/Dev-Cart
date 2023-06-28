import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

const searchSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingReducer: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loadingReducer } = searchSlice.actions;
export default searchSlice.reducer;
