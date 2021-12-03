import * as React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RootDrawerScreenProps } from "../../types";
import CustomHeaderButton from "./HeaderButton";

interface IMenuDrawerProps {
	title: string;
	iconName: string;
	onPress: () => void;
}

const CreateProduct: React.FC<
	IMenuDrawerProps & Omit<RootDrawerScreenProps<"EditProduct">, "route">
> = (props) => {
	return (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
			<Item
				title={props.title}
				iconName={props.iconName}
				onPress={() => {
					props.navigation.navigate("EditProduct", {
						screen: "TabOne",
					});
					props.onPress()
				}}
			/>
		</HeaderButtons>
	);
};

export default CreateProduct;
