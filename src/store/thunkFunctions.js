//createAsyncThunk

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { setUserData } from "./userSlice";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/users/register`, body);
            console.log("thunkapi 회원가입");
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (body, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/users/login", body);
            // console.log("res.data.user after login in thunkapi", res.data.user);
            localStorage.setItem("accessToken", res.data.accessToken);
            const { email, name, _id, role } = res.data.user;
            const userDataToStore = {
                email,
                name,
                _id,
                role,
            };

            // Dispatch setUserData action to update Redux state with userData
            thunkAPI.dispatch(setUserData(userDataToStore));
            // console.log(localStorage.getItem("user"));

            // localStorage.setItem("user", JSON.stringify(userDataToStore));
            console.log("thunkapi 로그인");
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const oauthLogin = createAsyncThunk(
    "user/oauthLogin",
    async (body, thunkAPI) => {
        try {
            localStorage.setItem("accessToken", body.accessToken);
            const { email, name, _id, role, image } = body.user;
            const userDataToStore = {
                email,
                name,
                _id,
                role,
                image,
            };

            // Dispatch setUserData action to update Redux state with userData
            thunkAPI.dispatch(setUserData(userDataToStore));
            // console.log(localStorage.getItem("user"));

            // localStorage.setItem("user", JSON.stringify(userDataToStore));
            console.log("thunkapi 카카오로그인");
            return;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const authUser = createAsyncThunk(
    "user/authUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/users/auth`);
            console.log("thunkapi auth");
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            await axiosInstance.post(`/users/logout`);
            thunkAPI.dispatch(setUserData(null));
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);
