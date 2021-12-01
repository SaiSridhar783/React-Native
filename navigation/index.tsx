/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Platform } from "react-native";

import Colors from "../constants/Colors";
import { MainHeaderStyle } from "../constants/Styles";
import CategoriesMealsScreen from "../screens/CategoriesMealsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./MealsNavigator";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			{/* {Platform.OS === "android" ? (
				<MaterialBottomTabNavigator />
			) : (
				<BottomTabNavigator />
			)} */}
			<DrawerNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const MealsStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<MealsStack.Navigator screenOptions={Object.assign(MainHeaderStyle)}>
			<MealsStack.Screen
				name="Categories"
				component={CategoriesScreen}
				options={{ title: "Meal Categories" }}
			/>
			<MealsStack.Screen
				name="CategoryMeals"
				component={CategoriesMealsScreen}
			/>
			<MealsStack.Screen
				name="MealDetails"
				component={MealDetailsScreen}
			/>
			<MealsStack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
			{/* <MealsStack.Group screenOptions={{ presentation: "modal" }}>
				<MealsStack.Screen name="Modal" component={ModalScreen} />
			</MealsStack.Group> */}
		</MealsStack.Navigator>
	);
}

const FavStack = createNativeStackNavigator<RootStackParamList>();

function FavRootNavigator() {
	return (
		<FavStack.Navigator screenOptions={Object.assign(MainHeaderStyle)}>
			<FavStack.Screen name="Favourites" component={FavouritesScreen} />
			<FavStack.Screen name="MealDetails" component={MealDetailsScreen} />
		</FavStack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName="Meals"
			screenOptions={{
				tabBarActiveTintColor: Colors.accentColor,
				tabBarStyle: {
					backgroundColor: Colors.primaryColor,
				},
			}}
		>
			<BottomTab.Screen
				name="Meals"
				component={RootNavigator}
				options={({ navigation }: RootTabScreenProps<"Meals">) => ({
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="restaurant" color={color} />
					),
					headerShown: false,
				})}
			/>
			<BottomTab.Screen
				name="FavouritesTab"
				component={FavRootNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="star" color={color} />
					),
					headerShown: false,
					title: "Favourites!",
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof Ionicons>["name"];
	color: string;
}) {
	return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * Material Bottom Tab Navigator
 * For Android
 */

const MaterialBottomTab = createMaterialBottomTabNavigator<RootTabParamList>();

function MaterialBottomTabNavigator() {
	return (
		<MaterialBottomTab.Navigator initialRouteName="Meals" shifting={true}>
			<MaterialBottomTab.Screen
				name="Meals"
				component={RootNavigator}
				options={({ navigation }: RootTabScreenProps<"Meals">) => {
					return {
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="restaurant" color={color} />
						),
						tabBarColor: Colors.primaryColor,
					};
				}}
			/>
			<MaterialBottomTab.Screen
				name="FavouritesTab"
				component={FavRootNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="star" color={color} />
					),
					tabBarColor: Colors.accentColor,
					title: "Favourites",
				}}
			/>
		</MaterialBottomTab.Navigator>
	);
}

/**
 * Drawer Navigator
 * https://reactnavigation.org/docs/drawer-navigator
 * */

const DrawNav = createDrawerNavigator<RootStackParamList>();

function DrawerNavigator() {
	return (
		<DrawNav.Navigator
			initialRouteName="Categories"
			screenOptions={{
				...Object.assign(MainHeaderStyle),
				drawerActiveTintColor: Colors.accentColor,
				drawerLabelStyle: {
					fontFamily: "nunito-bold",
				},
			}}
		>
			<DrawNav.Screen
				name="MealsFavs"
				component={BottomTabNavigator}
				options={{ headerShown: false, drawerLabel: "Meals" }}
			/>
			<DrawNav.Screen
				name="Filters"
				component={FiltersScreen}
				options={{ title: "Filter Meals", drawerLabel: "Filters" }}
			/>
		</DrawNav.Navigator>
	);
}
