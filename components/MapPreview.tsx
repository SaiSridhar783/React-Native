import * as React from "react";
import { View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import config from "../config";

interface IMapPreviewProps {
	location: {
		lng?: number;
		lat?: number;
	};
	style: object;
	onPress: () => void;
}

const MapPreview: React.FC<IMapPreviewProps> = (props) => {
	let imagePreviewUrl;

	if (props.location.lat) {
		imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-l+ff0000(${props.location.lng},${props.location.lat})/${props.location.lng},${props.location.lat},15.25,0,60/400x400?access_token=${config.MAPBOX_API}`;
	}

	return (
		<TouchableNativeFeedback onPress={props.onPress}>
			<View style={{ ...styles.mapPreview, ...props.style }}>
				{props.location.lat ? (
					<Image
						style={styles.mapImage}
						source={{ uri: imagePreviewUrl }}
					/>
				) : (
					props.children
				)}
			</View>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	mapPreview: {
		justifyContent: "center",
		alignItems: "center",
	},
	mapImage: {
		width: "100%",
		height: "100%",
	},
});

export default MapPreview;
