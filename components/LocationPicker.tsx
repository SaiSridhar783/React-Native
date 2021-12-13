import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Alert,
	Button,
} from "react-native";
import Colors from "../constants/Colors";
import * as LocationAPI from "expo-location";
import MapPreview from "./MapPreview";

interface ILocationPickerProps {}

const LocationPicker: React.FC<ILocationPickerProps> = (props) => {
	const [isFetching, setIsFetching] = React.useState(false);
	const [chosenLocation, setChosenLocation] = React.useState({});

	const verifyPermissions = async () => {
		const result = await LocationAPI.getForegroundPermissionsAsync();
		if (result.status !== "granted") {
			Alert.alert(
				"Insufficient permissions!",
				"You need to grant Location permissions to use this app.",
				[
					{
						text: "Okay",
						onPress: async () => {
							await LocationAPI.requestForegroundPermissionsAsync();
						},
					},
				]
			);

			return false;
		}
		return true;
	};

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		try {
			setIsFetching(true);
			const location: LocationAPI.LocationObject =
				await LocationAPI.getCurrentPositionAsync({
					timeInterval: 5000,
				});

			setChosenLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		} catch (err) {
			Alert.alert(
				"Could not fetch location!",
				"Please try again later or contact the developer.",
				[{ text: "Okay" }]
			);
		}
		setIsFetching(false);
	};

	return (
		<View style={styles.locationPicker}>
			<MapPreview style={styles.mapPreview} location={chosenLocation}>
				{isFetching ? (
					<ActivityIndicator size="large" color={Colors.primary} />
				) : (
					<Text>No Location Picked yet</Text>
				)}
			</MapPreview>
			<Button
				title="Get User Location"
				color={Colors.primary}
				onPress={getLocationHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 15,
		alignItems: "center",
	},
	mapPreview: {
		width: "100%",
		height: 150,
		overflow: "hidden",
		marginBottom: 10,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 10,
	},
});

export default LocationPicker;
