import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TextInputProps,
} from "react-native";

interface IInputProps {
	id: "title" | "imageUrl" | "description" | "price";
	label: string;
	errorText: string;
	initialValue: string;
	initiallyValid: boolean;
	onInputChange: (
		inputIndentifier: "title" | "imageUrl" | "description" | "price",
		value: string,
		isValid: boolean
	) => void;
	required?: boolean;
	email?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

interface IInputState {
	value: string;
	isValid: boolean;
	touched: boolean;
}

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (
	state: IInputState,
	action: { type: string; payload?: any }
) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.payload.value,
				isValid: action.payload.isValid,
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true,
			};
		default:
			return state;
	}
};

const Input: React.FC<IInputProps & TextInputProps> = (props) => {
	const initialState = {
		value: props.initialValue || "",
		isValid: props.initiallyValid,
		touched: false,
	};
	const [inputState, dispatch] = React.useReducer(inputReducer, initialState);

	const textChangeHandler = (text: string) => {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.max != null && +text > props.max) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}
		dispatch({
			type: INPUT_CHANGE,
			payload: { value: text, isValid },
		});
	};

	const { onInputChange, id } = props;

	React.useEffect(() => {
		if (inputState.touched)
			onInputChange(id, inputState.value, inputState.isValid);
	}, [inputState, onInputChange, id]);

	const lostFocusHandler = () => {
		dispatch({
			type: INPUT_BLUR,
		});
	};

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				{...props}
				style={styles.input}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
			/>
			{!inputState.isValid && <Text>{props.errorText}</Text>}
		</View>
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
});

export default Input;
