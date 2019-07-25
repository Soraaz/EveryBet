"use strict";

// modules
import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import PropTypes from "prop-types";

// components
import User from "../../classes/user";

// styles
import rankingListItemStyle from "../styleSheets/rankingListItemStyleSheet";

class RankingListItemComponent extends Component {

	constructor(props) {
		super(props);
	}

	static _rankColor(rank) {
		if (rank === 1)
			return rankingListItemStyle.gold;
		if (rank === 2)
			return rankingListItemStyle.silver;
		if (rank === 3)
			return rankingListItemStyle.bronze;
		return rankingListItemStyle.white;
	}

	render() {
		const {user} = this.props;

		return (
			<View style={[
				rankingListItemStyle.container,
				RankingListItemComponent._rankColor(parseInt(user.key)),
				user.id === User.id ? rankingListItemStyle.you : ""]}>
				<Text style={rankingListItemStyle.rank}>
					{user.key}
				</Text>
				<Image
					style={rankingListItemStyle.picture}
					source={user.avatar != null
						? {
							method: "GET",
							uri: user.avatar,
						}
						: require("../../../assets/images/user_placeholder.png")
					}
				/>
				<Text style={rankingListItemStyle.login}>
					{user.login}
				</Text>
				<Text style={rankingListItemStyle.coins}>
					{user.coins}
				</Text>
				<Image
					style={rankingListItemStyle.coinIcon}
					source={require("../../../assets/images/betcoin_icon.png")}
				/>
			</View>
		);
	}
}

RankingListItemComponent.propTypes = {
	user: PropTypes.object.isRequired
};

export default RankingListItemComponent;
