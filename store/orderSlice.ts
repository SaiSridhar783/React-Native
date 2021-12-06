import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICartItemArray } from "../models/cart-item";
import { createOrder, IOrder } from "../models/order";
import { cartActions } from "./cartSlice";
import store, { RootState } from "./store";

const initialState = {
	orders: [] as IOrder[],
	isLoading: false,
	error: false,
};

const addOrder = createAsyncThunk<
	IOrder,
	{ items: ICartItemArray[]; amount: number },
	{ rejectValue: string; getState: () => typeof store.getState } // @ts-ignore
>("order/createOrder", async (payload, thunkAPI) => {
	try {
		const date = new Date();
		const resp = await fetch(
			"https://rnts-shop-default-rtdb.firebaseio.com/orders/u1.json",
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

		if (!resp.ok) {
			return thunkAPI.rejectWithValue("Something went wrong...");
		}

		const responseData = await resp.json();

		thunkAPI.dispatch(cartActions.clearCart());

		return thunkAPI.fulfillWithValue(
			createOrder(responseData.name, payload.items, payload.amount, date)
		);
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addOrder.fulfilled, (state, action) => {
			state.orders.push(action.payload);
		});
	},
});

export const orderReducer = orderSlice.reducer;
export const orderActions = { addOrder };
