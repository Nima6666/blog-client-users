import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./slices/postSlice";
import { userSlice } from "./slices/userSlice";
import { loginFormSlice } from "./slices/loginFormSlice";
import { loadingSlice } from "./slices/locadingSlice";

export const store = configureStore({
  reducer: {
    postReducer: postSlice.reducer,
    userReducer: userSlice.reducer,
    loginFormReducer: loginFormSlice.reducer,
    loadingReducer: loadingSlice.reducer,
  },
});

export default store;
