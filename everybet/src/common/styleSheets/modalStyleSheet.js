import {StyleSheet} from "react-native";

const modalStyleSheet = StyleSheet.create({
	supraContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000040"
	},
	container: {
		alignItems: "center",
		backgroundColor: "#ffffff",
		width: "70%",
		borderRadius: 5
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 15
	},
	separator: {
		width: "50%",
		marginVertical: 10,
		borderBottomColor: "#000000",
		borderBottomWidth: 1
	},
	title: {
		marginTop: 10,
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "center"
	},
	infoText: {
		marginTop:20,
		textAlign: "center",
		fontSize:12,
		fontWeight: "bold"
	},
	text: {
		textAlign: "center",
		fontSize: 12,
		fontWeight: "bold",
		marginHorizontal: 10
	},
	textInput: {
		width: "55%",
		height: 25,
		alignItems: "center",
		borderColor: "#707070",
		borderWidth: 0.5,
		paddingHorizontal: 10,
		marginTop: 10,
		borderRadius: 3
	},
	confirmButton: {
		flex: 1,
		height: 31,
		backgroundColor: "#A6E48D",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		margin: 2,
		marginRight: 1
	},
	cancelButton: {
		height: 31,
		flex: 1,
		backgroundColor: "#FC8D8D",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		margin: 2,
		marginLeft: 1
	}
});

export default modalStyleSheet;