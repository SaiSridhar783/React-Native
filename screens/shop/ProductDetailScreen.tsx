import * as React from "react";
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Image,
	Button,
} from "react-native";
import Colors from "../../constants/Colors";
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
		<ScrollView>
			<Image
				source={{ uri: selectedProduct?.imageUrl }}
				style={styles.image}
			/>
			<View style={styles.actions}>
				<Button
					title="Add to cart"
					onPress={() => {}}
					color={Colors.primary}
				/>
			</View>
			<Text style={styles.price}>
				${selectedProduct?.price.toFixed(2)}
			</Text>
			<Text style={styles.description}>
				{selectedProduct?.description}
			</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 300,
	},
	price: {
		color: "#888",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 20,
		fontFamily: "nunito-black",
	},
	description: {
		fontSize: 14,
		padding: 20,
		lineHeight: 24,
		fontFamily: "nunito-semibold",
	},
	actions: {
		marginVertical: 10,
		alignItems: "center",
	},
});

export default ProductDetailScreen;
