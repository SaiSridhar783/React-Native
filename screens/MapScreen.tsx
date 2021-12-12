import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

interface IMapScreenProps {}

const MapScreen: React.FC<IMapScreenProps & RootStackScreenProps<"Map">> = (
	props
) => {
	return (
		<View>
			<Text>Map Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default MapScreen;
