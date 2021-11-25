import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
interface HeaderProps {
	title: string;
}

function Header(props: HeaderProps) {
	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 100,
		paddingTop: 55,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitle: {
		color: "black",
		fontSize: 18,
	},
});

export default Header;
