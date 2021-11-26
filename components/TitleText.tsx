import React from "react";
import { StyleSheet, Text } from "react-native";

interface TitleTextProps {
	style?: object;
}

const TitleText: React.FC<TitleTextProps> = (props) => {
	return (
		<Text style={{ ...styles.text, ...props.style }}>
			{props.children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
});

export default TitleText;
