import * as React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RootDrawerScreenProps } from "../../types";
import CustomHeaderButton from "./HeaderButton";

interface IMenuDrawerProps {}

const MenuDrawer: React.FC<
	IMenuDrawerProps & Omit<RootDrawerScreenProps<"EditProduct">, "route">
> = (props) => {
	return (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
			<Item
				title="Add"
				iconName="plus"
				onPress={() => {
					props.navigation.navigate("EditProduct", {
						screen: "TabOne",
					});
				}}
			/>
		</HeaderButtons>
	);
};

export default MenuDrawer;
