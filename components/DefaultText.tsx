import * as React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface IDefaultTextProps extends TextProps {
	style?: object;
}

const DefaultText: React.FC<IDefaultTextProps> = (props) => {
	return (
		<Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		color: "black",
		fontFamily: "nunito",
	},
});

export default DefaultText;
