import { createSlice } from "@reduxjs/toolkit";
import { MEALS } from "../data/dummy-data";

const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [],
};

const mealSlice = createSlice({
	name: "meal",
	initialState: initialState,
	reducers: {},
});

export const mealReducer = mealSlice.reducer;
export const mealActions = mealSlice.actions;
