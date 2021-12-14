import moment from "moment";
import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import { ICartItemArray } from "../../models/cart-item";
import Card from "../UI/Card";
import CartItem from "./CartItem";

interface IOrderItemProps {
	amount: number;
	date: Date;
	items: ICartItemArray[];
}

const OrderItem: React.FC<IOrderItemProps> = (props) => {
	const [showDetails, setShowDetails] = React.useState(false);

	return (
		<Card style={styles.orderItem}>
			<View style={styles.summary}>
				<Text style={styles.totalAmount}>
					${props.amount.toFixed(2)}
				</Text>
				<Text style={styles.date}>
					{moment(props.date).format("MMMM Do YYYY, h:mm a")}
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					color={Colors.primary}
					title={showDetails ? "Hide Details" : "Show Details"}
					onPress={() => {
						setShowDetails((prev) => !prev);
					}}
				/>
			</View>
			{showDetails && (
				<View style={styles.detailItems}>
					{props.items.map((cartItem) => (
						<CartItem
							amount={cartItem.sum}
							quantity={cartItem.quantity}
							title={cartItem.productTitle}
							key={cartItem.productId}
						/>
					))}
				</View>
			)}
		</Card>
	);
};

const styles = StyleSheet.create({
	orderItem: {
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
	detailItems: {
		width: "100%",
	},
});

export default OrderItem;
