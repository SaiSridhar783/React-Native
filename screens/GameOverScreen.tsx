import React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const DIM = Dimensions.get("window");
interface GameOverScreenProps {
	roundsNumber: number;
	userNumber: number | undefined;
	onRestart: () => void;
}

function GameOverScreen(props: GameOverScreenProps) {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<View style={styles.imageContainer}>
					<Image
						//source={require("../assets/success.png")}
						source={{
							uri: "https://c.tenor.com/DNrNoBnfz4cAAAAC/game-over.gif",
						}}
						style={styles.image}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.resultContainer}>
					<BodyText style={styles.resultText}>
						Your phone needed{" "}
						<Text style={styles.highlight}>
							{props.roundsNumber}
						</Text>{" "}
						rounds to guess the number{" "}
						<Text style={styles.highlight}>{props.userNumber}</Text>
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		borderRadius: (DIM.width * 0.7) / 2,
		borderWidth: 3,
		borderColor: "black",
		width: DIM.width * 0.7,
		height: DIM.width * 0.7,
		overflow: "hidden",
		marginVertical: DIM.height / 30,
	},
	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
	resultText: {
		textAlign: "center",
		fontSize: DIM.height < 400 ? 16 : 20,
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: DIM.height / 60,
	},
});

export default GameOverScreen;
