import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
	HeaderButton,
	HeaderButtonProps,
} from "react-navigation-header-buttons";
import Colors from "../constants/Colors";

interface CustomIHeaderButtonProps extends HeaderButtonProps {
	title: string;
}

const CustomHeaderButton: React.FC<CustomIHeaderButtonProps> = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={FontAwesome}
			iconSize={23}
			color="orange"
		/>
	);
};

export default CustomHeaderButton;
