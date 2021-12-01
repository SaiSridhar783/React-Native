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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

interface ICategoriesScreenProps {}

const CategoriesScreen: React.FC<
	ICategoriesScreenProps & RootStackScreenProps<"Categories">
> = (props) => {
	const renderGridItem = (itemData: { item: Category }) => {
		return (
			<TouchableNativeFeedback
				onPress={() => {
					props.navigation.navigate("CategoryMeals", {
						categoryId: itemData.item.id,
						screen: "Meals",
					});
				}}
			>
				<View
					style={{
						...styles.gridItem,
						backgroundColor: itemData.item.color,
					}}
				>
					<Text style={styles.titleText} numberOfLines={2}>
						{itemData.item.title}
					</Text>
				</View>
			</TouchableNativeFeedback>
		);
	};

	React.useEffect(() => {
		props.navigation.setOptions({
			headerLeft: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						iconName="navicon"
						color="white"
						onPress={() => {
							// @ts-ignore
							props.navigation.toggleDrawer();
						}}
					/>
				</HeaderButtons>
			),
		});
		return () => {};
	}, []);

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
		justifyContent: "flex-end",
		alignItems: "flex-end",
		elevation: 10,
		padding: 15,
	},
	titleText: {
		fontFamily: "nunito",
		fontSize: 20,
	},
});

export default CategoriesScreen;
