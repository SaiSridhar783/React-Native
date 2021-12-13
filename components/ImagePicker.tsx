import * as React from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePickerAPI from "expo-image-picker";

interface IImagePickerProps {
	onImageTaken: (uri: string) => void;
}

const ImagePicker: React.FC<IImagePickerProps> = (props) => {
	const verifyPermissions = async () => {
		const result = await ImagePickerAPI.getCameraPermissionsAsync();
		if (result.status !== "granted") {
			Alert.alert(
				"Insufficient permissions!",
				"You need to grant camera permissions to use this app.",
				[
					{
						text: "Okay",
						onPress: async () => {
							await ImagePickerAPI.requestCameraPermissionsAsync();
						},
					},
				]
			);
			return false;
		}
		return true;
	};

	const [pickedImage, setPickedImage] = React.useState("");

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const image = await ImagePickerAPI.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		if (!image.cancelled) {
			setPickedImage(image.uri);
			props.onImageTaken(image.uri);
		}
	};
	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>No Image Picked Yet.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
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
