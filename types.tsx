/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	ProductsOverview: NavigatorScreenParams<RootTabParamList> | undefined;
	ProductDetails:
		| (ProductDetailsType & NavigatorScreenParams<RootTabParamList>)
		| undefined;
	Cart: NavigatorScreenParams<RootTabParamList> | undefined;
	Orders: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type ProductDetailsType = {
	productId: string;
};

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;

export type RootDrawerParamList = {
	Orders: DrawerScreenProps<RootStackParamList>;
	Products: DrawerScreenProps<RootStackParamList>;
};
