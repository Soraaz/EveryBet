"use strict";

// modules
import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import BetsService from "../../../services/BetsService";
import UsersService from "../../../services/UsersService";

// components
import User from "../../classes/user";
import AlertMessage from "../../common/components/alertMessage";
import Button from "../../common/components/button";
import CoinSliderModalComponent from "./coinSliderModalComponent";

// styles
import answerButtonStyle from "../styleSheets/answerButtonsStyleSheet";
import betListItemStyle from "../../common/styleSheets/betListItemStyleSheet";
import RatingPage from "../../rating/ratingPage";

class AnswerButtonsComponent extends Component {
    isFirstAnswered = false;

    constructor(props) {
        super(props);
        this.state = {
            isAnswered: undefined,
            selectedAnswer: {answer: ""},
            showModal: false,
            answer: {},
        };
        this._switchModalVisibility = this._switchModalVisibility.bind(this);
        this._answerToBet = this._answerToBet.bind(this);
    }

    componentDidMount() {
        this._loadAnswers();
    }

    componentDidUpdate() {
        if (this.isFirstAnswered && !this.state.showModal && this.state.isAnswered) {
            RatingPage.launch();
            this.isFirstAnswered = false;
        }
    }

    _loadAnswers() {
        if (User.id !== undefined) {
            BetsService.getBetsByUserId(User.id)
                .then((res) => {
                    if ("error" in res) {
                        AlertMessage.error(res.error, this.props.navigation.navigate);
                    } else {
                        let answered = res.find((item) => {
                            return item.id === this.props.bet.id;
                        });
                        if (answered !== undefined) {
                            this.setState({
                                isAnswered: true,
                                answer: {
                                    response: answered.response,
                                    coins: answered.coins
                                },
                                showModal: false
                            });
                        } else {
                            this.setState({
                                isAnswered: false
                            });
                        }
                    }
                });
        }
    }

    _switchModalVisibility(selectedAnswer) {
        this.setState({
            showModal: !this.state.showModal,
            selectedAnswer: selectedAnswer
        });
    }

    render() {
        const {bet} = this.props;

        return (
            <View>
                <CoinSliderModalComponent
                    showModal={this.state.showModal}
                    switchModalVisibility={this._switchModalVisibility}
                    confirmAnswerFunction={this._answerToBet}
                    selectedAnswer={this.state.selectedAnswer}
                    bet={bet}
                />
                {!Array.isArray(bet.answers) || bet.answers.length < 2
                    ? <Text>An error occurred on this Bet. Sorry for the inconvenience</Text>
                    : User.id === undefined
                        ? this._renderNotConnectedButton()
                        : this.state.isAnswered === true
                            ? this._renderAnsweredDescription()
                            : User.coins === 0
                                ? this._renderNoCoinDescription()
                                : this._renderNonAnsweredButtons()
                }
            </View>
        );
    }

    _renderNotConnectedButton() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate("Profile")}
                type={"normal"}
                text={"Connectez-vous pour parier"}
            />
        );
    }

    _renderAnsweredDescription() {
        return (
            <Text style={betListItemStyle.description}>
                {"Vous avez déjà misé " + this.state.answer.coins}
                <Image
                    style={betListItemStyle.coin}
                    source={require("../../../assets/images/betcoin_icon.png")}
                />
                {" sur la réponse "}
                <Text style={betListItemStyle.answer}>
                    {this.state.answer.response}
                </Text>
                {" de ce pari."}
            </Text>
        );
    }

    _renderNoCoinDescription() {
        return (
            <Text style={[betListItemStyle.description, answerButtonStyle.noCoin]}>
                {"Vous ne possédez plus suffisamment de betcoin pour pouvoir parier."}
            </Text>
        );
    }

    _renderNonAnsweredButtons() {
        return this.props.bet.answers.map((answer, key) => {
            return (
                <View style={answerButtonStyle.container} key={key}>
                    <TouchableOpacity
                        style={answerButtonStyle.nonAnsweredButton}
                        onPress={() => this._switchModalVisibility(answer)}
                    >
                        <View
                            style={answerButtonStyle.textView}>
                            <Text style={answerButtonStyle.title}>
                                {answer.answer}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    _answerToBet(answer, coins) {
        let usersBetPromise = BetsService.getBetsByUserId(User.id);
        let usersInfoPromise = UsersService.getUserById(User.id);

        return Promise.all([usersBetPromise, usersInfoPromise])
            .then((res) => {
                if ("error" in res)
                    AlertMessage.error(res.error, this.props.navigation.navigate);
                else if (this._addResponseToUser(answer.id, res[0], coins)) {
                    UsersService.addCoinsByUserId(User.id, coins * -1)
                        .then((res) => {
                            if ("error" in res)
                                AlertMessage.error(res.error, this.props.navigation.navigate);
                            else {
                                User.coins = User.coins - coins;
                                User.dailyBets++;
                                if (User.dailyBets === 1) {
                                    this.setState({showModal: false});
                                    this.isFirstAnswered = true;
                                }
                                this.props.onAnswer();
                                return this._loadAnswers();
                            }
                        });
                }
            });
    }

    _addResponseToUser(answerId, res, coins) {
        const {bet} = this.props;
        let found = res.find((elem) => {
            return elem.id === bet.id;
        });

        if (found === undefined) {
            UsersService.addUserResponse(User.id, bet.id, answerId, coins)
                .then((res) => {
                    if ("error" in res)
                        AlertMessage.error(res.error, this.props.navigation.navigate);
                });
            return true;
        }
        return false;
    }
}

AnswerButtonsComponent.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    bet: PropTypes.object.isRequired
};

export default withNavigation(AnswerButtonsComponent);
