"use strict";

// modules
import React, {Component} from "react";
import {SafeAreaView, Text} from "react-native";
import {NavigationEvents} from "react-navigation";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

// components
import Layout from "../layout/layout";
import BetProposalComponent from "./components/betProposalComponent";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";

class BetProposalPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
				<NavigationEvents onWillFocus={() => this.forceUpdate()} />
				<Layout/>
				<KeyboardAwareScrollView
					extraScrollHeight={120}
					extraHeight={120}
					contentContainerStyle={[commonStyle.scrollContainer, commonStyle.whiteBackground]}
				>
					<Text style={commonStyle.title}>
						{"Remplissez ces champs pour envoyer votre pari !"}
					</Text>
					<BetProposalComponent />
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}

export default BetProposalPage;
