/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import { MainHeaderStyle } from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import CategoriesMealsScreen from "../screens/CategoriesMealsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import ModalScreen from "../screens/ModalScreen";
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
			<BottomTabNavigator />
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
			<MealsStack.Group screenOptions={{ presentation: "modal" }}>
				<MealsStack.Screen name="Modal" component={ModalScreen} />
			</MealsStack.Group>
		</MealsStack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Meals"
			screenOptions={{
				tabBarActiveTintColor: Colors.accentColor,
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
				name="Favourites"
				component={FavouritesScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="star" color={color} />
					),
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
