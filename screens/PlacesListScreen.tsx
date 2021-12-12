import * as React from "react";
import { RootStackScreenProps } from "../types";
import { StyleSheet, FlatList } from "react-native";
import { useReduxDispatch, useReduxSelector } from "../store/store";
import PlaceItem from "../components/PlaceItem";
import { placesActions } from "../store/placesSlice";

interface IPlacesListScreenProps {}

const PlacesListScreen: React.FC<
	IPlacesListScreenProps & RootStackScreenProps<"Places">
> = (props) => {
	const places = useReduxSelector((state) => state.place);
	const dispatch = useReduxDispatch();

	React.useEffect(() => {
		dispatch(placesActions.fetchPlace());
	}, []);

	return (
		<FlatList
			data={places.places}
			renderItem={(itemData) => (
				<PlaceItem
					image={itemData.item.imageUri}
					address=""
					title={itemData.item.title}
					onSelect={() => {
						props.navigation.navigate("PlaceDetail", {
							params: {
								placeTitle: itemData.item.title,
								placeId: itemData.item.id,
							},
							screen: "PlaceDetail",
						});
					}}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
