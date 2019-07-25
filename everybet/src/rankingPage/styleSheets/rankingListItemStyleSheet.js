import {StyleSheet} from "react-native";

const rankingListItemStyleSheet = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 15,
		marginHorizontal: 35,
		borderRadius: 5,
	},
	picture:{
		height: 40,
		width: 40,
		marginHorizontal: 10,
		marginVertical: 10,
		borderRadius: 20
	},
	rank:{
		fontFamily: "System",
		fontSize: 20,
		fontWeight: "bold",
		marginHorizontal: 10
	},
	login:{
		fontFamily: "System",
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: 10,
		marginRight: "auto"
	},
	coins:{
		fontFamily: "System",
		fontSize: 15,
		marginLeft: "auto"
	},
	coinIcon: {
		height: 30,
		width: 30,
		marginLeft: 10,
		marginRight: 30
	},
	gold: {
		backgroundColor: "#D4AF377F"
	},
	silver: {
		backgroundColor: "#C4CACE7F"
	},
	bronze: {
		backgroundColor: "#CD7F327F"
	},
	white: {
		backgroundColor: "#FFFFFF7F"
	},
	you: {
		borderWidth: 5,
		borderStyle: "solid",
		borderColor: "#F8BC4C"
	}
});

export default rankingListItemStyleSheet;