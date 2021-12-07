import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICartItemArray } from "../models/cart-item";
import { createOrder, IOrder } from "../models/order";
import { cartActions } from "./cartSlice";
import { RootState } from "./store";

const initialState = {
	orders: [] as IOrder[],
	isLoading: false,
	error: null as null | string,
};

const addOrder = createAsyncThunk<
	IOrder,
	{ items: ICartItemArray[]; amount: number },
	{ rejectValue: any } // @ts-ignore
>("order/createOrder", async (payload, thunkAPI) => {
	const rootState = thunkAPI.getState() as RootState;

	try {
		const date = new Date();
		const resp = await fetch(
			`https://rnts-shop-default-rtdb.firebaseio.com/orders/${rootState.auth.data.userID}.json`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					items: payload.items,
					totalAmount: payload.amount,
					date: date.toISOString(),
				}),
			}
		);

		const responseData = await resp.json();
		if (!resp.ok) {
			console.log(responseData);

			return thunkAPI.rejectWithValue("Something went wrong...");
		}

		thunkAPI.dispatch(cartActions.clearCart());

		return thunkAPI.fulfillWithValue(
			createOrder(responseData.name, payload.items, payload.amount, date)
		);
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const fetchOrders = createAsyncThunk<
	IOrder[],
	void,
	{ rejectValue: any } // @ts-ignore
>("order/fetchOrders", async (payload, thunkAPI) => {
	const rootState = thunkAPI.getState() as RootState;

	try {
		const resp = await fetch(
			`https://rnts-shop-default-rtdb.firebaseio.com/orders/${rootState.auth.data.userID}.json`
		);

		if (!resp.ok) {
			return thunkAPI.rejectWithValue("Something went wrong...");
		}

		const responseData = await resp.json();

		const loadedData: IOrder[] = [];

		for (let uid in responseData) {
			loadedData.push(
				createOrder(
					uid,
					responseData[uid].items,
					responseData[uid].totalAmount,
					new Date(responseData[uid].date)
				)
			);
		}

		return thunkAPI.fulfillWithValue(loadedData);
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addOrder.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addOrder.fulfilled, (state, action) => {
				state.orders.push(action.payload);
				state.error = null;
				state.isLoading = false;
			})
			.addCase(addOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(fetchOrders.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.error = null;
				state.isLoading = false;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const orderReducer = orderSlice.reducer;
export const orderActions = { addOrder, fetchOrders };
