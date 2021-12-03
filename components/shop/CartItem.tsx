import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

interface ICartItemProps {
	onRemove?: () => void;
	quantity: number;
	title: string;
	amount: number;
	deletable?: boolean;
}

const CartItem: React.FC<ICartItemProps> = (props) => {
	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<Text style={styles.quantity}>{props.quantity}&nbsp;</Text>
				<Text style={styles.title}>{props.title}</Text>
			</View>
			<View style={styles.itemData}>
				<Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
				{props.deletable && (
					<TouchableNativeFeedback onPress={props.onRemove}>
						<FontAwesome
							name="trash"
							size={23}
							color="red"
							style={styles.deleteButton}
						/>
					</TouchableNativeFeedback>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		padding: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginVertical: 5,
	},
	itemData: {
		flexDirection: "row",
		alignItems: "center",
	},
	quantity: {
		fontSize: 18,
		color: "#888",
		fontFamily: "nunito-semibold",
	},
	title: {
		fontSize: 16,
		marginHorizontal: 10,
		fontFamily: "nunito-bold",
	},
	deleteButton: {
		marginLeft: 20,
	},
	amount: {
		fontSize: 16,
		color: "gray",
		fontFamily: "nunito-bold",
	},
});

export default CartItem;
