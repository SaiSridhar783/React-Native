import { DrawerActions } from "@react-navigation/native";
import * as React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RootStackScreenProps } from "../../types";
import CustomHeaderButton from "./HeaderButton";

interface IMenuDrawerProps {}

const MenuDrawer: React.FC<
	IMenuDrawerProps & Omit<RootStackScreenProps<"ProductsOverview">, "route">
> = (props) => {
	return (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
			<Item
				title="Menu"
				iconName="navicon"
				onPress={() => {
					props.navigation.dispatch(DrawerActions.toggleDrawer());
				}}
			/>
		</HeaderButtons>
	);
};

export default MenuDrawer;
