import * as React from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePickerAPI from "expo-image-picker";
import * as PermissionsAPI from "expo-permissions";

interface IImagePickerProps {}

const ImagePicker: React.FC<IImagePickerProps> = (props) => {
	const verifyPermissions = async () => {
		const result = await PermissionsAPI.askAsync(
			PermissionsAPI.CAMERA,
			PermissionsAPI.MEDIA_LIBRARY
		);
		if (result.status !== "granted") {
			Alert.alert(
				"Insufficient permissions!",
				"You need to grant camera permissions to use this app.",
				[{ text: "Okay" }]
			);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		ImagePickerAPI.launchCameraAsync();
	};
	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				<Text>No Image Picked Yet.</Text>
				<Image style={styles.image} source={{ uri: "vgdrth" }} />
			</View>
			<Button
				title="Take Image"
				color={Colors.primary}
				onPress={takeImageHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: "center",
		marginBottom: 15,
	},
	imagePreview: {
		width: "100%",
		height: 200,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#ccc",
		borderWidth: 1,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default ImagePicker;
