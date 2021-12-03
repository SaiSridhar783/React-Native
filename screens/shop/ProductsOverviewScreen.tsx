import * as React from "react";
import { Button, FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { cartActions } from "../../store/cartSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootStackScreenProps } from "../../types";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { DrawerActions } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import MenuDrawer from "../../components/UI/MenuDrawer";

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

	const viewDetailsHandler = (id: string) => {
		props.navigation.navigate("ProductDetails", {
			productId: id,
			screen: "TabOne",
		});
	};

	return (
		<FlatList
			data={products}
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

export default ProductsOverviewScreen;
