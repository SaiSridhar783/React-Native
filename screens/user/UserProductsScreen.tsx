import * as React from "react";
import { Button, FlatList } from "react-native";
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
						onPress={() => {
							dispatch(
								productActions.deleteProduct(itemData.item.id)
							);
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

export default UserProductsScreen;
