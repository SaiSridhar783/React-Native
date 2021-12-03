import * as React from "react";
import { View, StyleSheet } from "react-native";

interface ICardProps {
	style: object;
}

const Card: React.FC<ICardProps> = (props) => {
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
	},
});

export default Card;
