import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useReduxSelector } from "../../store/store";
import { RootStackScreenProps } from "../../types";

interface IProductDetailScreenProps {}

const ProductDetailScreen: React.FC<
	IProductDetailScreenProps & RootStackScreenProps<"ProductDetails">
> = (props) => {
	const productId = props.route.params?.productId;
	const selectedProduct = useReduxSelector((state) =>
		state.product.availableProducts.find((p) => p.id === productId)
	);

	React.useEffect(() => {
		props.navigation.setOptions({
			title: selectedProduct?.title,
		});
		return () => {};
	}, []);

	return (
		<View>
			<Text>{selectedProduct?.title}</Text>
		</View>
	);
};

export default ProductDetailScreen;
