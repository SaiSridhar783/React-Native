import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Place } from "../models/Place";
import * as FileSystemAPI from "expo-file-system";

const initialState = { places: [] as Place[] };

const addPlace = createAsyncThunk<Place, any, { rejectValue: any }>(
	"places/addPlace",
	async (payload, thunkAPI) => {
		const fileName = payload.image.split("/").pop() as string;
		const newPath = FileSystemAPI.documentDirectory + fileName;
		try {
			await FileSystemAPI.moveAsync({
				from: payload.image,
				to: newPath,
			});
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}

		const newPlace = new Place(
			new Date().toISOString(),
			payload.title,
			newPath
		);

		return newPlace;
	}
);

const placesSlice = createSlice({
	name: "places",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addPlace.fulfilled, (state, action) => {
			state.places.push(action.payload);
		});
	},
});

export const placesReducer = placesSlice.reducer;
export const placesActions = { addPlace };
