/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
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
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import MenuDrawer from "../components/UI/MenuDrawer";
import CreateProduct from "../components/UI/CreateProduct";

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
				options={({ navigation }) => ({
					title: "All Products",
					headerLeft: () => <MenuDrawer navigation={navigation} />,
				})}
			/>
			<ProductStack.Screen
				name="ProductDetails"
				component={ProductDetailScreen}
			/>
			<ProductStack.Screen name="Cart" component={CartScreen} />
		</ProductStack.Navigator>
	);
}

const AdminStack = createNativeStackNavigator<RootDrawerParamList>();

function AdminNavigator() {
	return (
		<AdminStack.Navigator screenOptions={MainHeaderStyle}>
			<AdminStack.Screen
				name="UserProducts"
				component={UserProductsScreen}
				options={({ navigation }) => ({
					title: "Your Products",
					headerLeft: () => <MenuDrawer navigation={navigation} />,
					headerRight: () => (
						<CreateProduct navigation={navigation} />
					),
				})}
			/>
			<AdminStack.Screen
				name="EditProduct"
				component={EditProductScreen}
				options={({ navigation }) => ({
					title: "Edit Product",
					headerLeft: () => <MenuDrawer navigation={navigation} />,
				})}
			/>
		</AdminStack.Navigator>
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

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{
				drawerActiveTintColor: Colors.primary,
				headerShown: false,
			}}
		>
			<Drawer.Screen
				name="Products"
				component={RootNavigator}
				options={{
					drawerIcon: (props) => (
						<DrawerBarIcon name="shopping-bag" {...props} />
					),
				}}
			/>
			<Drawer.Screen
				name="Orders"
				component={OrdersScreen}
				options={{
					headerShown: true,
					...Object.assign(MainHeaderStyle),
					drawerIcon: (config) => (
						<DrawerBarIcon name="list" {...config} />
					),
				}}
			/>
			<Drawer.Screen
				name="Admin"
				component={AdminNavigator}
				options={{
					...Object.assign(MainHeaderStyle),
					drawerIcon: (config) => (
						<DrawerBarIcon name="user" {...config} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}
