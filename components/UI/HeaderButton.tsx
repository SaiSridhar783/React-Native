import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Platform } from "react-native";
import {
	HeaderButton,
	HeaderButtonProps,
} from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

interface ICustomHeaderButtonProps {}

const CustomHeaderButton: React.FC<
	ICustomHeaderButtonProps & HeaderButtonProps
> = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={FontAwesome}
			iconSize={23}
			color={Platform.OS === "android" ? "white" : Colors.primary}
		/>
	);
};

export default CustomHeaderButton;
