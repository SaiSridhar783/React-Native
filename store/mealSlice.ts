import { createSlice } from "@reduxjs/toolkit";
import { MEALS } from "../data/dummy-data";
import { Meal } from "../models/meal";

const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [] as Meal[],
};

const mealSlice = createSlice({
	name: "meal",
	initialState: initialState,
	reducers: {
		toggleFavorite: (state, action) => {
			const mealId = action.payload;
			const index = state.favoriteMeals.findIndex(
				(meal) => meal.id === mealId
			);
			if (index >= 0) {
				state.favoriteMeals.splice(index, 1);
			} else {
				const newFav = state.meals.find((meal) => meal.id === mealId);
				state.favoriteMeals.push(newFav!);
			}
		},
		applyFilter: (state, action) => {
			const selectedFilters = action.payload;
			state.filteredMeals = state.meals.filter((meal) => {
				if (selectedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (selectedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (selectedFilters.vegan && !meal.isVegan) {
					return false;
				}
				if (selectedFilters.vegetarian && !meal.isVegetarian) {
					return false;
				}
				return true;
			});
		},
	},
});

export const mealReducer = mealSlice.reducer;
export const mealActions = mealSlice.actions;
