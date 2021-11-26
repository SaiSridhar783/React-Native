import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface GameOverScreenProps {
	roundsNumber: number;
	userNumber: number | undefined;
	onRestart: () => void;
}

function GameOverScreen(props: GameOverScreenProps) {
	return (
		<View style={styles.screen}>
			<Text>Game Over!</Text>
			<Text>No. of Rounds - {props.roundsNumber}</Text>
			<Text>The Number was - {props.userNumber}</Text>
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
});

export default GameOverScreen;
