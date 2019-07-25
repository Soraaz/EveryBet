import {StyleSheet} from "react-native";

const filterStyleSheet = StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		backgroundColor: "#37597F",
		height: 50
	},
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		marginHorizontal: 20,

	},
	pickerTitle: {
		color:"#FFFFFF"
	},
	picker:{
		backgroundColor:"#FFFFFF",
		height: 25,
		borderRadius: 5,
		justifyContent: "center",
	},
	textIOS:{
		paddingLeft: 10
	}
});

export default filterStyleSheet;
