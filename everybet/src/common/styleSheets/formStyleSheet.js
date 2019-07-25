import {Platform, StyleSheet} from "react-native";

const formStyleSheet = StyleSheet.create({
    container: {
        fontFamily: "System",
        fontSize: 15,
        backgroundColor: "#FFFFFF",
        alignSelf: "center",
        width: 282,
        height: 50,
        paddingLeft: 20,
        borderRadius: 3,
        marginTop: 20,
        ...Platform.select({
            android: {
                elevation: 7.5
            },
            ios: {
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.33,
                shadowRadius: 3
            }
        })
    },
    pickerAndroid: {
        fontFamily: "System",
        fontSize: 15,
        backgroundColor: "#FFFFFF",
        height: 30,
        width: 175,
        paddingLeft: 20,
        borderRadius: 3,
        marginTop: 20,
        marginLeft: 20
    },
    pickerIos: {
        fontFamily: "System",
        fontSize: 15,
        backgroundColor: "#FFFFFF",
        width: 139,
        paddingLeft: 20,
        borderRadius: 3,
        marginTop: 20,
        marginLeft: 20
    },
    list: {
        fontFamily: "System",
        fontSize: 15,
        backgroundColor: "#FFFFFF",
        alignSelf: "center",
        width: 175,
        height: 30,
        paddingLeft: 20,
        borderRadius: 3,
        marginTop: 20,
        marginLeft: 20
    },
    error: {
        fontFamily: "System",
        fontSize: 15,
        marginTop: 20,
        textAlign: "center",
        color: "red",
    },
    errorProfile: {
        fontFamily: "System",
        fontSize: 15,
        textAlign: "center",
        color: "red",
    },
    buttonText: {
        fontFamily: "System",
        fontSize: 15,
    },
    checkboxView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginRight: 30,
    },
    checkboxAndError: {
        flexDirection: "column",
        alignItems: "center",
    },
    textCheckbox: {
        flex: 4,
        alignItems: "stretch",
        fontFamily: "System",
        fontSize: 15,
        textAlign: "center",
    },
    checkbox: {
        alignSelf: "flex-end",
    },
    buttonTextList: {
        fontSize: 12,
        color: "black",
        alignSelf: "center"
    },
    datePickerContainer: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems: "center",
        marginVertical: 10
    },
    datePickerBox: {
        width: 139,
        height: 24,
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        ...Platform.select({
            android: {
                elevation: 3
            },
            ios: {
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.33,
                shadowRadius: 3
            }
        })
    },
    date: {
        fontFamily: "System",
        fontSize: 15,
        textAlign: "center",
        marginTop: 2.5
    },
    listLabelAndButtonAdd: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
        marginTop: 20,
        marginLeft: 20
    },
    listAddButton: {
        alignSelf: "stretch",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        width: 20,
        height: 20,
        borderRadius: 9,
        paddingLeft: 0.5,
        ...Platform.select({
            android: {
                elevation: 3
            },
            ios: {
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.33,
                shadowRadius: 3
            }
        })
    },
    listDeleteButton: {
        backgroundColor : "#FC8D8D",
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 1
    },
    profileMainStyle: {
        marginBottom: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: 30,
        marginRight: 30,
        flexWrap: "wrap",
        flex: 1},
    labelMainStyle: {
        flexDirection: "row",
        justifyContent: "flex-start"},
    deliveryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30},
    deadlineIos:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
    deadlinePicker:{
        width: 300
    }
});

export default formStyleSheet;