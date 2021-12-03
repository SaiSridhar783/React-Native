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
	RootDrawerParamList,
	RootStackParamList,
	RootTabParamList,
} from "../types";
import Colors from "../constants/Colors";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { MainHeaderStyle } from "../constants/Styles";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrdersScreen from "../screens/shop/OrdersScreen";

export default function Navigation() {
	return (
		<NavigationContainer>
			<DrawerNavigator />
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
function DrawerBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{ drawerActiveTintColor: Colors.primary }}
		>
			<Drawer.Screen
				name="Products"
				component={RootNavigator}
				options={{
					headerShown: false,
					drawerIcon: (props) => (
						<DrawerBarIcon name="shopping-bag" {...props} />
					),
				}}
			/>
			<Drawer.Screen
				name="Orders"
				component={OrdersScreen}
				options={{
					...Object.assign(MainHeaderStyle),
					drawerIcon: (config) => (
						<DrawerBarIcon name="list" {...config} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}
