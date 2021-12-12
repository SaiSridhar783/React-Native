import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

interface IPlaceDetailScreenProps {}

const PlaceDetailScreen: React.FC<
	IPlaceDetailScreenProps & RootStackScreenProps<"PlaceDetail">
> = (props) => {
	React.useEffect(() => {
		props.navigation.setOptions({
			title: props.route.params!.params!.placeTitle,
		});
		return () => {};
	}, []);
	return (
		<View>
			<Text>Place Details Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
