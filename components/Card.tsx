import React from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
	style?: object;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
	return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
	card: {
		// Only iOS
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		/////
		elevation: 8, // Only Android
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
	},
});

export default Card;
