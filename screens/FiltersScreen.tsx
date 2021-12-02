import * as React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { mealActions } from "../store/mealSlice";
import { useReduxDispatch } from "../store/store";
import { RootStackScreenProps } from "../types";

interface IFiltersScreenProps {
	label: string;
	change: boolean;
	onChange: (value: boolean) => void;
}

const FilterSwitch: React.FC<IFiltersScreenProps> = (props) => {
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

const initialState = {
	glutenFree: false,
	lactoseFree: false,
	vegan: false,
	vegetarian: false,
};

const reducer = (
	state: typeof initialState,
	action: { type: string; val: boolean }
) => {
	switch (action.type) {
		case "glutenFree":
			return { ...state, glutenFree: action.val };

		case "lactoseFree":
			return { ...state, lactoseFree: action.val };

		case "vegan":
			return { ...state, vegan: action.val };

		case "vegetarian":
			return { ...state, vegetarian: action.val };

		default:
			return state;
	}
};

const FiltersScreen: React.FC<RootStackScreenProps<"Filters">> = (props) => {
	const [hookState, hookDispatch] = React.useReducer(reducer, initialState);
	const [isSaving, setIsSaving] = React.useState(false);
	const dispatch = useReduxDispatch();

	React.useEffect(() => {
		if (isSaving) {
			dispatch(mealActions.applyFilter(hookState));
			setIsSaving(false);
		}
		return () => {};
	});

	const saveFiltersHandler = () => {
		setIsSaving(true);
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
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						iconName="save"
						color="white"
						onPress={saveFiltersHandler}
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
				change={hookState.glutenFree}
				onChange={(newVal) => {
					hookDispatch({ type: "glutenFree", val: newVal });
				}}
			/>
			<FilterSwitch
				label="Lactose-free"
				change={hookState.lactoseFree}
				onChange={(newVal) => {
					hookDispatch({ type: "lactoseFree", val: newVal });
				}}
			/>
			<FilterSwitch
				label="Vegan"
				change={hookState.vegan}
				onChange={(newVal) => {
					hookDispatch({ type: "vegan", val: newVal });
				}}
			/>
			<FilterSwitch
				label="Vegetarian"
				change={hookState.vegetarian}
				onChange={(newVal) => {
					hookDispatch({ type: "vegetarian", val: newVal });
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
