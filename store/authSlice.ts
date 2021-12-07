import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import creds from "../config.json";

const signup = createAsyncThunk<
	any,
	{ email: string; password: string },
	{ rejectValue: any }
>("auth/signup", async (payload, thunkAPI) => {
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

		const resData = await resp.json();
		if (!resp.ok) {
			return thunkAPI.rejectWithValue(resData.error.message);
		}

		return thunkAPI.fulfillWithValue({
			token: resData.idToken,
			userId: resData.localId,
		});
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const login = createAsyncThunk<
	any,
	{ email: string; password: string },
	{ rejectValue: any }
>("auth/login", async (payload, thunkAPI) => {
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

		const resData = await resp.json();

		if (!resp.ok) {
			return thunkAPI.rejectWithValue(resData.error.message);
		}

		return thunkAPI.fulfillWithValue({
			token: resData.idToken,
			userId: resData.localId,
		});
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const initialState = {
	isLoading: false,
	error: null as null | string,
	data: { token: "", userID: "" },
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = { token: "", userID: "" };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.data = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.data = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const authReducer = authSlice.reducer;
export const authActions = { ...authSlice.actions, signup, login };
