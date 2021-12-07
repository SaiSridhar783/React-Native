import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import creds from "../config.json";

let timer: any;

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

		const payloadDatum = {
			token: resData.idToken,
			userID: resData.localId,
		};

		const expirationDate = new Date(
			new Date().getTime() + +resData.expiresIn * 1000
		);

		thunkAPI.dispatch(
			authActions.setLogoutTimer(
				expirationDate.getTime() - new Date().getTime()
			)
		);
		saveDataToStorage(payloadDatum, expirationDate);
		return thunkAPI.fulfillWithValue(payloadDatum);
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

		const payloadDatum = {
			token: resData.idToken,
			userID: resData.localId,
		};

		const expirationDate = new Date(
			new Date().getTime() + +resData.expiresIn * 1000
		);

		thunkAPI.dispatch(
			authActions.setLogoutTimer(
				expirationDate.getTime() - new Date().getTime()
			)
		);
		saveDataToStorage(payloadDatum, expirationDate);
		return thunkAPI.fulfillWithValue(payloadDatum);
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

function saveDataToStorage(payload: any, expirationDate: Date) {
	AsyncStorage.setItem(
		"userData",
		JSON.stringify({ ...payload, expiryDate: expirationDate.toISOString() })
	);
}

const setLogoutTimer = createAsyncThunk(
	"auth/autoLogout",
	(payload: number, thunkAPI) => {
		timer = setTimeout(() => {
			thunkAPI.dispatch(authActions.logout());
		}, payload);
	}
);

const saveCreds = createAsyncThunk(
	"auth/saveCreds",
	(payload: any, thunkAPI) => {
		thunkAPI.dispatch(authActions.setLogoutTimer(payload.expiryTime));

		return thunkAPI.fulfillWithValue(payload.main);
	}
);

const logout = createAsyncThunk("auth/logout", () => {
	if (timer) clearTimeout(timer);
	AsyncStorage.removeItem("userData");
});

const initialState = {
	isLoading: false,
	error: null as null | string,
	data: { token: "", userID: "" },
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
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
			})
			.addCase(saveCreds.fulfilled, (state, action) => {
				state.data = action.payload;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.data.token = "";
				state.data.userID = "";
			});
	},
});

export const authReducer = authSlice.reducer;
export const authActions = {
	logout,
	login,
	signup,
	setLogoutTimer,
	saveCreds,
};
