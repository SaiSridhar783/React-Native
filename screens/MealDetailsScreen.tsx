import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IMealDetailsScreenProps {}

const MealDetailsScreen: React.FC<IMealDetailsScreenProps> = (props) => {
	return (
		<View style={styles.screen}>
			<Text>The Meal Details Screen</Text>
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
