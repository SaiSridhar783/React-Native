import * as React from "react";
import { FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { cartActions } from "../../store/cartSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootStackScreenProps } from "../../types";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

interface IProductsOverviewScreenProps {}

const ProductsOverviewScreen: React.FC<
	IProductsOverviewScreenProps & RootStackScreenProps<"ProductsOverview">
> = (props) => {
	const products = useReduxSelector(
		(state) => state.product.availableProducts
	);
	const dispatch = useReduxDispatch();

	React.useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Cart"
						iconName="shopping-cart"
						onPress={() => {
							props.navigation.navigate("Cart");
						}}
					/>
				</HeaderButtons>
			),
		});
		return () => {};
	}, []);

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
