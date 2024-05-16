//createAsyncThunk

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

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

            console.log("thunkapi 로그인");
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
            console.log("thunkapi oauth로그인");
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
        // const navigate = useNavigate();
        try {
            await axiosInstance.post(`/users/logout`);
            // navigate("/");
            // 마찬가지로 끝나면 return 없이도 userSlice builder로 간다
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);
