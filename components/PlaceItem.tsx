import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Image,
	TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useReduxDispatch } from "../store/store";
import { placesActions } from "../store/placesSlice";

interface IPlaceItemProps {
	image: string;
	title: string;
	address: string;
	onSelect: () => void;
	id: number;
}

const PlaceItem: React.FC<IPlaceItemProps> = (props) => {
	const dispatch = useReduxDispatch();
	const deletePlaceHandler = () => {
		dispatch(placesActions.deletePlace(props.id));
	};
	return (
		<TouchableNativeFeedback onPress={props.onSelect}>
			<View style={styles.placeItem}>
				<Image style={styles.image} source={{ uri: props.image }} />
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{props.title}</Text>
					<Text style={styles.address}>{props.address}</Text>
				</View>
				<TouchableOpacity onPress={deletePlaceHandler}>
					<FontAwesome
						name="trash-o"
						size={23}
						style={styles.deleteIcon}
					/>
				</TouchableOpacity>
			</View>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	placeItem: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 30,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#ccc",
		borderColor: Colors.primary,
		borderWidth: 1,
	},
	infoContainer: {
		marginLeft: 25,
		width: 250,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		color: "black",
		fontSize: 18,
		marginBottom: 5,
	},
	address: {
		color: "#666",
		fontSize: 16,
	},
	deleteIcon: {
		marginRight: "15%",
	},
});

export default PlaceItem;
