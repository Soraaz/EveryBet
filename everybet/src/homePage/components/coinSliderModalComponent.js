"use strict";

//modules
import React, {Component} from "react";
import {Modal, TouchableOpacity, View, Text, TextInput, Image} from "react-native";
import PropTypes from "prop-types";

// components
import User from "../../classes/user";

//styles
import modalStyle from "../../common/styleSheets/modalStyleSheet";
import coinsSliderModalStyle from "../styleSheets/coinSliderModalStyleSheet";

class CoinSliderModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            betCoins: "1"
        };
    }

    _onTextChange(betCoins) {
        let newBetCoins = "";
        let numbers = "0123456789";

        if (betCoins !== undefined) {
            for (let i = 0; i < betCoins.length; i++) {
                if (numbers.indexOf(betCoins[i]) > -1)
                    newBetCoins = newBetCoins + betCoins[i];
                else
                    newBetCoins = "1";
            }
        } else
            newBetCoins = "1";
        if (parseInt(newBetCoins) === 0)
            newBetCoins = "1";
        if (parseInt(newBetCoins) > parseInt(User.coins))
            newBetCoins = User.coins.toString();
        this.setState({
            betCoins: newBetCoins
        });
    }
    
    render() {
        const {showModal, switchModalVisibility, selectedAnswer, bet} = this.props;

        return (
            <Modal
                visible={showModal}
                transparent={true}
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    style={modalStyle.supraContainer}
                    onPress={switchModalVisibility}>
                    <View style={modalStyle.container}>
                        <Text style={modalStyle.title}>
                            {bet.name}
                        </Text>
                        <View style={modalStyle.separator}/>
                        <Text style={modalStyle.infoText}>
                            {"Vous avez choisi la réponse :"}
                        </Text>
                        <Text style={modalStyle.text}>
                            {selectedAnswer.answer}
                        </Text>
                        <Text style={modalStyle.infoText}>
                            {"Veuillez entrer le montant de betCoins\nque vous voulez placer sur cette réponse :"}
                        </Text>
                        <View style={coinsSliderModalStyle.viewCoinsSelector}>
                            <TextInput
                                style={[modalStyle.textInput, {textAlign: "right"}]}
                                onChangeText={(betCoins) => this._onTextChange(betCoins)}
                                value={this.state.betCoins}
                            />
                            <Image
                                style={coinsSliderModalStyle.coinIcon}
                                source={require("../../../assets/images/betcoin_icon.png")}
                            />
                        </View>
                        <View style={modalStyle.buttonContainer}>
                            <TouchableOpacity
                                style={modalStyle.cancelButton}
                                onPress={switchModalVisibility}
                            >
                                <Text style={modalStyle.text}>
                                    {"Annuler"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={modalStyle.confirmButton}
                                onPress={() => {
                                    this.props.confirmAnswerFunction(this.props.selectedAnswer, this.state.betCoins);
                                }}
                            >
                                <Text style={modalStyle.text}>
                                    {"Confirmer"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

CoinSliderModalComponent.propTypes = {
    showModal: PropTypes.bool.isRequired,
    switchModalVisibility: PropTypes.func.isRequired,
    confirmAnswerFunction: PropTypes.func.isRequired,
    selectedAnswer: PropTypes.object.isRequired,
    bet: PropTypes.object.isRequired
};

export default CoinSliderModalComponent;
