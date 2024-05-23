//reducer

import { createSlice } from "@reduxjs/toolkit";
import {
    loginUser,
    authUser,
    logoutUser,
    registerUser,
    oauthLogin,
    updateUserPassword,
    deleteUser,
} from "./thunkFunctions";

const initialState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        password: "",
        image: "",
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
                console.log(
                    "action.payload when registerUser.fulfilled:",
                    action.payload
                );
                state.userData = action.payload.user;
                state.error = "";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("registerUser rejected:", action.payload);
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.oauthLogin = false;
                state.error = "";
                console.log(
                    "action.payload when loginUser.fulfilled:",
                    action.payload
                );
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
                console.log(
                    "action.payload when oauthLogin.fulfilled:",
                    action.payload
                );
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
                console.log(
                    "action.payload when authUser.fulfilled:",
                    action.payload
                );
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
            .addCase(updateUserPassword.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                console.log(
                    "action.payload in updateUserPassword:",
                    action.payload
                );
                state.userData.password = action.payload.user.password;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
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

export const { setAuth, setUserData } = userSlice.actions;
export default userSlice.reducer;
