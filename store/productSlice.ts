import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../models/product";
import { cartActions } from "./cartSlice";
import { RootState } from "./store";

const createProduct = createAsyncThunk<
	Product,
	Omit<Product, "id" | "ownerId">,
	{ rejectValue: string } // @ts-ignore
>("product/createProduct", async (payload, thunkAPI) => {
	const rootState = thunkAPI.getState() as RootState;
	try {
		const resp = await fetch(
			`https://rnts-shop-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.data.token}`,
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
					ownerId: rootState.auth.data.userID,
				}),
			}
		);

		const responseData = await resp.json();

		if (!resp.ok) {
			return thunkAPI.rejectWithValue(
				responseData.error.message || responseData.error
			);
		}

		return thunkAPI.fulfillWithValue({
			...payload,
			id: responseData.name,
			ownerId: rootState.auth.data.userID,
		});
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const fetchProducts = createAsyncThunk<
	{ data: Product[]; curUser: string },
	void,
	{ rejectValue: string }
>(
	"product/fetchProducts", // @ts-ignore
	async (payload, thunkAPI) => {
		const rootState = thunkAPI.getState() as RootState;

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
				});
			}

			return thunkAPI.fulfillWithValue({
				data: transformedData,
				curUser: rootState.auth.data.userID,
			});
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
	const rootState = thunkAPI.getState() as RootState;
	try {
		const resp = await fetch(
			`https://rnts-shop-default-rtdb.firebaseio.com/products/${payload.id}.json?auth=${rootState.auth.data.token}`,
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
					ownerId: rootState.auth.data.userID,
				}),
			}
		);

		const responseData = await resp.json();

		if (!resp.ok) {
			return thunkAPI.rejectWithValue(
				responseData.error.message || responseData.error
			);
		}

		return thunkAPI.fulfillWithValue({
			...payload,
			ownerId: rootState.auth.data.userID,
		});
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

const deleteProduct = createAsyncThunk<string, any, { rejectValue: string }>(
	"product/delete", // @ts-ignore
	async (payload, thunkAPI) => {
		const rootState = thunkAPI.getState() as RootState;
		try {
			const resp = await fetch(
				`https://rnts-shop-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.data.token}`,
				{
					method: "DELETE",
				}
			);

			const responseData = await resp.json();

			if (!resp.ok) {
				return thunkAPI.rejectWithValue(
					responseData.error.message || responseData.error
				);
			}

			thunkAPI.dispatch(cartActions.deleteHelper(payload));
			return thunkAPI.fulfillWithValue(payload);
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

const initialState = {
	availableProducts: [] as Product[],
	userProducts: [] as Product[],
	error: null as string | null | undefined,
	isLoading: true,
	hasLoaded: false,
};

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.availableProducts = action.payload.data;
				state.userProducts = action.payload.data.filter(
					(prod) => prod.ownerId === action.payload.curUser
				);
				state.isLoading = false;
				state.hasLoaded = true;
				state.error = null;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(createProduct.pending, (state) => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.error = null;
				state.availableProducts.push(action.payload);
				state.userProducts.push(action.payload);
				state.isLoading = false;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(updateProduct.pending, (state) => {
				state.error = null;
				state.isLoading = true;
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

				state.isLoading = false;
				state.error = null;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(deleteProduct.pending, (state, action) => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const productId = action.payload;
				state.userProducts = state.userProducts.filter(
					(product) => product.id !== productId
				);
				state.availableProducts = state.availableProducts.filter(
					(product) => product.id !== productId
				);
				state.isLoading = false;
				state.error = null;
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
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
