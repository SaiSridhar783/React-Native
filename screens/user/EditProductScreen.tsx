import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import CreateProduct from "../../components/UI/CreateProduct";
import Input from "../../components/UI/Input";
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

	const formReducer = (
		state: typeof initialState,
		action: {
			type: string;
			payload: {
				value: string;
				isValid: boolean;
				input: keyof typeof initialState.inputValues;
			};
		}
	) => {
		switch (action.type) {
			case FORM_INPUT_UPDATE:
				const updatedValues = {
					...state.inputValues,
					[action.payload.input]: action.payload.value,
				};
				const updatedValidities = {
					...state.inputValidities,
					[action.payload.input]: action.payload.isValid,
				};
				let updatedFormIsValid = true;
				for (const key in updatedValidities) {
					updatedFormIsValid =
						// @ts-ignore
						updatedFormIsValid && updatedValidities[key];
				}
				return {
					formIsValid: updatedFormIsValid,
					inputValues: updatedValues,
					inputValidities: updatedValidities,
				};
			default:
				return state;
		}
	};

	const [hookState, hookDispatch] = React.useReducer(
		formReducer,
		initialState
	);
	/* End */
	const [hasSubmitted, setHasSubmitted] = React.useState(false);

	const editProductHandler = () => {
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
			editingProduct
				? dispatch(
						productActions.updateProduct({
							id: proId.current!,
							title: hookState.inputValues.title,
							imageUrl: hookState.inputValues.imageUrl,
							description: hookState.inputValues.description,
						})
				  )
				: dispatch(
						productActions.createProduct({
							title: hookState.inputValues.title,
							description: hookState.inputValues.description,
							price: +hookState.inputValues.price,
							imageUrl: hookState.inputValues.imageUrl,
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

	const inputChangeHandler = React.useCallback(
		(
			inputIdentifier: keyof typeof initialState.inputValues,
			inputValue: string,
			isValid: boolean
		) => {
			hookDispatch({
				type: FORM_INPUT_UPDATE,
				payload: { value: inputValue, isValid, input: inputIdentifier },
			});
		},
		[hookDispatch]
	);

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
						initialValue=""
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
