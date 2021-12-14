import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
	HeaderButton,
	HeaderButtonProps,
} from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

interface ICustomHeaderButtonProps {
	count?: number;
}

const CustomHeaderButton: React.FC<
	ICustomHeaderButtonProps & HeaderButtonProps
> = (props) => {
	return (
		<View>
			<HeaderButton
				{...props}
				IconComponent={FontAwesome}
				iconSize={23}
				color={Platform.OS === "android" ? "white" : Colors.primary}
			/>
			{props.count && +props.count > 0 && <Text style={styles.total}>{props.count}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	total: {
		position: "absolute",
		right: 2,
		top: -5,
		backgroundColor: "red",
		fontFamily: "nunito-black",
		fontSize: 10,
		borderRadius: 7,
		height: 15,
		width: 15,
		textAlign: "center",
	},
});

export default CustomHeaderButton;
