import * as React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useReduxSelector } from "../../store/store";

interface IProductsOverviewScreenProps {}

const ProductsOverviewScreen: React.FC<IProductsOverviewScreenProps> = (
	props
) => {
	const products = useReduxSelector(
		(state) => state.product.availableProducts
	);

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onViewDetail={() => {}}
					onAddToCart={() => {}}
				/>
			)}
		/>
	);
};

export default ProductsOverviewScreen;
