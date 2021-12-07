// @ts-nocheck
import * as React from "react";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

export default function useFormReducer<
	T extends { inputValues: object; inputValidities: object }
>(initialState: T) {
	const formReducer = (
		state: T,
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

	return [hookState, inputChangeHandler];
}
