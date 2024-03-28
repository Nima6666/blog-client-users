import { createSlice } from "@reduxjs/toolkit";

export const userLoggedInSlice = createSlice({
    name: "user",
    initialState: { user: {} },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const userAction = userLoggedInSlice.actions;
