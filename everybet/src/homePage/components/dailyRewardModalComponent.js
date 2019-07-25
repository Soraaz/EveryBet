"use strict";

// modules
import React, {Component} from "react";
import {Image, Modal, Text, View} from "react-native";
import PropTypes from "prop-types";

// components
import User from "../../classes/user";
import Button from "../../common/components/button";

// styles
import modalStyle from "../../common/styleSheets/modalStyleSheet";
import dailyRewardModalStyle from "../styleSheets/dailyRewardModalStyleSheet";

class DailyRewardModalComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {showModal, closeModal} = this.props;

		return (
			<Modal
				visible={showModal}
				transparent={true}
				onRequestClose={closeModal}
			>
				<View style={modalStyle.supraContainer}>
					<View style={[modalStyle.container, {paddingBottom: 10}]}>
						<Text style={modalStyle.title}>
							{"Récompense quotidienne"}
						</Text>
						<View style={modalStyle.separator}/>
						<Text style={modalStyle.text}>
							{
								"Vous vous êtes connecté à EveryBet " + User.rewardTier + " jour" +
								(User.rewardTier < 2 ? "" : "s") + " d'affilé !"
							}
						</Text>
						<Text style={modalStyle.text}>
							{"Vous avez gagné " + User.rewardValue}
							<Image
								style={dailyRewardModalStyle.coinIcon}
								source={require("../../../assets/images/betcoin_icon.png")}
							/>
							{" comme cadeau pour votre fidélité."}
						</Text>
						<Button
							onPress={closeModal}
							type={"normal"}
							text={"Merci !"}
						/>
					</View>
				</View>
			</Modal>
		);
	}
}

DailyRewardModalComponent.propTypes = {
	showModal: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired
};

export default DailyRewardModalComponent;