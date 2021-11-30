import * as React from "react";
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	TouchableNativeFeedback,
} from "react-native";

import { RootStackScreenProps } from "../types";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";

interface ICategoriesScreenProps {}

const CategoriesScreen: React.FC<
	ICategoriesScreenProps & RootStackScreenProps<"Categories">
> = (props) => {
	const renderGridItem = (itemData: { item: Category }) => {
		return (
			<TouchableNativeFeedback
				onPress={() => {
					props.navigation.navigate("CategoryMeals", {
						params: { categoryId: itemData.item.id },
						screen: "CategoryMeals",
					});
				}}
			>
				<View style={styles.gridItem}>
					<Text>{itemData.item.title}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	};

	return (
		<FlatList
			numColumns={2}
			data={CATEGORIES}
			renderItem={renderGridItem}
		/>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	gridItem: {
		flex: 1,
		margin: 15,
		height: 150,
		borderRadius: 10,
		justifyContent: "center",
	},
});

export default CategoriesScreen;
