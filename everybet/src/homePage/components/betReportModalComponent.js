"use strict";

// modules
import React, {Component} from "react";
import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import ServiceClientService from "../../../services/ServiceClientService";

// components
import User from "../../classes/user";
import AlertMessage from "../../common/components/alertMessage";

// styles
import modalStyle from "../../common/styleSheets/modalStyleSheet";

class BetReportModalComponent extends Component {
	constructor(props) {
		super(props);
	}

	_sendReport(reason) {
		ServiceClientService.sendMessage(User.id, this.props.betId, reason)
			.then((res) => {
				if ("error" in res) {
					AlertMessage.error(res.error, this.props.navigation.navigate);
				} else {
					this.props.closeModal();
					AlertMessage.success(
						"Signalement envoyé",
						"Votre signalement a été envoyé et va être soumis à une équipe de modération.",
						this.props.navigation.navigate,
						"Home"
					);
				}
			});

	}

	render() {
		const {betName, showModal, closeModal} = this.props;
		let reason;

		return (
			<Modal
				visible={showModal}
				transparent={true}
				onRequestClose={closeModal}
			>
				<View style={modalStyle.supraContainer}>
					<View style={modalStyle.container}>
						<Text style={modalStyle.title}>
							{"Signaler un pari"}
						</Text>
						<View style={modalStyle.separator}/>
						<Text style={modalStyle.infoText}>
							{"Vous souhaitez signaler le pari :"}
						</Text>
						<Text style={modalStyle.text}>
							{betName}
						</Text>
						<Text style={modalStyle.infoText}>
							{"Veuilez spécifier votre raison :"}
						</Text>
						<TextInput
							style={modalStyle.textInput}
							onChangeText={(text) => reason = text}
						/>
						<View style={modalStyle.buttonContainer}>
							<TouchableOpacity
								style={modalStyle.cancelButton}
								onPress={closeModal}
							>
								<Text style={modalStyle.text}>
									{"Annuler"}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={modalStyle.confirmButton}
								onPress={() => this._sendReport(reason)}
							>
								<Text style={modalStyle.text}>
									{"Confirmer"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

BetReportModalComponent.propTypes = {
	betId: PropTypes.number.isRequired,
	betName: PropTypes.string.isRequired,
	showModal: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired
};

export default withNavigation(BetReportModalComponent);