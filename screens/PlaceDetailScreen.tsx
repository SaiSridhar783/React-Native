import * as React from "react";
import { Text, StyleSheet, ScrollView, Image, View } from "react-native";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";
import { useReduxSelector } from "../store/store";
import { RootStackScreenProps } from "../types";

interface IPlaceDetailScreenProps {}

const PlaceDetailScreen: React.FC<
	IPlaceDetailScreenProps & RootStackScreenProps<"PlaceDetail">
> = (props) => {
	//@ts-ignore
	const placeId = props.route.params!.params!.placeId;
	const selectedPlace = useReduxSelector((state) =>
		state.place.places.find((p) => p.id === placeId)
	);

	React.useEffect(() => {
		props.navigation.setOptions({
			//@ts-ignore
			title: props.route.params!.params!.placeTitle,
		});
		return () => {};
	}, []);
	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<Image
				style={styles.image}
				source={{ uri: selectedPlace!.imageUri }}
			/>
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{selectedPlace!.address}</Text>
				</View>
				<MapPreview
					style={styles.mapPreview}
					location={selectedPlace!.coords}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
		backgroundColor: "#ccc",
	},
	locationContainer: {
		marginVertical: 20,
		width: "90%",
		maxWidth: 350,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		backgroundColor: "white",
		borderRadius: 10,
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary,
		textAlign: "center",
	},
	mapPreview: {
		width: "100%",
		maxWidth: 350,
		height: 300,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
});

export default PlaceDetailScreen;
