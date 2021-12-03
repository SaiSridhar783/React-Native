import * as React from "react";
import { Alert, Button, FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { productActions } from "../../store/productSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootDrawerScreenProps } from "../../types";

interface IUserProductsScreenProps {}

const UserProductsScreen: React.FC<
	IUserProductsScreenProps & RootDrawerScreenProps<"UserProducts">
> = (props) => {
	const userProducts = useReduxSelector(
		(state) => state.product.userProducts
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

export default UserProductsScreen;
