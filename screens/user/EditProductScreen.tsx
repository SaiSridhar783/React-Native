import * as React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import CreateProduct from "../../components/UI/CreateProduct";
import { productActions } from "../../store/productSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootDrawerScreenProps } from "../../types";

interface IEditProductScreenProps {}

const EditProductScreen: React.FC<
	IEditProductScreenProps & RootDrawerScreenProps<"EditProduct">
> = (props) => {
	const proId = React.useRef(props.route.params.productId);
	const editingProduct = useReduxSelector((state) =>
		state.product.userProducts.find((p) => p.id === proId.current)
	);
	const dispatch = useReduxDispatch();

	const [title, setTitle] = React.useState(editingProduct?.title || "");
	const [description, setDescription] = React.useState(
		editingProduct?.description || ""
	);
	const [price, setPrice] = React.useState(editingProduct?.price || "");
	const [imageUrl, setImageUrl] = React.useState(
		editingProduct?.imageUrl || ""
	);
	const [hasSubmitted, setHasSubmitted] = React.useState(false);

	const editProductHandler = () => {
		setHasSubmitted(true);
	};

	React.useEffect(() => {
		if (hasSubmitted) {
			editingProduct
				? dispatch(
						productActions.updateProduct({
							id: proId.current!,
							title,
							imageUrl,
							description,
						})
				  )
				: dispatch(
						productActions.createProduct({
							title,
							description,
							price: +price,
							imageUrl,
						})
				  );
			setHasSubmitted(false);
			props.navigation.goBack();
		}
	});

	React.useEffect(() => {
		props.navigation.setOptions({
			title: props.route.params.productId
				? "Edit Product"
				: "Add Product",
			headerRight: () => (
				<CreateProduct
					navigation={props.navigation}
					title="Save"
					iconName="check"
					onPress={editProductHandler}
				/>
			),
		});
	}, []);

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={(text) => setTitle(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput
						style={styles.input}
						value={imageUrl}
						onChangeText={(text) => setImageUrl(text)}
					/>
				</View>
				{!editingProduct && (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={price?.toString()}
							keyboardType="numeric"
							onChangeText={(text) => setPrice(+text)}
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={description}
						onChangeText={(text) => setDescription(text)}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	formControl: {
		width: "100%",
	},
	label: {
		fontFamily: "nunito-black",
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		fontSize: 18,
		fontFamily: "nunito",
	},
	form: {
		margin: 20,
	},
});

export default EditProductScreen;
