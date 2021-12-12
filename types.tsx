import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Places: NavigatorScreenParams<RootNavigateParamList> | undefined;
	PlaceDetail: NavigatorScreenParams<RootNavigateParamList> | undefined;
	NewPlace: NavigatorScreenParams<RootNavigateParamList> | undefined;
	Map: NavigatorScreenParams<RootNavigateParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootNavigateParamList = {
	PlaceDetail: { placeTitle: string; placeId: string };
	Map: undefined;
};
