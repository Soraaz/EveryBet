"use strict";

// modules
import React, {Component} from "react";
import {Image, View, Platform, Text} from "react-native";
import PropTypes from "prop-types";
import {ImagePicker, Permissions} from "expo";
import UsersService from "../../../services/UsersService";

// components
import User from "../../classes/user";
import AlertMessage from "../../common/components/alertMessage";
import Button from "../../common/components/button";

// styles
import editProfilePageStyleSheet from "../styleSheets/editProfilePageStyleSheet";

class AvatarComponent extends Component {

	constructor(props) {
		super(props);
	}

	async askPermission() {
		const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
		if (permission.status !== "granted") {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== "granted") {
				AlertMessage.simpleError("Nous n'avons pas la permission d'accéder à vos photos.\nVous pouvez nous donner la permission dans \"Paramètres\" puis \"EveryBet\".");
				if (Platform.OS === "ios") this.showAlert();
				return null;
			}
			else
				return this._pickImage();
		}
		else
			return this._pickImage();
	}

	render() {

		return (
			<View style={editProfilePageStyleSheet.container}>
				<View style={editProfilePageStyleSheet.avatarContainer}>
					<Image
						style={editProfilePageStyleSheet.image}
						source={User.avatar != null
							? {
								method: "GET",
								uri: User.avatar,
							}
							: require("../../../assets/images/user_placeholder.png")
						}
					/>
				</View>
				<View style={editProfilePageStyleSheet.deliveryContainer}>
					<Text>{User.login}</Text>
					<Button
						type={"normalSmall"}
						text={"Changer d'avatar"}
						onPress={() =>
							this.askPermission()}
					/>
				</View>
			</View>
		);
	}

	async _pickImage() {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 4],
			mediaTypes:"Images",
			base64: true,
		});

		if (!result.cancelled) {
			let tmp = {};
			tmp.name = "test.png";
			tmp.type = "img/png";
			tmp.uri = result.uri;
			await UsersService.addImagetoUser(User.id, tmp)
				.then((res) => {
					if ("error" in res) {
						AlertMessage.error(res.error, this.props.navigation.navigate);
					}
					else {
						User.avatar = result.uri;
						this.props.onAvatarChange();
					}
				});
		}
	}
}

AvatarComponent.propTypes = {
	onAvatarChange: PropTypes.func.isRequired
};

export default AvatarComponent;