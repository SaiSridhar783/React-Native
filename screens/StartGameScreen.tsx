import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	Button,
	TouchableNativeFeedback,
	Keyboard,
	Alert,
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

interface StartGameScreenProps {
	onStartGame: Function;
}

function StartGameScreen(props: StartGameScreenProps) {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = (inputText: string) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid Number!",
				"Number has to be between 1 and 99.",
				[
					{
						text: "Okay",
						style: "destructive",
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}
		setConfirmed(true);
		setEnteredValue("");
		// @ts-ignore
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You Selected </BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button
					title="START GAME"
					onPress={() => props.onStartGame(selectedNumber)}
				/>
			</Card>
		);
	}

	return (
		<TouchableNativeFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a New Game!</TitleText>
				<Card style={styles.inputContainer}>
					<Text style={styles.text} >Select a Number</Text>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="Reset"
								onPress={resetInputHandler}
								color={Colors.accent}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								onPress={confirmInputHandler}
								color={Colors.primary}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableNativeFeedback>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
	},
	button: {
		width: 100,
	},
	input: {
		width: 50,
		elevation: 1,
		textAlign: "center",
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
	text: {
		fontFamily: "open-sans",
	}
});

export default StartGameScreen;
