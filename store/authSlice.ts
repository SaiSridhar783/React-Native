import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import creds from "../config.json";

const signup = createAsyncThunk<any, { email: string; password: string }>(
	"auth/signup",
	async (payload, thunkAPI) => {
		try {
			const resp = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${creds.FIREBASE_API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: payload.email,
						password: payload.password,
						returnSecureToken: true,
					}),
				}
			);

			if (!resp.ok) {
				const resData = await resp.json();
				return thunkAPI.rejectWithValue(resData.message);
			}

			const resData = await resp.json();

			console.log(resData);
		} catch (e: any) {
			console.log(e);

			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

const login = createAsyncThunk<any, { email: string; password: string }>(
	"auth/login",
	async (payload, thunkAPI) => {
		try {
			const resp = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${creds.FIREBASE_API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: payload.email,
						password: payload.password,
						returnSecureToken: true,
					}),
				}
			);

			if (!resp.ok) {
				const resData = await resp.json();
				return thunkAPI.rejectWithValue(resData.message);
			}

			const resData = await resp.json();

			console.log(resData);
		} catch (e: any) {
			console.log(e);

			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

const initialState = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: {},
});

export const authReducer = authSlice.reducer;
export const authActions = { signup, login };
