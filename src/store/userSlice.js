//reducer

import { createSlice } from "@reduxjs/toolkit";
import {
    loginUser,
    authUser,
    logoutUser,
    registerUser,
    oauthLogin,
    updateUser,
    deleteUser,
} from "./thunkFunctions";

const initialState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        image: {},
        password: "",
        createdAt: "",
    },
    isAuth: false,
    oauthLogin: false,
    isLoading: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload.user;
                state.error = "";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.oauthLogin = false;
                state.error = "";
                state.userData = action.payload.user;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(oauthLogin.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(oauthLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.oauthLogin = true;
                state.error = "";
                state.userData = action.payload.user;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })
            .addCase(oauthLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.userData = action.payload.user;

                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                state.userData = initialState.userData;
                localStorage.removeItem("accessToken");
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.oauthLogin = false;
                state.error = "";
                state.userData = initialState.userData; //초기화
                state.isAuth = false;
                localStorage.removeItem("accessToken"); // token삭제
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.userData = action.payload.user;
                if (action.payload.passwordChange) {
                    state.isAuth = false;
                    localStorage.removeItem("accessToken");
                } else {
                    state.isAuth = true;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = true;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.oauthLogin = false;
                state.error = "";
                state.userData = initialState.userData; //초기화
                state.isAuth = false;
                localStorage.removeItem("accessToken"); // token삭제
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
