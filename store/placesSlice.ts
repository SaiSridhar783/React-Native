import { createSlice } from "@reduxjs/toolkit";
import { Place } from "../models/Place";

const initialState = { places: [] as Place[] };

const placesSlice = createSlice({
	name: "places",
	initialState: initialState,
	reducers: {
		addPlace: (state, action) => {
			const newPlace = new Place(
				new Date().toISOString(),
				action.payload.title
			);
			state.places.push(newPlace);
		},
	},
});

export const placesReducer = placesSlice.reducer;
export const placesActions = placesSlice.actions;
