import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../types";

interface IMealDetailsScreenProps {}

const MealDetailsScreen: React.FC<
	IMealDetailsScreenProps &
		NativeStackScreenProps<RootStackParamList, "MealDetails">
> = (props) => {
	return (
		<View style={styles.screen}>
			<Text>The Meal Details Screen</Text>
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
