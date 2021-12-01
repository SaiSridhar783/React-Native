import * as React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
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
			headerLeft: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						iconName="navicon"
						color="white"
						onPress={() => {
							// @ts-ignore
							props.navigation.toggleDrawer();
						}}
					/>
				</HeaderButtons>
			),
		});
		return () => {};
	}, []);

	const favMeals = MEALS.filter((meal) => meal.id == "m1" || meal.id == "m2");

	return <MealList listData={favMeals} navigation={props.navigation} />;
};

export default FavouritesScreen;
