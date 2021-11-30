import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ICategoriesMealsScreenProps {}

const CategoriesMealsScreen: React.FC<ICategoriesMealsScreenProps> = () => {
	return (
		<View style={styles.screen}>
			<Text>The Categories Meals Screen</Text>
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
