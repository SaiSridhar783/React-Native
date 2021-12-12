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
	Places: NavigatorScreenParams<RootTabParamList> | undefined;
	PlaceDetail: NavigatorScreenParams<RootTabParamList> | undefined;
	NewPlace: NavigatorScreenParams<RootTabParamList> | undefined;
	Map: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
};
