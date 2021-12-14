import * as React from "react";
import {
	ActivityIndicator,
	Button,
	FlatList,
	View,
	StyleSheet,
	Text,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { cartActions } from "../../store/cartSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootStackScreenProps } from "../../types";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { productActions } from "../../store/productSlice";

interface IProductsOverviewScreenProps {}

const ProductsOverviewScreen: React.FC<
	IProductsOverviewScreenProps & RootStackScreenProps<"ProductsOverview">
> = (props) => {
	const cartItemCount = useReduxSelector((state) => state.cart.itemCount);
	const products = useReduxSelector((state) => state.product);
	const dispatch = useReduxDispatch();

	React.useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Cart" // @ts-ignore
						count={cartItemCount.toString()}
						iconName="shopping-cart"
						onPress={() => {
							props.navigation.navigate("Cart");
						}}
					/>
				</HeaderButtons>
			),
		});

		/* props.navigation.addListener("focus", () => {
			dispatch(productActions.fetchProducts());
		}); */
	}, [cartItemCount]);

	React.useEffect(() => {
		dispatch(productActions.fetchProducts());
	}, []);

	const viewDetailsHandler = (id: string) => {
		props.navigation.navigate("ProductDetails", {
			productId: id,
			screen: "TabOne",
		});
	};

	if (
		!products.isLoading &&
		(products.error || products.availableProducts.length === 0)
	) {
		return (
			<View style={styles.centered}>
				<Text>
					{products.error || "No Products Found. Start Adding Some!"}
				</Text>
				<Button
					title="Try Again"
					onPress={() => {
						dispatch(productActions.fetchProducts());
					}}
					color={Colors.primary}
				/>
			</View>
		);
	}

	return products.isLoading && !products.hasLoaded ? (
		<View style={styles.centered}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	) : (
		<FlatList
			onRefresh={() => {
				dispatch(productActions.fetchProducts());
			}}
			refreshing={products.isLoading}
			data={products.availableProducts}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={viewDetailsHandler.bind(null, itemData.item.id)}
				>
					<Button
						color={Colors.primary}
						title="View Details"
						onPress={viewDetailsHandler.bind(
							null,
							itemData.item.id
						)}
					/>
					<Button
						color={Colors.primary}
						title="To Cart"
						onPress={() => {
							dispatch(cartActions.addProduct(itemData.item));
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
