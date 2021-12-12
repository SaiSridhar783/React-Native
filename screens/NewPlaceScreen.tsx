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
import Colors from "../constants/Colors";
import { placesActions } from "../store/placesSlice";
import { useReduxDispatch } from "../store/store";
import { RootStackScreenProps } from "../types";

interface INewPlaceScreenProps {}

const NewPlaceScreen: React.FC<
	INewPlaceScreenProps & RootStackScreenProps<"NewPlace">
> = (props) => {
	const [enteredTitle, setEnteredTitle] = React.useState("");
	const dispatch = useReduxDispatch();

	const titleChangeHandler = (text: string) => {
		setEnteredTitle(text);
	};

	const savePlaceHandler = () => {
		dispatch(placesActions.addPlace({ title: enteredTitle }));
		props.navigation.goBack();
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangeHandler}
					value={enteredTitle}
				/>
				<ImagePicker />
				<Button
					title="Save Place"
					color={Colors.primary}
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
