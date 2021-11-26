import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText: React.FC = (props) => {
	return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "open-sans",
	},
});

export default BodyText;
