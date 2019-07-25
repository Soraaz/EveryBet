"use strict";

// modules
import React, {Component} from "react";
import {Text, View} from "react-native";
import {withNavigation} from "react-navigation";

// components
import Layout from "../../layout/layout";
import Button from "../../common/components/button";
import LoginFormComponent from "./loginFormComponent";

// styles
import commonStyle from "../../common/styleSheets/commonStyleSheet";

class LoginComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[commonStyle.container, commonStyle.whiteBackground]}>
				<Layout/>
				<Text style={commonStyle.title}>
					{"Connectez-vous pour commencer à parier !"}
				</Text>
				<LoginFormComponent />
				<Text style={commonStyle.title}>
					{"Pas encore inscrit ?"}
				</Text>
				<Button
					onPress={() => this.props.navigation.navigate("Register")}
					type={"normal"}
					text={"S'inscrire"}
				/>
			</View>
		);
	}
}

export default withNavigation(LoginComponent);