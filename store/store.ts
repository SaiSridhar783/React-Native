import { configureStore } from "@reduxjs/toolkit";
import { mealReducer } from "./mealSlice";

const store = configureStore({
	reducer: {
		meal: mealReducer,
	},
});

export default store;
