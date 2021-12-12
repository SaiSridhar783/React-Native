import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

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
		<PlaceStack.Navigator>
			<PlaceStack.Screen
				name="Places"
				component={PlacesListScreen}
				options={({ navigation }) => ({
					title: "All Places",
				})}
			/>
			<PlaceStack.Screen
				name="PlaceDetail"
				component={PlaceDetailScreen}
			/>
			<PlaceStack.Screen name="NewPlace" component={NewPlaceScreen} />
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
