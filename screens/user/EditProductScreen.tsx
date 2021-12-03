import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootDrawerScreenProps } from "../../types";

interface IEditProductScreenProps {}

const EditProductScreen: React.FC<
	IEditProductScreenProps & RootDrawerScreenProps<"EditProduct">
> = (props) => {
	const productId = props.route.params.productId;

	return (
		<View>
			<Text>{productId}</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default EditProductScreen;
