import * as React from "react";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import { RootStackScreenProps } from "../types";

interface IFavouritesScreenProps {}

const FavouritesScreen: React.FC<
	IFavouritesScreenProps & RootStackScreenProps<"CategoryMeals">
> = (props) => {
	React.useEffect(() => {
		props.navigation.setOptions({
			title: "Your Favourites",
		});
		return () => {};
	}, []);

	const favMeals = MEALS.filter((meal) => meal.id == "m1" || meal.id == "m2");

	return <MealList listData={favMeals} navigation={props.navigation} />;
};

export default FavouritesScreen;
