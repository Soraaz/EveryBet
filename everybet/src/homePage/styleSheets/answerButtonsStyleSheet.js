import {StyleSheet} from "react-native";

const answerButtonsStyleSheet = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent:"flex-start",
		marginHorizontal:20,
		marginVertical: 5
	},
	nonAnsweredButton: {
		height: 50,
		borderRadius: 5,
		backgroundColor: "#C9ECE9"
	},
	textView:{
		flex:1,
		justifyContent: "center",
		alignItems: "center"
	},
	noCoin: {
		color: "#FE3939"
	}
});

export default answerButtonsStyleSheet;
