import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/default-styles";

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
	onGameOver: (numOfRounds: number) => void;
}

function GameScreen({ userChoice, onGameOver }: GameScreenProps) {
	const [currentGuess, setCurrentGuess] = React.useState(
		generateRandomBetween(1, 100, userChoice)
	);
	const [rounds, setRounds] = React.useState(0);

	const currentLow = React.useRef(1);
	const currentHigh = React.useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction: string) => {
		if (
			(direction === "LOWER" && currentGuess < userChoice) ||
			(direction === "HIGHER" && currentGuess > userChoice)
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
		setRounds((curRounds) => curRounds + 1);
	};

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent&apos;s Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler("LOWER")}>
					<AntDesign name="minuscircle" size={24} color="white" />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler("HIGHER")}>
					<AntDesign name="pluscircle" size={24} color="white" />
				</MainButton>
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
		width: 400,
		maxWidth: "90%",
		marginTop: 20,
		paddingHorizontal: 15,
	},
});

export default GameScreen;
