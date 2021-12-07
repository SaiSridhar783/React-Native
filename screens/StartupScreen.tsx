import AsyncStorageLib from "@react-native-async-storage/async-storage";
import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import { authActions } from "../store/authSlice";
import { useReduxDispatch } from "../store/store";
import { AuthStackScreenProps } from "../types";

interface IStartupScreenProps {}

const StartupScreen: React.FC<
	IStartupScreenProps & AuthStackScreenProps<"Startup">
> = (props) => {
	const dispatch = useReduxDispatch();

	React.useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorageLib.getItem("userData");
			if (!userData) {
				props.navigation.navigate("Login");
				return;
			}

			const transformedData = JSON.parse(userData);
			const { token, userID, expiryDate } = transformedData;
			const expirationDate = new Date(expiryDate);

			if (expirationDate <= new Date() || !token || !userID) {
				props.navigation.navigate("Login");
				return;
			}

			dispatch(
				authActions.saveCreds({
					main: { token, userID },
					expiryTime: expirationDate.getTime() - new Date().getTime(),
				})
			);
		};
		tryLogin();
	}, []);

	return (
		<View style={styles.screen}>
			<ActivityIndicator color={Colors.primary} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default StartupScreen;
