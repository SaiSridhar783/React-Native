/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { MainHeaderStyle } from "../constants/Styles";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

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
const ProductStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<ProductStack.Navigator screenOptions={MainHeaderStyle}>
			<ProductStack.Screen
				name="ProductsOverview"
				component={ProductsOverviewScreen}
				options={{ title: "All Products" }}
			/>
			<ProductStack.Screen
				name="ProductDetails"
				component={ProductDetailScreen}
			/>
			<ProductStack.Screen name="Cart" component={CartScreen} />
		</ProductStack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
