import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Button,
} from "react-native";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Colors from "../constants/Colors";
import { placesActions } from "../store/placesSlice";
import { useReduxDispatch } from "../store/store";
import { RootStackScreenProps } from "../types";

interface INewPlaceScreenProps {}

const NewPlaceScreen: React.FC<
	INewPlaceScreenProps & RootStackScreenProps<"NewPlace">
> = (props) => {
	const [enteredTitle, setEnteredTitle] = React.useState("");
	const [selectedImage, setSelectedImage] = React.useState("");
	const [selectedLocation, setSelectedLocation] = React.useState({});
	const dispatch = useReduxDispatch();

	const titleChangeHandler = (text: string) => {
		setEnteredTitle(text);
	};

	const savePlaceHandler = () => {
		dispatch(
			placesActions.addPlace({
				title: enteredTitle,
				image: selectedImage,
				location: selectedLocation,
			})
		);
		props.navigation.goBack();
	};

	const tookImageHandler = (imagePath: string) => {
		setSelectedImage(imagePath);
	};

	const locationPickedHandler = React.useCallback((location: any) => {
		setSelectedLocation(location);
	}, []);

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangeHandler}
					value={enteredTitle}
				/>
				<ImagePicker onImageTaken={tookImageHandler} />
				<LocationPicker
					navigation={props.navigation}
					route={props.route}
					onLocationPicked={locationPickedHandler}
				/>
				<Button
					title="Save Place"
					color={Colors.tint}
					onPress={savePlaceHandler}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
		fontFamily: "nunito-bold",
	},
	textInput: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
		fontSize: 16,
		fontFamily: "nunito",
	},
});

export default NewPlaceScreen;
