import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Button,
	Text,
	ActivityIndicator,
	Alert,
} from "react-native";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import ERRORS from "../../constants/errors.json";
import useFormReducer from "../../hooks/useFormReducer";
import { authActions } from "../../store/authSlice";
import { useReduxDispatch, useReduxSelector } from "../../store/store";

interface IAuthScreenProps {}

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const AuthScreen: React.FC<IAuthScreenProps> = (props) => {
	const dispatch = useReduxDispatch();
	/* Input Field Values */
	const initialState = {
		inputValues: {
			email: "",
			password: "",
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	};

	const [hookState, inputChangeHandler] = useFormReducer(initialState);
	/* End */

	const [loginMode, setLoginMode] = React.useState(false);
	const signupHandler = () => {
		if (loginMode) {
			dispatch(authActions.login(hookState.inputValues));
		} else {
			dispatch(authActions.signup(hookState.inputValues));
		}
	};

	const { isLoading, error } = useReduxSelector((state) => state.auth);

	React.useEffect(() => {
		if (error) {
			Alert.alert(
				// @ts-ignore
				ERRORS[error]?.title
					?.replace(/([a-z]{1})(\-)([a-z]{1})/g, "$1 $3")
					?.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
						letter.toUpperCase()
					), // @ts-ignore
				ERRORS[error]?.message
			);
		}
	}, [error]);

	return (
		<View style={styles.screen}>
			<LinearGradient
				colors={["#b4b3ff", "#c6d7ff"]}
				style={styles.gradient}
			>
				<Card style={{ ...styles.authContainer }}>
					<ScrollView>
						<Input
							id="email"
							label="E-mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter a valid email"
							initialValue=""
							initiallyValid={false}
							onInputChange={inputChangeHandler}
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							required
							secureTextEntry
							minLength={8}
							autoCapitalize="none"
							errorText="Please enter a valid password"
							initialValue=""
							initiallyValid={false}
							onInputChange={inputChangeHandler}
							style={{ marginBottom: 10 }}
						/>
						{/* {error && (
							<View style={styles.errorContainer}>
								<Text style={styles.errorText}>{error}</Text>
							</View>
						)} */}
						{isLoading ? (
							<ActivityIndicator
								size="small"
								color={Colors.primary}
							/>
						) : (
							<Button
								title={loginMode ? "Login" : "Sign Up"}
								color={Colors.primary}
								onPress={signupHandler}
							/>
						)}
						<View style={styles.switch}>
							<Text style={styles.switchText}>
								{loginMode ? "Don't" : "Already"} have an
								account?&nbsp;
							</Text>
							<Button
								title={!loginMode ? "Login" : "Create One"}
								onPress={() => {
									setLoginMode((prev) => !prev);
								}}
								color="green"
							/>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	authContainer: {
		width: "80%",
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
		borderRadius: 5,
		backgroundColor: "#e7e2ff",
	},
	screen: {
		flex: 1,
	},
	switch: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	switchText: {
		fontFamily: "nunito",
	},
	gradient: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		marginVertical: 5,
		alignItems: "center",
	},
	errorText: {
		fontFamily: "nunito-bold",
		color: "red",
	},
});

export default AuthScreen;
