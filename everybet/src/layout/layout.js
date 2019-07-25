"use strict";

// modules
import React, {Component} from "react";
import {
    Image,
    Platform,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {withNavigation} from "react-navigation";

// components
import User from "../classes/user";

// styles
import layoutStyle from "./styleSheets/layoutStyleSheet";

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={layoutStyle.headerContainer}>
                <StatusBar hidden={Platform.OS === "android"} />
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Home")}>
                    <Image
                        source={require("../../assets/images/everybet_logo.png")}
                        style={layoutStyle.logo}
                    />
                </TouchableWithoutFeedback>
                <View style={layoutStyle.coinContainer}>
                    <Image
                        source={require("../../assets/images/betcoin_icon.png")}
                        style={layoutStyle.coinIcon}
                    />
                    <Text style={layoutStyle.coinNumber}>
                        {User.coins === undefined ? 0 : User.coins}
                    </Text>
                </View>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Profile")}>
                    <Image
                        style={layoutStyle.userIcon}
                        source={User.avatar != null
                            ? {
                                method: "GET",
                                uri: User.avatar,
                            }
                            : require("../../assets/images/user_placeholder.png")
                        }
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default withNavigation(Layout);
