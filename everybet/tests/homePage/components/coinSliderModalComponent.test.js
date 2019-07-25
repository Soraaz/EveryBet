import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import CoinSliderModalComponent from "../../../src/homePage/components/coinSliderModalComponent";
import User from "../../../src/classes/user";
import {TouchableOpacity} from "react-native";

describe("CoinSliderModalComponent", () => {
    describe("rendering", () => {
        it("Should render correctly the component", () => {
            const tree = renderer
                .create(
                    <CoinSliderModalComponent
                        showModal={true}
                        switchModalVisibility={() => {}}
                        confirmAnswerFunction={() => {}}
                        selectedAnswer={{id: 0, title: "test selectedAnswer"}}
                        bet={{betId: 0, name: "test"}}
                    />
                )
                .toJSON();
            expect(tree).to.matchSnapshot();
        });
    });

    describe("functionalities", () => {
        let switchModalVisibility;
        let confirmAnswerFunction;
        let wrapper;
        let instance;

        beforeEach(() => {
            User.coins = 999999999;
            switchModalVisibility = sinon.spy();
            confirmAnswerFunction = sinon.spy();
            wrapper = shallow(
                <CoinSliderModalComponent
                    showModal={true}
                    switchModalVisibility={switchModalVisibility}
                    confirmAnswerFunction={confirmAnswerFunction}
                    selectedAnswer={{id: 0, title: "test selectedAnswer"}}
                    bet={{betId: 0, name: "test"}}
                />
            );
            instance = wrapper.instance();
        });

        it("Should replace undefined textInput by 1", () => {
            expect(instance.state.betCoins).to.be.equal("1");
            instance._onTextChange(undefined);
            expect(instance.state.betCoins).to.be.equal("1");
        });

        it("Should replace wrong textInput by 1", () => {
            expect(instance.state.betCoins).to.be.equal("1");
            instance._onTextChange("wrong input");
            expect(instance.state.betCoins).to.be.equal("1");
        });

        it("Should replace 0 by 1", () => {
            expect(instance.state.betCoins).to.be.equal("1");
            instance._onTextChange("0");
            expect(instance.state.betCoins).to.be.equal("1");
        });

        it("Should change the value of textInput", () => {
            expect(instance.state.betCoins).to.be.equal("1");
            instance._onTextChange("123456");
            expect(instance.state.betCoins).to.be.equal("123456");
        });

        it("Should replace textInput by the user's coin if textInput > user's coin", () => {
            User.coins = 42;
            expect(instance.state.betCoins).to.be.equal("1");
            instance._onTextChange("69");
            expect(instance.state.betCoins).to.be.equal("42");
        });

        it("Should call switchModalVisibility callback when pressing outside the modal", () => {
            expect(switchModalVisibility).to.be.not.called;
            wrapper.find(TouchableOpacity).first().props().onPress();
            expect(switchModalVisibility).to.be.calledOnce;
        });

        it("Should call switchModalVisibility callback when pressing the \"Annuler\" button", () => {
            expect(switchModalVisibility).to.be.not.called;
            wrapper.find(TouchableOpacity).at(1).props().onPress();
            expect(switchModalVisibility).to.be.calledOnce;
        });

        it("Should call switchModalVisibility callback when pressing the \"Confirmer\" button", () => {
            expect(confirmAnswerFunction).to.be.not.called;
            wrapper.find(TouchableOpacity).last().props().onPress();
            expect(confirmAnswerFunction).to.be.calledOnce;
        });
    });
});
