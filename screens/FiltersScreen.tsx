import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

interface IFiltersScreenProps {}

const FiltersScreen: React.FC<
	IFiltersScreenProps & RootStackScreenProps<"Filters">
> = (props) => {
	return (
		<View style={styles.screen}>
			<Text>The Filters Screen</Text>
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

export default FiltersScreen;
