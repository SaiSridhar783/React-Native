import * as React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import { useReduxSelector } from "../../store/store";

interface IOrdersScreenProps {}

const OrdersScreen: React.FC<IOrdersScreenProps> = (props) => {
	const orders = useReduxSelector((state) => state.order.orders);

	return (
		<FlatList
			data={orders}
			renderItem={(itemData) => (
				<OrderItem
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
				/>
			)}
		/>
	);
};

export default OrdersScreen;
