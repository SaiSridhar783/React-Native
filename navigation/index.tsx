import * as React from "react";
import { Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

export default function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const PlaceStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<PlaceStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor:
						Platform.OS === "android" ? Colors.primary : "",
				},
				headerTintColor:
					Platform.OS === "android" ? "white" : Colors.primary,
				headerTitleStyle: {
					fontFamily: "nunito-extrabold",
				},
				headerTitleAlign: "center",
				animation: "fade_from_bottom",
			}}
		>
			<PlaceStack.Screen
				name="Places"
				component={PlacesListScreen}
				options={({ navigation }) => ({
					title: "All Places",
					headerRight: () => (
						<HeaderButtons
							HeaderButtonComponent={CustomHeaderButton}
						>
							<Item
								title="Add Place"
								iconName="plus"
								onPress={() => {
									navigation.navigate("NewPlace");
								}}
							/>
						</HeaderButtons>
					),
				})}
			/>
			<PlaceStack.Screen
				name="PlaceDetail"
				component={PlaceDetailScreen}
			/>
			<PlaceStack.Screen
				name="NewPlace"
				component={NewPlaceScreen}
				options={{ title: "Add place" }}
			/>
			<PlaceStack.Screen name="Map" component={MapScreen} />
		</PlaceStack.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function DrawerBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
