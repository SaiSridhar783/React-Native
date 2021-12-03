import { createSlice } from "@reduxjs/toolkit";
import { ICartItem, createCartItem } from "../models/cart-item";
import { Product } from "../models/product";

const initialState = {
	items: {} as { [id: string]: ICartItem },
	totalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addProduct: (
			state: typeof initialState,
			action: { type: string; payload: Product }
		) => {
			const addedProduct = action.payload;
			const productPrice = addedProduct.price;
			const productTitle = addedProduct.title;

			if (state.items[addedProduct.id]) {
				state.items[addedProduct.id].quantity += 1;
				state.items[addedProduct.id].sum += productPrice;
				state.totalAmount += productPrice;
			} else {
				state.items[addedProduct.id] = createCartItem(
					1,
					productPrice,
					productTitle
				);
				state.totalAmount += productPrice;
			}
		},
		removeProduct: (
			state: typeof initialState,
			action: { type: string; payload: string }
		) => {
			const pid = action.payload;
			const currentQty = state.items[pid].quantity;
			if (currentQty > 1) {
				state.items[pid].quantity -= 1;
				state.items[pid].sum -= state.items[pid].productPrice;
				state.totalAmount -= state.items[pid].productPrice;
			} else {
				state.totalAmount -= state.items[pid].sum;
				delete state.items[pid];
			}
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
