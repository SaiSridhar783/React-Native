import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

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
					source={require("../assets/success.png")}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>
			<BodyText>No. of Rounds - {props.roundsNumber}</BodyText>
			<BodyText>The Number was - {props.userNumber}</BodyText>
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
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		width: 300,
		height: 300,
		overflow: "hidden",
		marginVertical: 30,
	},
});

export default GameOverScreen;
