import React from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
	style?: object;
}

const Input = (props: InputProps) => {
	return (
		<View>
			<TextInput {...props} style={{ ...styles.input, ...props.style }} />
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: "gray",
		borderBottomWidth: 1,
		marginVertical: 10,
	},
});

export default Input;
