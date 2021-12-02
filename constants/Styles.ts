import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import Colors from "./Colors";

export const MainHeaderStyle: NativeStackNavigationOptions = {
	headerTitleAlign: "center",
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
