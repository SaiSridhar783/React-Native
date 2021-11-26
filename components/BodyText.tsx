import React from "react";
import { StyleSheet, Text } from "react-native";

interface BodyTextProps {
	style?: object;
}

const BodyText: React.FC<BodyTextProps> = (props) => {
	return (
		<Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "open-sans",
	},
});

export default BodyText;
