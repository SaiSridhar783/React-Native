import { createSlice } from "@reduxjs/toolkit";
import { ICartItemArray } from "../models/cart-item";
import { createOrder } from "../models/order";
import { IOrder } from "../models/order";

const initialState = {
	orders: [] as IOrder[],
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		addOrder: (
			state: typeof initialState,
			action: {
				type: string;
				payload: { items: ICartItemArray[]; amount: number };
			}
		) => {
			const newOrder = createOrder(
				new Date().toString(),
				action.payload.items,
				action.payload.amount,
				new Date()
			);
			state.orders.push(newOrder);
		},
	},
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
