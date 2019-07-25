import {StyleSheet} from "react-native";

const betListItemStyleSheet = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 25,
		marginHorizontal: 35,
		borderRadius: 5,
		backgroundColor: "#FFFFFF7F"
	},
	title:{
		flex: 1,
		fontFamily: "System",
		fontSize: 16,
		fontWeight: "bold"
	},
	picture:{
		height: 40,
		width: 40,
		marginHorizontal: 10,
		marginVertical: 10
	},
	arrow:{
		marginHorizontal: 10,
		height: 10,
		width: 17
	},
	descriptionContainer: {
		flex: 1,
		justifyContent: "flex-start",
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
		marginHorizontal: 40,
		paddingTop: 10,
		paddingBottom: 20,
		backgroundColor: "#FFFFFFBF"
	},
	description: {
		flex: 1,
		fontFamily: "System",
		fontSize: 15,
		marginHorizontal: 20
	},
	descriptionIcon: {
		height: 15,
		width: 15,
		marginLeft: 20
	},
	tag: {
		fontFamily: "System",
		fontSize: 12,
		height: 32,
		marginRight: 5
	},
	tagIcon:{
		height: 20,
		width: 20
	},
	answer: {
		flex: 1,
		fontFamily: "System",
		fontSize: 15,
		fontWeight: "bold",
		color: "#C9ECE9"
	},
	coin : {
		width: 12,
		height: 12
	},
	report : {
		width: 25,
		height: 25,
		marginLeft: "auto",
		marginRight: 5
	}
});

export default betListItemStyleSheet;
