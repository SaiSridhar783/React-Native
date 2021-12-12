import * as React from "react";
import { Platform } from "react-native";
import {
	HeaderButton,
	HeaderButtonProps,
} from "react-navigation-header-buttons";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton: React.FC<HeaderButtonProps> = (props) => {
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
