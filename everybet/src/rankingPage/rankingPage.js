"use strict";

// modules
import React, {Component} from "react";
import {Platform, SafeAreaView, StatusBar} from "react-native";

// components
import Layout from "../layout/layout";
import RankingListComponent from "./components/rankingListComponent";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";

class RankingPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
				<StatusBar hidden={Platform.OS === "android"}/>
				<Layout/>
				<RankingListComponent/>
			</SafeAreaView>
		);
	}
}

export default RankingPage;