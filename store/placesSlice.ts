import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Place } from "../models/Place";
import * as FileSystemAPI from "expo-file-system";
import { insertPlace } from "../helpers/db";

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

			const dbResult: any = await insertPlace(
				payload.title,
				newPath,
				"afsgthyjghgtr",
				42.38,
				69.14
				/* payload.address,
				payload.lat,
				payload.lng */
			);

			const newPlace = new Place(
				dbResult.insertId.toString(),
				payload.title,
				newPath
			);

			return newPlace;
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
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
