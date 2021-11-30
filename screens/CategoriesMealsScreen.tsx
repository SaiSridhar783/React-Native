import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
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

	return (
		<View style={styles.screen}>
			<Text>The Categories Meals Screen</Text>
			<Text>{selectedCategory?.title}</Text>
			<Button
				title="Go to Meal Details"
				onPress={() => {
					props.navigation.navigate("MealDetails");
				}}
			/>
			<Button
				title="Go Back"
				onPress={() => {
					props.navigation.goBack();
				}}
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
});

export default CategoriesMealsScreen;
