import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";
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

	const renderMealItem = (itemData: { item: Meal }) => {
		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onSelectMeal={() => {
					props.navigation.navigate("MealDetails", {
						mealId: itemData.item.id,
						screen: "TabOne"
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				style={styles.list}
				data={displayMeals}
				renderItem={renderMealItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	list: {
		flex: 1,
		width: "95%",
	},
});

export default CategoriesMealsScreen;
