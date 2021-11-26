import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

const generateRandomBetween = (
	min: number,
	max: number,
	exclude: number
): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

interface GameScreenProps {
	userChoice: number;
}

function GameScreen(props: GameScreenProps) {
	const [currentGuess, setCurrentGuess] = React.useState(
		generateRandomBetween(1, 100, props.userChoice)
	);

	return (
		<View style={styles.screen}>
			<Text>Opponent&apos;s Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button title="LOWER" />
				<Button title="HIGHER" />
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: 300,
        maxWidth: "80%",
		marginTop: 20,
		paddingHorizontal: 15,
	},
});

export default GameScreen;
