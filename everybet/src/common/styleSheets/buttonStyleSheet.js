import {Platform, StyleSheet} from "react-native";

const buttonStyleSheet = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignSelf: "center",
		width: 215,
		height: 45,
		borderRadius: 10,
		marginTop: 20,
		...Platform.select({
			android: {
				elevation: 7.5
			},
			ios: {
				shadowColor: "#000000",
				shadowOffset: {
					width: 0,
					height: 6,
				},
				shadowOpacity: 0.33,
				shadowRadius: 7.5
			}
		})
	},
	normal: {
		backgroundColor: "#FFFFFF",
	},
	normalSmall: {
		backgroundColor: "#FFFFFF",
		width: 171,
		height: 30,
	},
	success: {
		backgroundColor: "#A6E48D"
	},
	warning: {
		backgroundColor: "#FC8D8D"
	},
	send: {
		backgroundColor: "#C9ECE9"
	},
	text: {
		fontFamily: "System",
		fontSize: 15,
		textAlign: "center",
		color: "#000000"
	}
});

export default buttonStyleSheet;
