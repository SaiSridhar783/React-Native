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

interface ILocationPickerProps {
	navigation: any;
	route: any;
	onLocationPicked: (location: any) => void;
}

const LocationPicker: React.FC<ILocationPickerProps> = ({
	onLocationPicked,
	...props
}) => {
	const [isFetching, setIsFetching] = React.useState(false);
	const [chosenLocation, setChosenLocation] = React.useState({});

	const coords = props.route.params?.params?.coordinates;

	React.useEffect(() => {
		if (coords) {
			setChosenLocation({ lat: coords.latitude, lng: coords.longitude });
			onLocationPicked({
				lat: coords.latitude,
				lng: coords.longitude,
			});
			setIsFetching(false);
		}
	}, [coords, onLocationPicked]);

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

			const newLoc = {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			};
			setChosenLocation(newLoc);
			onLocationPicked(newLoc);
		} catch (err) {
			Alert.alert(
				"Could not fetch location!",
				"Please try again later or contact the developer.",
				[{ text: "Okay" }]
			);
		}
		setIsFetching(false);
	};

	const pickOnMapHandler = () => {
		props.navigation.navigate("Map");
	};

	return (
		<View style={styles.locationPicker}>
			<MapPreview
				style={styles.mapPreview}
				location={chosenLocation}
				onPress={pickOnMapHandler}
			>
				{isFetching ? (
					<ActivityIndicator size="large" color={Colors.primary} />
				) : (
					<Text>No Location Picked yet</Text>
				)}
			</MapPreview>
			<View style={styles.actions}>
				<Button
					title="Get User Location"
					color={Colors.primary}
					onPress={getLocationHandler}
				/>
				<Button
					title="Pick on Map"
					color={Colors.primary}
					onPress={pickOnMapHandler}
				/>
			</View>
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
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
});

export default LocationPicker;
