"use strict";

// modules
import React, {Component} from "react";
import {Image, Platform, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import APIToolsService from "../../../services/APIToolsService";

// components
import BetReportModalComponent from "./betReportModalComponent";
import AnswersButtonsComponent from "./answerButtonsComponent";

// styles
import commonStyle from "../../common/styleSheets/commonStyleSheet";
import betListItemStyle from "../../common/styleSheets/betListItemStyleSheet";

class BetListItemComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}

	_onPress() {
		this.props.onPress(this.props.bet.id);
	}

	_openModal() {
		this.setState({
			showModal: true
		});
	}

	_closeModal() {
		this.setState({
			showModal: false
		});
	}

	render() {
		const {bet, filter} = this.props;

		if ((bet.categories.find(category => category.name === filter) === undefined) && filter !== "Toutes")
			return null;
		return (
			<View>
				{this._renderOS(bet)}
				{this._renderDescription(bet)}
			</View>
		);
	}

	_renderOS(bet) {
		if (Platform.OS === "android") {
			return (
				<TouchableNativeFeedback onPress={() => this._onPress()}>
					{this._renderItem(bet)}
				</TouchableNativeFeedback>
			);
		} else {
			return(
				<TouchableOpacity onPress={() => this._onPress()}>
					{this._renderItem(bet)}
				</TouchableOpacity>
			);
		}
	}

	_renderItem(bet) {
		return(
			<View style={betListItemStyle.titleContainer}>
				{this._renderIcon(bet)}
				<Text style={betListItemStyle.title}>
					{bet.name}
				</Text>
				<Image
					source={bet.open
						? require("../../../assets/images/bet_opened.png")
						: require("../../../assets/images/bet_closed.png")
					}
					style={betListItemStyle.arrow}
				/>
			</View>
		);
	}

	_renderIcon(bet) {
		let category = this.props.categoryList.find((elem) => {
			if (bet.categories[0] === undefined)
				return false;
			return elem.name === bet.categories[0].name;
		});
		if (category === undefined || category.icon === undefined)
			return null;
		return (
			<Image
				source={{uri: `${APIToolsService.getUrl()}images/categories/${category.icon}`}}
				style={betListItemStyle.picture}
			/>
		);
	}

	_renderDescription(bet) {
		let deadline;

		if (bet.open) {
			deadline = new Date(bet.deadline * 1000);
			return (
				<View style={betListItemStyle.descriptionContainer}>
					<BetReportModalComponent
						betId={bet.id}
						betName={bet.name}
						showModal={this.state.showModal}
						closeModal={() => this._closeModal()}
					/>
					<View style={[commonStyle.verticalCenter, {alignItems: "flex-start"}]}>
						<Text style={betListItemStyle.description}>
							{bet.description}{"\n"}
						</Text>
						<TouchableOpacity onPress={() => this._openModal()}>
							<Image
								style={betListItemStyle.report}
								source={require("../../../assets/images/report.png")}
							/>
						</TouchableOpacity>
					</View>
					<View style={commonStyle.verticalCenter}>
						<Image
							style={betListItemStyle.descriptionIcon}
							source={require("../../../assets/images/clock.png")}
						/>
						<Text style={betListItemStyle.description}>
							{
								"Date de fin le " +
								(deadline.getDate() < 10 ? "0" : "") + deadline.getDate() + "/" +
								(deadline.getMonth() + 1 < 10 ? "0" : "") + (deadline.getMonth() + 1) + "/" +
								deadline.getFullYear() + " à " +
								(deadline.getHours() < 10 ? "0" : "") + deadline.getHours() + ":" +
								(deadline.getMinutes() < 10 ? "0" : "") + deadline.getMinutes() + "\n"
							}
						</Text>
					</View>
					<View style={commonStyle.verticalCenter}>
						<Image
							style={[betListItemStyle.descriptionIcon, {marginRight: 17}]}
							source={require("../../../assets/images/tag.png")}
						/>
						<View style={[commonStyle.verticalCenter, {flexWrap: "wrap"}]}>
							{bet.categories.map((item) => {
								return(
									<Text style={betListItemStyle.tag} key={item.id}>
										<Image
											source={{uri: `${APIToolsService.getUrl()}images/categories/${item.icon}`}}
											style={betListItemStyle.tagIcon}
										/>
										{item.name}
									</Text>
								);
							})}
						</View>
					</View>
					<AnswersButtonsComponent onAnswer={this.props.onAnswer} bet={bet}/>
				</View>
			);
		}
		return null;
	}
}

BetListItemComponent.propTypes = {
	onPress: PropTypes.func.isRequired,
	onAnswer: PropTypes.func.isRequired,
	bet: PropTypes.object.isRequired,
	categoryList: PropTypes.array.isRequired,
	filter: PropTypes.string.isRequired
};

export default withNavigation(BetListItemComponent);
