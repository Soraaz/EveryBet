import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";

import ProfileComponent from "../../../src/profilePage/components/profileComponent";
import User from "../../../src/classes/user";
import Button from "../../../src/common/components/button";

class MockNotification{
    checkToken = jest.fn();
}

describe("ProfileComponent", () => {
    User.notificationCenter = new MockNotification();

	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<ProfileComponent />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly with a custom user avatar", () => {
			User.avatar = "avatar";
			const tree = renderer
				.create(<ProfileComponent />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		const navigation = {navigate: jest.fn(x => x)};
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(<ProfileComponent navigation={navigation} />);
		});

		it("Should navigate to EditProfile when pressing \"Editer le profil\"", () => {
			expect(wrapper.find(Button).first().props().onPress()).to.be.equal('EditProfile');
		});

		it("Should navigate to BetProposal when pressing \"Proposer un pari\"", () => {
			expect(wrapper.find(Button).at(1).props().onPress()).to.be.equal('BetProposal');
		});

		it("Should navigate to UserBets when pressing \"Paris en cours\"", () => {
			expect(wrapper.find(Button).at(2).props().onPress()).to.be.equal('UserBets');
		});

		it("Should navigate to UserBets when pressing \"Historique des paris\"", () => {
			expect(wrapper.find(Button).at(3).props().onPress()).to.be.equal('UserBets');
		});

		it("Should navigate to Contact when pressing \"Contacter Everybet\"", () => {
			expect(wrapper.find(Button).at(5).props().onPress()).to.be.equal('Contact');
		});

		it("Should call the callback _disconnect when pressing \"Se déconnecter\"", () => {
			const spy = sinon.spy(wrapper.instance(), "_disconnect");
			wrapper.find(Button).last().props().onPress();
			expect(spy).to.be.calledOnce;
		});

		it("Should disconnect the user", async () => {
			let userInfos =
				{
					id: 0,
					login: "login",
					firstName: "firstName",
					email: "email",
					coins: 0,
					address: null,
					additionalInformation: null,
					zipCode: null,
					country: null,
					phone: null,
					avatar: "",
					reward: false,
					rewardTier: 1,
					rewardValue: 10
				};
			User.setUser(userInfos);
			await wrapper.instance()._disconnect();
			expect(User.id).to.be.equal(undefined);
			expect(User.login).to.be.equal(undefined);
			expect(User.firstName).to.be.equal(undefined);
			expect(User.coins).to.be.equal(undefined);
			expect(User.email).to.be.equal(undefined);
			expect(User.address).to.be.equal(undefined);
			expect(User.additionalInformation).to.be.equal(undefined);
			expect(User.zipCode).to.be.equal(undefined);
			expect(User.country).to.be.equal(undefined);
			expect(User.phone).to.be.equal(undefined);
			expect(User.avatar).to.be.equal(undefined);
			expect(User.reward).to.be.equal(false);
			expect(User.rewardTier).to.be.equal(undefined);
			expect(User.rewardValue).to.be.equal(undefined);
		});
	});
});