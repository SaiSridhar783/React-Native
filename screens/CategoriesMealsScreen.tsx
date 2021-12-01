import * as React from "react";
import MealItem from "../components/MealItem";
import MealList from "../components/MealList";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { Meal } from "../models/meal";
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

	const displayMeals = MEALS.filter(
		//@ts-ignore
		(meal) => meal.categoryIds.indexOf(categoryId) >= 0
	);

	return <MealList listData={displayMeals} navigation={props.navigation} />;
};

export default CategoriesMealsScreen;
