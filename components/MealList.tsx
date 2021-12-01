import * as React from "react";

import { FlatList, StyleSheet, View } from "react-native";
import { Meal } from "../models/meal";
import { RootStackScreenProps } from "../types";
import MealItem from "./MealItem";

interface IMealListProps {
	listData: Meal[];
}

const MealList: React.FC<
	IMealListProps & Partial<RootStackScreenProps<"CategoryMeals">>
> = (props) => {
	const renderMealItem = (itemData: { item: Meal }) => {
		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onSelectMeal={() => {
					props.navigation?.navigate("MealDetails", {
						mealId: itemData.item.id,
						screen: "Meals",
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				style={styles.list}
				data={props.listData}
				renderItem={renderMealItem}
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
	list: {
		flex: 1,
		width: "95%",
	},
});

export default MealList;
