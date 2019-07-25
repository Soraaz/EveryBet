import React from "react";
import renderer from "react-test-renderer";

import DeleteMyAccountComponent from "../../../src/editProfilePage/components/deleteMyAccountComponent.js";
import AlertMessage from "../../../src/common/components/alertMessage";
import UsersService from "../../../services/UsersService";
import {shallow} from "enzyme/build";
import Button from "../../../src/common/components/button";

describe("DeleteMyAccountComponent", () => {
    describe("rendering", () => {
        it("Should render correctly", () => {
            const tree = renderer
                .create(<DeleteMyAccountComponent/>)
                .toJSON();
            expect(tree).to.matchSnapshot();
        });
    });

    describe("functionalities", () => {
        let component;
        let cb = sinon.spy();

        beforeEach(() => {
            component = new DeleteMyAccountComponent();
        });

        it("Should instantiate the class", () => {
            expect(component).to.be.an.instanceOf(DeleteMyAccountComponent);
        });

        it("Should be testing deleteAccount", (done) => {
            UsersService.deleteUserById = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                let res = [
                    {
                        "test": "test",
                    },
                ];
                resolve(res);
            }));
            AlertMessage.success = sinon.spy();
            expect(AlertMessage.success).to.be.not.called;
            let navigation = {
                "navigate": null
            };
            DeleteMyAccountComponent.deleteAccount(navigation);
            setTimeout(() => {
                expect(AlertMessage.success).to.be.calledOnce;
                done();
            }, 300);
        });

        it("Should navigate to Register when pressing \"OnPress\"", (done) => {
            let wrapper = shallow(<DeleteMyAccountComponent callback={cb}/>);
            expect(cb).to.be.not.called;
            AlertMessage.yesOrNo = sinon.spy();
            wrapper.find(Button).props().onPress();
            setTimeout(() => {
                expect(AlertMessage.yesOrNo).to.be.calledOnce;
                done();
            }, 300);
        });
    });
});
