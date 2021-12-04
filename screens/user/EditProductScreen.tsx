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

	const textChangeHandler = (
		inputIdentifier: keyof typeof initialState.inputValues,
		text: string
	) => {
		let isValid = false;
		if (text.trim().length > 0) {
			isValid = true;
		}

		hookDispatch({
			type: FORM_INPUT_UPDATE,
			payload: { value: text, isValid, input: inputIdentifier },
		});
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={hookState.inputValues.title}
						onChangeText={textChangeHandler.bind(null, "title")}
						autoCapitalize="sentences"
						autoCorrect
						returnKeyType="next"
					/>
					{!hookState.inputValidities.title && hasSubmitted && (
						<Text>Title is too short!!</Text>
					)}
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput
						style={styles.input}
						value={hookState.inputValues.imageUrl}
						onChangeText={textChangeHandler.bind(null, "imageUrl")}
					/>
				</View>
				{!editingProduct && (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={hookState.inputValues.price.toString()}
							keyboardType="decimal-pad"
							onChangeText={textChangeHandler.bind(null, "price")}
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={hookState.inputValues.description}
						onChangeText={textChangeHandler.bind(
							null,
							"description"
						)}
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
