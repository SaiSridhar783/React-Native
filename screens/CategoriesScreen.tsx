import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ICategoriesScreenProps {}

const CategoriesScreen: React.FC<ICategoriesScreenProps> = (props) => {
	return (
		<View style={styles.screen}>
			<Text>The Categories Screen</Text>
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
