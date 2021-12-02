import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	TouchableNativeFeedback,
} from "react-native";
import Colors from "../../constants/Colors";

interface IProductItemProps {
	image: string;
	title: string;
	price: number;
	onViewDetail: () => void;
	onAddToCart: () => void;
}

const ProductItem: React.FC<IProductItemProps> = (props) => {
	return (
		<View style={styles.product}>
			<TouchableNativeFeedback onPress={props.onViewDetail} useForeground>
				<View>
					<Image style={styles.image} source={{ uri: props.image }} />
					<View style={styles.detail}>
						<Text style={styles.title}>{props.title}</Text>
						<Text style={styles.price}>
							${props.price.toFixed(2)}
						</Text>
					</View>
					<View style={styles.actions}>
						<Button
							color={Colors.primary}
							title="View Details"
							onPress={props.onViewDetail}
						/>
						<Button
							color={Colors.primary}
							title="To Cart"
							onPress={props.onAddToCart}
						/>
					</View>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	product: {
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "whitesmoke",
		height: 300,
		margin: 20,
	},
	image: {
		width: "100%",
		height: "60%",
	},
	title: {
		fontSize: 18,
		marginVertical: 4,
		fontFamily: "nunito-extrabold",
	},
	price: {
		fontSize: 14,
		color: "#888",
		fontFamily: "nunito-semibold",
		marginVertical: 4,
	},
	detail: {
		alignItems: "center",
		height: "15%",
		paddingHorizontal: 10,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "25%",
		paddingHorizontal: 20,
	},
});

export default ProductItem;
