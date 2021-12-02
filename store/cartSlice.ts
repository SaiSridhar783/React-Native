import { createSlice } from "@reduxjs/toolkit";
import { CartItem, createCartItem } from "../models/cart-item";
import { Product } from "../models/product";

const initialState = {
	items: {} as { [id: string]: CartItem },
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
	},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
