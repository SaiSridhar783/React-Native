import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";
interface HeaderProps {
	title: string;
}

function Header(props: HeaderProps) {
	return (
		<View
			style={{
				...styles.headerBase,
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid,
				}),
			}}
		>
			<TitleText style={styles.title}>{props.title}</TitleText>
		</View>
	);
}

const styles = StyleSheet.create({
	headerBase: {
		width: "100%",
		height: 100,
		paddingTop: 36,
		alignItems: "center",
		justifyContent: "center",
	},
	headerAndroid: {
		backgroundColor: Colors.primary,
	},
	headerIOS: {
		borderBottomWidth: 1,
		backgroundColor: "white",
		borderBottomColor: "#ccc",
	},
	title: {
		color: Platform.OS === "android" ? "white" : Colors.primary,
	},
});

export default Header;
