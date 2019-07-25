"use strict";

// modules
import React, {Component} from "react";
import {Platform, SafeAreaView, StatusBar} from "react-native";
import {NavigationEvents} from "react-navigation";

// components
import User from "../classes/user";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";
import LoginComponent from "./components/loginComponent";
import ProfileComponent from "./components/profileComponent";

class ProfilePage extends Component {

    constructor(props) {
        super(props);
    }

    _onWillFocus() {
        this.forceUpdate();
    }

    render() {
        return (
            <SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
                <StatusBar hidden={Platform.OS === "android"} />
                <NavigationEvents onWillFocus={() => this._onWillFocus()} />
                {User.id === undefined
                    ? <LoginComponent />
                    : <ProfileComponent />
                }
            </SafeAreaView>
        );
    }
}

export default ProfilePage;
