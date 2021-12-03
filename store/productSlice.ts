import { createSlice } from "@reduxjs/toolkit";
import PRODUCTS from "../data/dummy-data";

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {
		deleteProduct: (state, action) => {
			const productId = action.payload;
			state.userProducts = state.userProducts.filter(
				(product) => product.id !== productId
			);
			state.availableProducts = state.availableProducts.filter(
				(product) => product.id !== productId
			);
		},
	},
	extraReducers: (builder) => {},
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
