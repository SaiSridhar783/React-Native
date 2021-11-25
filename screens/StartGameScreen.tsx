import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface StartGameScreenProps {
	time: number;
}

function StartGameScreen(props: StartGameScreenProps) {
	return (
		<View style={styles.screen}>
			<Text>StartGameScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
});

export default StartGameScreen;
