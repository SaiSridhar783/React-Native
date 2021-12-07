import * as React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import CreateProduct from "../../components/UI/CreateProduct";
import Input from "../../components/UI/Input";
import useFormReducer from "../../hooks/useFormReducer";
import { productActions } from "../../store/productSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { RootDrawerScreenProps } from "../../types";

interface IEditProductScreenProps {}

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const EditProductScreen: React.FC<
	IEditProductScreenProps & RootDrawerScreenProps<"EditProduct">
> = (props) => {
	const proId = React.useRef(props.route.params.productId);
	const editingProduct = useReduxSelector((state) =>
		state.product.userProducts.find((p) => p.id === proId.current)
	);
	const dispatch = useReduxDispatch();

	/* Input Field Values */
	const initialState = {
		inputValues: {
			title: editingProduct?.title || "",
			description: editingProduct?.description || "",
			price: editingProduct?.price || "",
			imageUrl: editingProduct?.imageUrl || "",
		},
		inputValidities: {
			title: editingProduct ? true : false,
			description: editingProduct ? true : false,
			price: editingProduct ? true : false,
			imageUrl: editingProduct ? true : false,
		},
		formIsValid: editingProduct ? true : false,
	};

	const [hookState, inputChangeHandler] = useFormReducer(initialState);
	/* End */
	const [hasSubmitted, setHasSubmitted] = React.useState(false);

	const editProductHandler = () => {
		/* Alert.alert("Are you sure?", undefined, [
			{
				text: "Yes",
				style: "destructive",
				onPress: () => {
					setHasSubmitted(true);
				},
			},
			{ text: "No", style: "cancel" },
		]); */
		setHasSubmitted(true);
	};

	React.useEffect(() => {
		if (hasSubmitted) {
			if (!hookState.formIsValid) {
				Alert.alert(
					"Invalid Input!",
					"Please check the errors in the form.",
					[
						{
							text: "Okay",
							style: "destructive",
							onPress: () => setHasSubmitted(false),
						},
					]
				);
				return;
			}

			async function disp() {
				if (editingProduct) {
					await dispatch(
						productActions.updateProduct({
							id: proId.current!,
							title: hookState.inputValues.title,
							imageUrl: hookState.inputValues.imageUrl,
							description: hookState.inputValues.description,
						})
					);
				} else
					await dispatch(
						productActions.createProduct({
							title: hookState.inputValues.title,
							description: hookState.inputValues.description,
							price: +hookState.inputValues.price,
							imageUrl: hookState.inputValues.imageUrl,
						})
					);
			}

			disp();
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
				<Input
					id="title"
					label="Title"
					errorText="Title is too short!"
					autoCapitalize="sentences"
					autoCorrect
					returnKeyType="next"
					onInputChange={inputChangeHandler}
					initialValue={editingProduct?.title || ""}
					initiallyValid={!!editingProduct}
					required
				/>
				<Input
					id="imageUrl"
					label="Image URL"
					errorText="Please enter a valid image URL!"
					returnKeyType="next"
					onInputChange={inputChangeHandler}
					initialValue={editingProduct?.imageUrl || ""}
					initiallyValid={!!editingProduct}
					required
				/>
				{!editingProduct && (
					<Input
						id="price"
						label="Price"
						errorText="Please enter a valid price!"
						keyboardType="decimal-pad"
						returnKeyType="next"
						onInputChange={inputChangeHandler}
						initialValue={0}
						initiallyValid
						required
						min={0.1}
					/>
				)}
				<Input
					id="description"
					label="Description"
					errorText="Please enter a valid description!"
					autoCapitalize="sentences"
					autoCorrect
					multiline
					numberOfLines={3}
					onInputChange={inputChangeHandler}
					initialValue={editingProduct?.description || ""}
					initiallyValid={!!editingProduct}
					required
					minLength={10}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
});

export default EditProductScreen;
