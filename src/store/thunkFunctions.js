//createAsyncThunk

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/users/register`, body);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (body, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().user.userData.id;
            const response = await axiosInstance.delete(
                `/users/${userId}`,
                body
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (body, thunkAPI) => {
        try {
            // get userId
            const userId = thunkAPI.getState().user.userData.id;

            const response = await axiosInstance.put(
                `/users/${userId}/update`,
                body
            );
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
            return res.data; // userSlice builder로 간다 여기서 res.data는 userslice builder에서 'action' 으로 넘어간다
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
            return body;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                // action 값으로 넘어감
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
            // 마찬가지로 끝나면 return 없이도 userSlice builder로 간다
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);
