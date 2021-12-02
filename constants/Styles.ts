import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import Colors from "./Colors";

export const MainHeaderStyle: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
