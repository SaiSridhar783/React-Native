import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	ImageBackground,
} from "react-native";

interface IMealItemProps {
	title: string;
	onSelectMeal: () => void;
	duration: number;
	complexity: string;
	affordability: string;
	image: string;
}

const MealItem: React.FC<IMealItemProps> = (props) => {
	return (
		<TouchableNativeFeedback onPress={props.onSelectMeal}>
			<View style={styles.mealItem}>
				<View style={{ ...styles.mealRow, ...styles.mealHeader }}>
					<ImageBackground
						source={{ uri: props.image }}
						style={styles.bgImage}
					>
						<Text style={styles.title} numberOfLines={1}>
							{props.title}
						</Text>
					</ImageBackground>
				</View>
				<View style={{ ...styles.mealRow, ...styles.mealDetails }}>
					<Text style={{color: "#ccc"}}>{props.duration}m</Text>
					<Text style={{color: "#ccc"}}>{props.complexity.toUpperCase()}</Text>
					<Text style={{color: "#ccc"}}>{props.affordability.toUpperCase()}</Text>
				</View>
			</View>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	mealRow: {
		flexDirection: "row",
	},
	mealItem: {
		height: 200,
		width: "100%",
		backgroundColor: "#51337d",
		borderRadius: 10,
		overflow: "hidden",
		marginVertical: 10,
	},
	mealHeader: {
		height: "83%",
	},
	mealDetails: {
		paddingHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		height: "17%",
	},
	bgImage: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
	},
	title: {
		fontFamily: "nunito-bold",
		fontSize: 20,
		color: "white",
		backgroundColor: "rgba(0,0,0,0.4)",
		paddingVertical: 5,
		textAlign: "center",
	},
});

export default MealItem;
