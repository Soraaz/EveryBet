"use strict";

// modules
import React, {Component} from "react";
import {SafeAreaView, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

// components
import Layout from "../layout/layout";
import EditProfilePageComponent from "./components/editProfilePageComponent.js";
import AvatarComponent from "./components/avatarComponent";
import DeleteMyAccountComponent from "./components/deleteMyAccountComponent.js";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";

class EditProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    _onAvatarChange() {
        this.forceUpdate();
    }

    render() {
        return (
            <SafeAreaView style={[commonStyle.container, commonStyle.whiteBackground]}>
                <Layout/>
                <KeyboardAwareScrollView extraScrollHeight={120} extraHeight={120} contentContainerStyle={[commonStyle.scrollContainer, commonStyle.whiteBackground]}>
                    <Text style={commonStyle.title}>
                        {"Informations du compte"}
                    </Text>
                    <AvatarComponent onAvatarChange={() => this._onAvatarChange()}/>
                    <EditProfilePageComponent />
                    <DeleteMyAccountComponent />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

export default EditProfilePage;