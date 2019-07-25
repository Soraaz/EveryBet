import {StyleSheet} from "react-native";

const layoutStyleSheet = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent:"flex-start",
		alignItems: "center",
		height: 60,
		backgroundColor: "#37597F"
	},
	logo: {
		height: 39.25,
		width: 138,
		marginLeft: 25
	},
	coinContainer:{
		flexDirection: "row",
		justifyContent:"flex-start",
		alignItems: "center",
		height: 20,
		width: 90,
		marginLeft: "auto",
		borderRadius: 10,
		backgroundColor: "#FFFFFF"
	},
	coinIcon: {
		height: 30,
		width: 30
	},
	coinNumber:{
		textAlign: "right",
		fontFamily: "System",
		fontSize: 10,
		marginLeft: "auto",
		marginRight: 5
	},
	userIcon: {
		height: 40,
		width: 40,
		marginHorizontal: 15,
		borderRadius: 20
	}
});

export default layoutStyleSheet;
