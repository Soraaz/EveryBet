"use strict";

// modules
import React, {Component} from "react";
import {AsyncStorage, Platform, SafeAreaView, StatusBar} from "react-native";
import {NavigationEvents, withNavigation} from "react-navigation";
import UsersService from "../../services/UsersService";

// components
import User from "../classes/user";
import AlertMessage from "../common/components/alertMessage";
import NotificationCenter from "../common/components/notificationCenter";
import Layout from "../layout/layout";
import DailyRewardModalComponent from "./components/dailyRewardModalComponent";
import BetListComponent from "./components/betListComponent";

// styles
import commonStyle from "../common/styleSheets/commonStyleSheet";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			close: 0
		};
	}

	async componentDidMount() {
		const login = await AsyncStorage.getItem("login");
		const rememberMe = await AsyncStorage.getItem("rememberMe");

		if (rememberMe === "true") {
			await UsersService.getUsersByLogin(login)
				.then((res) => {
					if ("error" in res)
						AlertMessage.error(res.error, this.props.navigation.navigate);
					else {
						User.setUser(res[0]);
						this.setState({
							showModal: User.reward === undefined ? false : User.reward
						});
					}
				});
		}
	}

	_closeModal() {
		UsersService.dailyRewardByUserId(User.id, User.rewardValue)
			.then((res) => {
				if ("error" in res)
					AlertMessage.error(res.error, this.props.navigation.navigate);
				else {
					User.coins = User.coins + User.rewardValue;
					User.reward = false;
					User.notificationCenter._dailyRewardNotification();
					this.setState({
						showModal: false
					});
				}
			});
	}

	_onWillFocus() {
		this.setState({
			showModal: User.reward === undefined ? false : User.reward,
			close: this.state.close + 1
		});
	}

	_onAnswer() {
		this.forceUpdate();
	}

	render() {
		return (
			<SafeAreaView style={[commonStyle.container, commonStyle.blueBackground]}>
				<NotificationCenter/>
				<StatusBar hidden={Platform.OS === "android"}/>
				<NavigationEvents onWillFocus={() => this._onWillFocus()} />
				<DailyRewardModalComponent showModal={this.state.showModal} closeModal={() => this._closeModal()}/>
				<Layout/>
				<BetListComponent onAnswer={() => this._onAnswer()} closeAll={this.state.close}/>
			</SafeAreaView>
		);
	}
}

export default withNavigation(HomePage);
