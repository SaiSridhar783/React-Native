import { createSlice } from "@reduxjs/toolkit";
import PRODUCTS from "../data/dummy-data";
import { createProduct, Product } from "../models/product";

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
		createProduct: (
			state,
			action: { type: string; payload: Omit<Product, "id" | "ownerId"> }
		) => {
			const newProduct = createProduct(
				new Date().toString(),
				"u1",
				action.payload.title,
				action.payload.imageUrl,
				action.payload.description,
				action.payload.price
			);
			state.availableProducts.push(newProduct);
			state.userProducts.push(newProduct);
		},
		updateProduct: (
			state,
			action: {
				type: string;
				payload: Omit<Product, "price" | "ownerId">;
			}
		) => {
			const productIndex = state.userProducts.findIndex(
				(prod) => prod.id === action.payload.id
			);

			state.userProducts[productIndex].title = action.payload.title;
			state.userProducts[productIndex].imageUrl = action.payload.imageUrl;
			state.userProducts[productIndex].description =
				action.payload.description;

			const availableProductIndex = state.availableProducts.findIndex(
				(prod) => prod.id === action.payload.id
			);

			state.availableProducts[availableProductIndex].title =
				action.payload.title;
			state.availableProducts[availableProductIndex].imageUrl =
				action.payload.imageUrl;
			state.availableProducts[availableProductIndex].description =
				action.payload.description;
		},
	},
	extraReducers: (builder) => {},
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
