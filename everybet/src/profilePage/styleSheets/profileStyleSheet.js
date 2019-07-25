import {StyleSheet} from "react-native";

const profileStyleSheet = StyleSheet.create({
	name:{
		fontFamily: "System",
		fontWeight: "600",
		fontSize: 32,
		textAlign: "center",
		textAlignVertical: "center"
	},
	userIcon: {
		alignSelf: "center",
		height: 125,
		width: 125,
		borderRadius: 65
	},
	coinSuperContainer:{
		flexDirection: "row",
		justifyContent:"flex-start",
		alignItems: "center",
		alignSelf: "center",
		marginLeft: 45,
		marginBottom: 10
	},
	coinContainer:{
		flexDirection: "row",
		justifyContent:"flex-start",
		alignItems: "center",
		height: 20,
		width: 90,
		borderRadius: 10,
		backgroundColor: "#FFFFFF"
	},
	coinIcon: {
		height: 40,
		width: 40,
		marginLeft: 5,
		marginTop: 30
	},
	coinNumber:{
		textAlign: "right",
		fontFamily: "System",
		fontSize: 10,
		marginLeft: "auto",
		marginRight: 5
	},
});

export default profileStyleSheet;
