import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import DailyRewardModalComponent from "../../../src/homePage/components/dailyRewardModalComponent";
import Button from "../../../src/common/components/button";
import User from "../../../src/classes/user";

describe("DailyRewardModalComponent", () => {
    let closeModal;

    beforeEach(() => {
        User.rewardValue = 0;
        closeModal = sinon.spy();
    });

    describe("rendering", () => {
        it("Should render correctly the component", () => {
            const tree = renderer
                .create(
                    <DailyRewardModalComponent
                        showModal={true}
                        closeModal={closeModal}
                    />
                )
                .toJSON();
            expect(tree).to.matchSnapshot();
        });

        it("Should render correctly the component (User.rewardTier > 1)", () => {
            User.rewardTier = 2;
            const tree = renderer
                .create(
                    <DailyRewardModalComponent
                        showModal={true}
                        closeModal={closeModal}
                    />
                )
                .toJSON();
            expect(tree).to.matchSnapshot();
        });
    });

    describe("functionalities", () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(
                <DailyRewardModalComponent
                    showModal={true}
                    closeModal={closeModal}
                />
            );
        });

        it("Should call closeModal when pressing the \"Merci !\" button", () => {
            expect(closeModal).to.be.not.called;
            wrapper.find(Button).first().props().onPress();
            expect(closeModal).to.be.calledOnce;
        });
    });
});
