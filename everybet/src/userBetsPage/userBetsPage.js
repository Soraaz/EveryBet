"use strict";

// modules
import React, {Component} from "react";
import {Platform, SafeAreaView, StatusBar} from "react-native";
import {NavigationEvents} from "react-navigation";

// components
import Layout from "../layout/layout";
import UserBetListComponent from "./components/userBetListComponent";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";

class UserBetsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			close: 0
		};
	}

	render() {
		const {state} = this.props.navigation;

		return (
			<SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
				<StatusBar hidden={Platform.OS === "android"}/>
				<NavigationEvents onWillFocus={() => this.setState({close: this.state.close + 1})} />
				<Layout/>
				<UserBetListComponent type={state.params.type} closeAll={this.state.close}/>
			</SafeAreaView>
		);
	}
}

export default UserBetsPage;
