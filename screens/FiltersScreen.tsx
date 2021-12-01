import * as React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

interface IFiltersScreenProps {
	label: string;
	change: boolean;
	onChange: (value: boolean) => void;
}

const FilterSwitch: React.FC<IFiltersScreenProps> = (props) => {
	const [isSelected, setIsSelected] = React.useState(false);

	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor, false: "#ccc" }}
				thumbColor={props.change ? "whitesmoke" : Colors.primaryColor}
				value={props.change}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

const FiltersScreen: React.FC<RootStackScreenProps<"Filters">> = (props) => {
	const [isGlutenFree, setIsGlutenFree] = React.useState(false);
	const [isLactoseFree, setIsLactoseFree] = React.useState(false);
	const [isVegan, setIsVegan] = React.useState(false);
	const [isVegetarian, setIsVegetarian] = React.useState(false);

	const saveFilters = () => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian,
		};
		console.log(appliedFilters);
	};

	/* React.useEffect(() => {
		saveFilters();
	}, [saveFilters]); */

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
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						iconName="save"
						color="white"
						onPress={saveFilters}
					/>
				</HeaderButtons>
			),
		});
	}, []);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Avaiable Filters</Text>
			<FilterSwitch
				label="Gluten-free"
				change={isGlutenFree}
				onChange={(newVal) => {
					setIsGlutenFree(newVal);
				}}
			/>
			<FilterSwitch
				label="Lactose-free"
				change={isLactoseFree}
				onChange={(newVal) => {
					setIsLactoseFree(newVal);
				}}
			/>
			<FilterSwitch
				label="Vegan"
				change={isVegan}
				onChange={(newVal) => {
					setIsVegan(newVal);
				}}
			/>
			<FilterSwitch
				label="Vegetarian"
				change={isVegetarian}
				onChange={(newVal) => {
					setIsVegetarian(newVal);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 20,
		marginVertical: 10,
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		marginVertical: 15,
	},
});

export default FiltersScreen;
