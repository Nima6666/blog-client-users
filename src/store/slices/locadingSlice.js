import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "LoadingSlice",
  initialState: { loading: true, postLoading: true },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostLoading: (state, action) => {
      state.postLoading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
