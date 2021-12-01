import * as React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
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
		<ScrollView>
			<Image
				source={{ uri: selectedMeal?.imageUrl }}
				style={styles.image}
			/>
			<View style={styles.details}>
				<DefaultText>{selectedMeal?.duration}m</DefaultText>
				<DefaultText>
					{selectedMeal?.complexity.toUpperCase()}
				</DefaultText>
				<DefaultText>
					{selectedMeal?.affordability.toUpperCase()}
				</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal?.ingredients.map((ingredient) => (
				<View style={styles.listItem} key={ingredient}>
					<DefaultText>{ingredient}</DefaultText>
				</View>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal?.steps.map((step) => (
				<View style={styles.listItem} key={step}>
					<DefaultText>{step}</DefaultText>
				</View>
			))}
			<View>
				<Button
					title="Go Home"
					onPress={() => {
						props.navigation.popToTop();
					}}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	details: {
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 200,
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "center",
		marginVertical: 20,
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 10,
	},
});

export default MealDetailsScreen;
