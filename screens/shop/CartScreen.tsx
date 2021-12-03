import * as React from "react";
import { FlatList, Button, View, Text, StyleSheet } from "react-native";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { cartActions } from "../../store/cartSlice";
import { orderActions } from "../../store/orderSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootStackScreenProps } from "../../types";

interface ICartScreenProps {}

const CartScreen: React.FC<ICartScreenProps & RootStackScreenProps<"Cart">> = (
	props
) => {
	const cartItems = useReduxSelector((state) => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum,
			});
		}
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		);
	});
	const cartTotalAmount = useReduxSelector((state) => state.cart.totalAmount);
	const dispatch = useReduxDispatch();

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:&nbsp;
					<Text style={styles.amount}>
						${Math.round(cartTotalAmount * 100) / 100}
					</Text>
				</Text>
				<Button
					color={Colors.accent}
					title="Checkout"
					disabled={cartItems.length === 0}
					onPress={() => {
						dispatch(
							orderActions.addOrder({
								amount: cartTotalAmount,
								items: cartItems,
							})
						);
						//dispatch(cartActions.clearCart());
						props.navigation.popToTop();
						props.navigation.navigate("Orders");
					}}
				/>
			</Card>
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={(itemData) => (
					<CartItem
						quantity={itemData.item.quantity}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						onRemove={() => {
							dispatch(
								cartActions.removeProduct(
									itemData.item.productId
								)
							);
						}}
						deletable
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 10,
		marginBottom: 20,
		backgroundColor: "white",
	},
	summaryText: {
		fontFamily: "nunito-bold",
		fontSize: 18,
	},
	amount: {
		color: Colors.primary,
	},
});

export default CartScreen;
