import { createSlice } from "@reduxjs/toolkit";

export const loginFormSlice = createSlice({
  name: "loginForm",
  initialState: { isForm: false },
  reducers: {
    setForm: (state, action) => {
      state.isForm = action.payload;
    },
  },
});

export const formAction = loginFormSlice.actions;
