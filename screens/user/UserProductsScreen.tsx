import * as React from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { productActions } from "../../store/productSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootDrawerScreenProps } from "../../types";

interface IUserProductsScreenProps {}

const UserProductsScreen: React.FC<
	IUserProductsScreenProps & RootDrawerScreenProps<"UserProducts">
> = (props) => {
	const { userProducts, isLoading, error } = useReduxSelector(
		(state) => state.product
	);
	const dispatch = useReduxDispatch();

	const editProductHandler = (id: string) => {
		props.navigation.navigate("EditProduct", {
			productId: id,
			screen: "TabOne",
		});
	};

	const deleteHandler = (id: string) => {
		Alert.alert(
			"Are you sure?",
			"Do you really want to delete your product?",
			[
				{ text: "No", style: "default" },
				{
					text: "Yes",
					style: "destructive",
					onPress: () => {
						dispatch(productActions.deleteProduct(id));
					},
				},
			]
		);
	};

	if (error) {
		Alert.alert("Something went wrong...", error);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (userProducts.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No Products Found, maybe start adding some?</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={userProducts}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					price={itemData.item.price}
					image={itemData.item.imageUrl}
					onSelect={() => {
						editProductHandler(itemData.item.id);
					}}
				>
					<Button
						color={Colors.primary}
						title="Edit"
						onPress={() => {
							editProductHandler(itemData.item.id);
						}}
					/>
					<Button
						color={Colors.primary}
						title="Delete"
						onPress={deleteHandler.bind(null, itemData.item.id)}
					/>
				</ProductItem>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UserProductsScreen;
