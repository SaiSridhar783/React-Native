import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../models/product";

const createProduct = createAsyncThunk<
	Product,
	Omit<Product, "id" | "ownerId">,
	{ rejectValue: string } // @ts-ignore
>("product/createProduct", async (payload, thunkAPI) => {
	try {
		const resp = await fetch(
			"https://rnts-shop-default-rtdb.firebaseio.com/products.json",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					title: payload.title,
					description: payload.description,
					imageUrl: payload.imageUrl,
					price: payload.price,
				}),
			}
		);

		const responseData = await resp.json();

		return thunkAPI.fulfillWithValue({
			...payload,
			id: responseData.name,
			ownerId: "u1",
		});
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const fetchProducts = createAsyncThunk<
	Product[],
	void,
	{ rejectValue: string }
>(
	"product/fetchProducts", // @ts-ignore
	async (payload, thunkAPI) => {
		try {
			const respReq = await fetch(
				"https://rnts-shop-default-rtdb.firebaseio.com/products.json"
			);

			if (!respReq.ok) {
				return thunkAPI.rejectWithValue("Temporary Server Error!");
			}

			const resp = await respReq.json();

			const transformedData: Product[] = [];

			for (let id in resp) {
				transformedData.push({
					id,
					...resp[id],
					ownerId: "u1",
				});
			}

			return thunkAPI.fulfillWithValue(transformedData);
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

const updateProduct = createAsyncThunk<
	Product,
	Partial<Product>,
	{ rejectValue: string } // @ts-ignore
>("product/updateProduct", async (payload, thunkAPI) => {
	try {
		await fetch(
			`https://rnts-shop-default-rtdb.firebaseio.com/products/${payload.id}.json`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					title: payload.title,
					description: payload.description,
					imageUrl: payload.imageUrl,
				}),
			}
		);

		return thunkAPI.fulfillWithValue({
			...payload,
			ownerId: "u1",
		});
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const deleteProduct = createAsyncThunk<string>(
	"product/delete", // @ts-ignore
	async (payload) => {
		try {
			await fetch(
				`https://rnts-shop-default-rtdb.firebaseio.com/products/${payload}.json`,
				{
					method: "DELETE",
				}
			);
		} catch (e) {}
		return payload;
	}
);

const initialState = {
	availableProducts: [] as Product[],
	userProducts: [] as Product[],
	error: null as string | null | undefined,
	isLoading: true,
};

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.fulfilled, (state, action) => {
				state.error = null;
				state.availableProducts.push(action.payload);
				state.userProducts.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(fetchProducts.pending, (state) => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.availableProducts = action.payload;
				state.userProducts = action.payload.filter(
					(prod) => prod.ownerId === "u1"
				);
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				const productIndex = state.userProducts.findIndex(
					(prod) => prod.id === action.payload.id
				);

				state.userProducts[productIndex].title = action.payload.title;
				state.userProducts[productIndex].imageUrl =
					action.payload.imageUrl;
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
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const productId = action.payload;
				state.userProducts = state.userProducts.filter(
					(product) => product.id !== productId
				);
				state.availableProducts = state.availableProducts.filter(
					(product) => product.id !== productId
				);
			});
	},
});

export const productActions = {
	createProduct,
	fetchProducts,
	updateProduct,
	deleteProduct,
};
export const productReducer = productSlice.reducer;
