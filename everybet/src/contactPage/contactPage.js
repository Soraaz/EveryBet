"use strict";

// modules
import React, {Component} from "react";
import {Text, SafeAreaView, ScrollView} from "react-native";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";
import Layout from "../layout/layout";
import ContactComponent from "./components/contactComponent";

class ContactPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
				<Layout/>
				<ScrollView contentContainerStyle={[commonStyle.scrollContainer, commonStyle.whiteBackground]}>
					<Text style={commonStyle.title}>
						{"Si vous avez une remarque ou une proposition pour l'application, laissez-nous votre avis ici."}
					</Text>
					<ContactComponent />
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default ContactPage;