import * as React from "react";
import { View } from "react-native";
import DefaultText from "../components/DefaultText";
import MealList from "../components/MealList";
import { CATEGORIES } from "../data/dummy-data";
import { useReduxSelector } from "../store/store";
import { RootStackScreenProps } from "../types";

interface ICategoriesMealsScreenProps {}

const CategoriesMealsScreen: React.FC<
	ICategoriesMealsScreenProps & RootStackScreenProps<"CategoryMeals">
> = (props) => {
	const categoryId = props.route.params?.categoryId;

	const selectedCategory = CATEGORIES.find(
		(category) => category.id === categoryId
	);

	React.useEffect(() => {
		props.navigation.setOptions({
			title: selectedCategory?.title,
		});
		return () => {};
	}, []);

	const mealState = useReduxSelector((state) => state.meal);
	const availableMeals = mealState.filteredMeals;

	const displayMeals = availableMeals.filter(
		//@ts-ignore
		(meal) => meal.categoryIds.indexOf(categoryId) >= 0
	);

	if (displayMeals.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<DefaultText>
					No meals found, maybe check your filters
				</DefaultText>
			</View>
		);
	}

	return <MealList listData={displayMeals} navigation={props.navigation} />;
};

export default CategoriesMealsScreen;
