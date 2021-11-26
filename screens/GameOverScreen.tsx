import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

interface GameOverScreenProps {
	roundsNumber: number;
	userNumber: number | undefined;
	onRestart: () => void;
}

function GameOverScreen(props: GameOverScreenProps) {
	return (
		<View style={styles.screen}>
			<TitleText>Game Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image
					//source={require("../assets/success.png")}
					source={{uri: "https://c.tenor.com/DNrNoBnfz4cAAAAC/game-over.gif"}}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed{" "}
					<Text style={styles.highlight}>{props.roundsNumber}</Text>{" "}
					rounds to guess the number{" "}
					<Text style={styles.highlight}>{props.userNumber}</Text>
				</BodyText>
			</View>
			<Button title="NEW GAME" onPress={props.onRestart} />
		</View>
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
		borderRadius: 160,
		borderWidth: 3,
		borderColor: "black",
		width: 320,
		height: 320,
		overflow: "hidden",
		marginVertical: 30,
	},
	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
	resultText: {
		textAlign: "center",
		fontSize: 20,
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: 20,
	},
});

export default GameOverScreen;
