import * as React from "react";
import { StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import CustomHeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";
import { useReduxSelector } from "../store/store";
import { RootStackScreenProps } from "../types";

interface IFavouritesScreenProps {}

const FavouritesScreen: React.FC<
	IFavouritesScreenProps & RootStackScreenProps<"CategoryMeals">
> = (props) => {
	React.useEffect(() => {
		props.navigation.setOptions({
			title: "Your Favourites",
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

	const { favoriteMeals: favMeals } = useReduxSelector((state) => state.meal);

	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.content}>
				<DefaultText>No Favourites yet. Start adding some!</DefaultText>
			</View>
		);
	}

	return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default FavouritesScreen;
