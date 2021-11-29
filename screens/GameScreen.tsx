import React, { useEffect, useState } from "react";
import {
	Alert,
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/default-styles";
import BodyText from "../components/BodyText";

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

const renderListItem = (listLength: number, itemData: any) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
);

function GameScreen({ userChoice, onGameOver }: GameScreenProps) {
	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState<string[]>([
		initialGuess.toString(),
	]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get("window").width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);

	const currentLow = React.useRef(1);
	const currentHigh = React.useRef(100);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get("window").width);
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};

		const subscription = Dimensions.addEventListener(
			"change",
			updateLayout
		);
		return () => {
			subscription.remove();
		};
	}, []);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction: string) => {
		if (
			(direction === "LOWER" && currentGuess < userChoice) ||
			(direction === "HIGHER" && currentGuess > userChoice)
		) {
			Alert.alert(
				"Who you tryna fool?",
				"You know this ain't the right choice...",
				[{ text: "Sorry", style: "cancel" }]
			);
			return;
		}

		if (direction === "LOWER") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		//setRounds((curRounds) => curRounds + 1);
		setPastGuesses((curPast) => [nextNumber.toString(), ...curPast]);
	};

	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<Text style={DefaultStyles.title}>Opponent&apos;s Guess</Text>
				<View style={styles.controls}>
					<MainButton onPress={() => nextGuessHandler("LOWER")}>
						<AntDesign name="minuscircle" size={24} color="white" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={() => nextGuessHandler("HIGHER")}>
						<AntDesign name="pluscircle" size={24} color="white" />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
					<FlatList
						keyExtractor={(item) => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(
							null,
							pastGuesses.length
						)}
						contentContainerStyle={styles.list}
					/>
				</View>
			</View>
		);
	}

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
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(null, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
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
		marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
		paddingHorizontal: 15,
	},
	listContainer: {
		flex: 1,
		width: Dimensions.get("window").width > 350 ? "60%" : "80%",
	},
	list: {
		flexGrow: 1,
		// alignItems: "center",
		justifyContent: "flex-end",
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	controls: {
		flexDirection: "row",
		width: "80%",
		justifyContent: "space-around",
		alignItems: "center",
	},
});

export default GameScreen;
