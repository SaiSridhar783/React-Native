import * as React from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import { orderActions } from "../../store/orderSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";

interface IOrdersScreenProps {}

const OrdersScreen: React.FC<IOrdersScreenProps> = (props) => {
	const { orders, isLoading, error } = useReduxSelector(
		(state) => state.order
	);
	const dispatch = useReduxDispatch();

	React.useEffect(() => {
		dispatch(orderActions.fetchOrders());
	}, []);

	React.useEffect(() => {
		if (error) {
			Alert.alert(error);
		}
	}, [error]);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (orders.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>
					No Orders Found, maybe it's time for your first order?
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={orders}
			renderItem={(itemData) => (
				<OrderItem
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
					items={itemData.item.items}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrdersScreen;
