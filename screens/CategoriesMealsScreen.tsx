import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../types";

interface ICategoriesMealsScreenProps {}

const CategoriesMealsScreen: React.FC<
	ICategoriesMealsScreenProps &
		NativeStackScreenProps<RootStackParamList, "CategoryMeals">
> = (props) => {
	return (
		<View style={styles.screen}>
			<Text>The Categories Meals Screen</Text>
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
