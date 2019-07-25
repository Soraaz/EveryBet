"use strict";

import APIToolsService from "../../../services/APIToolsService";

// modules
import React, {Component} from "react";
import {Image, Platform, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

// styles
import betListItemStyle from "../../common/styleSheets/betListItemStyleSheet";

class UserBetListItemComponent extends Component {

	constructor(props) {
		super(props);
	}

	_onPress() {
		this.props.onPress(this.props.bet.id);
	}

	render() {
		const {bet, filter} = this.props;

		if (filter !== "Toutes" && bet.categories.find(category => category.name === filter) === undefined)
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
		const {type} = this.props;

		if (bet.open === false) {
			return null;
		} else if (type === "progress") {
			return (
				<View style={betListItemStyle.descriptionContainer}>
					<Text style={betListItemStyle.description}>
						{bet.description}
					</Text>
					<Text style={betListItemStyle.description}>
						{"Votre réponse est : " + bet.response}
					</Text>
				</View>
			);
		} else {
			return null;
		}
	}
}

UserBetListItemComponent.propTypes = {
	onPress: PropTypes.func.isRequired,
	bet: PropTypes.object.isRequired,
	categoryList: PropTypes.array.isRequired,
	filter: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default UserBetListItemComponent;
