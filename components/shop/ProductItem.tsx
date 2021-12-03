import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableNativeFeedback,
} from "react-native";
import Card from "../UI/Card";

interface IProductItemProps {
	image: string;
	title: string;
	price: number;
	onSelect: () => void;
}

const ProductItem: React.FC<IProductItemProps> = (props) => {
	return (
		<Card style={styles.product}>
			<TouchableNativeFeedback onPress={props.onSelect} useForeground>
				<View>
					<Image style={styles.image} source={{ uri: props.image }} />
					<View style={styles.detail}>
						<Text style={styles.title}>{props.title}</Text>
						<Text style={styles.price}>
							${props.price.toFixed(2)}
						</Text>
					</View>
					<View style={styles.actions}>{props.children}</View>
				</View>
			</TouchableNativeFeedback>
		</Card>
	);
};

const styles = StyleSheet.create({
	product: {
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
		height: "20%",
		paddingHorizontal: 10,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "20%",
		paddingHorizontal: 20,
	},
});

export default ProductItem;
