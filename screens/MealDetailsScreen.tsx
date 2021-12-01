import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";
import { RootStackScreenProps } from "../types";

interface IMealDetailsScreenProps {}

const MealDetailsScreen: React.FC<
	IMealDetailsScreenProps & RootStackScreenProps<"MealDetails">
> = (props) => {
	const mealId = props.route.params?.mealId;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	React.useEffect(() => {
		props.navigation.setOptions({
			title: selectedMeal?.title,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Favourite"
						iconName="star"
						onPress={() => {}}
					/>
				</HeaderButtons>
			),
		});
		return () => {};
	}, []);

	return (
		<View style={styles.screen}>
			<Text>{selectedMeal?.title}</Text>
			<Button
				title="Go Home"
				onPress={() => {
					props.navigation.popToTop();
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

export default MealDetailsScreen;
