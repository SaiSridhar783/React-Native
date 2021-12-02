import * as React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { cartActions } from "../../store/cartSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootStackScreenProps } from "../../types";

interface IProductsOverviewScreenProps {}

const ProductsOverviewScreen: React.FC<
	IProductsOverviewScreenProps & RootStackScreenProps<"ProductsOverview">
> = (props) => {
	const products = useReduxSelector(
		(state) => state.product.availableProducts
	);
	const dispatch = useReduxDispatch();

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onViewDetail={() => {
						props.navigation.navigate("ProductDetails", {
							productId: itemData.item.id,
							screen: "TabOne",
						});
					}}
					onAddToCart={() => {
						dispatch(cartActions.addProduct(itemData.item));
					}}
				/>
			)}
		/>
	);
};

export default ProductsOverviewScreen;
