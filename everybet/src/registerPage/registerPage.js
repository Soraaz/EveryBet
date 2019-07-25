"use strict";

// modules
import React, {Component} from "react";
import {Text, SafeAreaView} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

// components
import Layout from "../layout/layout";
import RegisterComponent from "./components/registerComponent";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";

class RegisterPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
				<Layout/>
				<KeyboardAwareScrollView
					extraScrollHeight={120}
					extraHeight={120}
					contentContainerStyle={[commonStyle.scrollContainer, commonStyle.whiteBackground]}>
					<Text style={commonStyle.title}>
						{"Complétez ces quelques informations pour vous inscrire :"}
					</Text>
					<RegisterComponent />
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}

export default RegisterPage;