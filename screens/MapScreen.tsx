import * as React from "react";
import { Alert, Platform } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { LatLng, MapEvent, Marker } from "react-native-maps";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

interface IMapScreenProps {}

const MapScreen: React.FC<IMapScreenProps & RootStackScreenProps<"Map">> = (
	props
) => {
	const [selectedLocation, setSelectedLocation] =
		React.useState<LatLng | null>(null);
	const mapRegion = {
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = (event: MapEvent) => {
		setSelectedLocation(event.nativeEvent.coordinate);
	};

	let markerCoords: LatLng | undefined;

	if (selectedLocation) {
		markerCoords = { ...selectedLocation };
	}

	const savePickedLocationHandler = React.useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				"No location selected",
				"Please select a location first"
			);
			return;
		}
		props.navigation.navigate("NewPlace", {
			params: { coordinates: selectedLocation },
			screen: "NewPlace",
		});
	}, [selectedLocation]);

	React.useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerButton}
					onPress={savePickedLocationHandler}
				>
					<Text style={styles.headerButtonText}>Save</Text>
				</TouchableOpacity>
			),
		});
	}, [savePickedLocationHandler]);

	return (
		<MapView
			style={styles.map}
			region={mapRegion}
			onPress={selectLocationHandler}
		>
			{markerCoords && (
				<Marker
					title="Picked Location"
					coordinate={markerCoords}
				></Marker>
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	headerButtonText: {
		fontSize: 16,
		color: Platform.OS === "android" ? "white" : Colors.primary,
		fontFamily: "nunito-semibold",
	},
	headerButton: {
		marginHorizontal: 20,
	},
});

export default MapScreen;
