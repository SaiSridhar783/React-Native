import { createSlice } from "@reduxjs/toolkit";
import PRODUCTS from "../data/dummy-data";

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {},
	extraReducers: {},
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
