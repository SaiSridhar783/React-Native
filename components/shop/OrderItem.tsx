import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";

interface IOrderItemProps {
	amount: number;
	date: string;
}

const OrderItem: React.FC<IOrderItemProps> = (props) => {
	return (
		<View style={styles.orderItem}>
			<View style={styles.summary}>
				<Text style={styles.totalAmount}>
					${props.amount.toFixed(2)}
				</Text>
				<Text style={styles.date}>{props.date}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					color={Colors.primary}
					title="Show Details"
					onPress={() => {}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	orderItem: {
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: "white",
		margin: 20,
		padding: 10,
		alignItems: "center",
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginBottom: 15,
	},
	totalAmount: {
		fontFamily: "nunito-bold",
		fontSize: 16,
	},
	date: {
		fontFamily: "nunito-semibold",
		fontSize: 16,
		color: "#888",
	},
	buttonContainer: {
		alignSelf: "flex-end",
	},
});

export default OrderItem;
