import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Place } from "../models/Place";
import * as FileSystemAPI from "expo-file-system";
import { deleteAPlace, fetchPlaces, insertPlace } from "../helpers/db";
import config from "../config";
import { RootState } from "./store";

const initialState = { places: [] as Place[], loading: false };

const addPlace = createAsyncThunk<Place, any, { rejectValue: any }>(
	"places/addPlace",
	async (payload, thunkAPI) => {
		const fileName = payload.image.split("/").pop() as string;
		const newPath = FileSystemAPI.documentDirectory + fileName;
		try {
			const response = await fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${payload.location.lng},${payload.location.lat}.json?access_token=${config.MAPBOX_API}`
			);

			if (!response.ok) {
				return thunkAPI.rejectWithValue("Something went wrong...");
			}

			const resData = await response.json();
			const address = resData.features[0].place_name;

			await FileSystemAPI.moveAsync({
				from: payload.image,
				to: newPath,
			});

			const dbResult: any = await insertPlace(
				payload.title,
				newPath,
				address,
				payload.location.lat,
				payload.location.lng
			);

			const newPlace = new Place(
				dbResult.insertId.toString(),
				payload.title,
				newPath,
				address,
				payload.location
			);

			return newPlace;
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	}
);

const fetchPlace = createAsyncThunk<Place[], void>(
	"places/fetchPlace", // @ts-ignore
	async (_, thunkAPI) => {
		try {
			const dbResult: any = await fetchPlaces();

			return thunkAPI.fulfillWithValue(dbResult.rows._array);
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	}
);

const deletePlace = createAsyncThunk<number, number>(
	"places/deletePlace", // @ts-ignore
	async (id, thunkAPI) => {
		try {
			const rootState = thunkAPI.getState() as RootState;
			await deleteAPlace(id);
			await FileSystemAPI.deleteAsync(
				rootState.place.places.find((p) => +p.id === id)!.imageUri
			);

			return thunkAPI.fulfillWithValue(id);
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
		builder
			.addCase(addPlace.fulfilled, (state, action) => {
				state.places.push(action.payload);
			})
			.addCase(fetchPlace.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchPlace.fulfilled, (state, action) => {
				state.places = action.payload.map(
					(place) =>
						new Place(
							place.id.toString(),
							place.title,
							place.imageUri,
							place.address, //@ts-ignore
							{ lat: place.lat, lng: place.lng }
						)
				);
				state.loading = false;
			})
			.addCase(deletePlace.fulfilled, (state, action) => {
				state.places = state.places.filter(
					(p) => +p.id !== action.payload
				);
			});
	},
});

export const placesReducer = placesSlice.reducer;
export const placesActions = { addPlace, fetchPlace, deletePlace };
