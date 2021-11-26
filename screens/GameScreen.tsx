import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
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

	const currentLow = React.useRef(1);
	const currentHigh = React.useRef(100);

	const nextGuessHandler = (direction: string) => {
		if (
			(direction === "LOWER" && currentGuess < props.userChoice) ||
			(direction === "HIGHER" && currentGuess > props.userChoice)
		) {
			Alert.alert("Who you tryna kid?", "You know this ain't right...", [
				{ text: "Sorry", style: "cancel" },
			]);
			return;
		}

		if (direction === "LOWER") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
	};

	return (
		<View style={styles.screen}>
			<Text>Opponent&apos;s Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button
					title="LOWER"
					onPress={() => nextGuessHandler("LOWER")}
				/>
				<Button
					title="HIGHER"
					onPress={() => nextGuessHandler("HIGHER")}
				/>
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
