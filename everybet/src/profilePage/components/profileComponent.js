"use strict";

// modules
import React, {Component} from "react";
import {AsyncStorage, Image, Text, View} from "react-native";
import {withNavigation} from "react-navigation";
import {AdMobRewarded} from "expo";

// components
import User from "../../classes/user";
import Button from "../../common/components/button";
import AlertMessage from "../../common/components/alertMessage";
import UsersService from "../../../services/UsersService";

// styles
import commonStyle from "../../common/styleSheets/commonStyleSheet";
import profileStyle from "../styleSheets/profileStyleSheet";

class ProfileComponent extends Component {

	constructor(props) {
		super(props);
	}

	async _disconnect() {
		await AsyncStorage.setItem("rememberMe", "0");
		await User.disconnect();
		await AlertMessage.success(
			"Déconnecté",
			"Vous êtes maintenant déconnecté.\nNous allons vous rediriger vers la page d'accueil.",
			this.props.navigation.navigate,
			"Home"
		);
	}

	render() {
		return (
			<View style={[commonStyle.verticalCenter, commonStyle.whiteBackground]}>
				<View style={commonStyle.container}>
					<Image
						style={profileStyle.userIcon}
						source={User.avatar != null
							? {
                                method: "GET",
                                uri: User.avatar,
                            }
							: require("../../../assets/images/user_placeholder.png")
						}
					/>
					<Text style={profileStyle.name}>
						{User.login}
					</Text>
					<View style={profileStyle.coinSuperContainer}>
						<View>
							<Text style={commonStyle.title}>
								BetCoins
							</Text>
							<View style={profileStyle.coinContainer}>
								<Text style={profileStyle.coinNumber}>
									{User.coins}
								</Text>
							</View>
						</View>
						<Image
							source={require("../../../assets/images/betcoin_icon.png")}
							style={profileStyle.coinIcon}
						/>
					</View>
					<Button
						onPress={() => this.props.navigation.navigate("EditProfile")}
						type={"normal"}
						text={"Editer le profil"}
					/>
					<Button
						onPress={() => this.props.navigation.navigate("BetProposal")}
						type={"normal"}
						text={"Proposer un pari"}
					/>
					<Button
						onPress={() => this.props.navigation.navigate("UserBets", {type: "progress"})}
						type={"normal"}
						text={"Paris en cours"}
					/>
					<Button
						onPress={() => this.props.navigation.navigate("UserBets", {type: "ended"})}
						type={"normal"}
						text={"Historique des paris"}
					/>
					<Button
						onPress={async () => {
							AdMobRewarded.setAdUnitId("ca-app-pub-3940256099942544/5224354917");
							await AdMobRewarded.requestAdAsync();
							UsersService.addCoinsByUserId(User.id, 30);
							this.forceUpdate();
							await AdMobRewarded.showAdAsync();
						}}
						type={"normal"}
						text={"Regarder une pub pour gagner des pièces"}
					/>
					<Button
						onPress={() => this.props.navigation.navigate("Contact")}
						type={"normal"}
						text={"Contacter Everybet"}
					/>
					<Button
						onPress={() => this._disconnect()}
						type={"warning"}
						text={"Se déconnecter"}
					/>
				</View>
			</View>
		);
	}
}

export default withNavigation(ProfileComponent);