import {StyleSheet} from "react-native";

const commonStyleSheet = StyleSheet.create({
	verticalCenter: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	container: {
		flex: 1,
		justifyContent:"flex-start"
	},
	scrollContainer: {
		flexGrow: 1
	},
	form: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontFamily: "System",
		fontWeight: "600",
		fontSize: 20,
		textAlign: "center",
		textAlignVertical: "center",
		marginTop: 25
	},
	whiteBackground: {
		backgroundColor: "#F4F4FE"
	},
	blueBackground: {
		backgroundColor: "#37597F"
	},
	tabIcon: {
		height: 30,
		width: 30
	},
	crownTabIcon: {
		height: 40,
		width: 40
	}
});

export default commonStyleSheet;
