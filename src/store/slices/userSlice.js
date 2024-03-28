import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { userIn: null },
    reducers: {
        setUser: (state, action) => {
            state.userIn = action.payload;
        },
    },
});

export const userActions = userSlice.actions;
