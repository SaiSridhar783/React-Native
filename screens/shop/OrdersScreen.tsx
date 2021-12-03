import * as React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useReduxSelector } from "../../store/store";

interface IOrdersScreenProps {}

const OrdersScreen: React.FC<IOrdersScreenProps> = (props) => {
	const orders = useReduxSelector((state) => state.order.orders);

	return (
		<FlatList
			data={orders}
			renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
		/>
	);
};

export default OrdersScreen;
