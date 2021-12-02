import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
	HeaderButton,
	HeaderButtonProps,
} from "react-navigation-header-buttons";

interface CustomIHeaderButtonProps extends HeaderButtonProps {
	title: string;
	color?: string;
}

const CustomHeaderButton: React.FC<CustomIHeaderButtonProps> = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={FontAwesome}
			iconSize={23}
		/>
	);
};

export default CustomHeaderButton;
