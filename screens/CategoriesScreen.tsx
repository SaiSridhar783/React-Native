import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

interface ICategoriesScreenProps {}

const CategoriesScreen: React.FC<
	ICategoriesScreenProps &
		NativeStackScreenProps<RootStackParamList, "Categories">
> = (props) => {
	return (
		<View style={styles.screen}>
			<Text>The Categories Screen</Text>
			<Button
				title="Go to Meals"
				onPress={() => {
					props.navigation.navigate("CategoryMeals");
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

export default CategoriesScreen;
