import React from "react";
import {TouchableOpacity} from "react-native";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import BetsService from "../../../services/BetsService";
import UsersService from "../../../services/UsersService";
import BetsServiceMock from "../../../services/__mocks__/BetsService";
import UsersServiceMock from "../../../services/__mocks__/UsersService";

import AnswerButtonsComponent from "../../../src/homePage/components/answerButtonsComponent";
import User from "../../../src/classes/user";


describe("AnswerButtonsComponent", () => {
	let errorRes;

	beforeAll(() => {
		errorRes = {"error": "error"};
	});

	beforeEach(() => {
		BetsService.getBetsByUserId = BetsServiceMock.getBetsByUserId;
		UsersService.getUserById = UsersServiceMock.getUserById;
		UsersService.addUserResponse = UsersServiceMock.addUserResponse;
		UsersService.addCoinsByUserId = UsersServiceMock.addCoinsByUserId;
	});

	describe("rendering", () => {
		it("Should display an alert if there is a server error on BetsService.getBetsByUserId", () => {
			BetsService.getBetsByUserId = jest.fn().mockReturnValue(new Promise(async (resolve) => {
				resolve(errorRes);
			}));
			const tree = renderer
				.create(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: []
						}}
						onAnswer={() => {}}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render an error if there is no more than 1 answer to the bet", () => {
			const tree = renderer
				.create(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: []
						}}
						onAnswer={() => {}}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render a \"Connectez-vous pour parier\" button", () => {
			User.id = undefined;
			const tree = renderer
				.create(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: [
								{title: "answer1", id: 0},
								{title: "answer2", id: 1}
							]
						}}
						onAnswer={() => {}}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render a description telling the user they have no coin", () => {
			User.id = 10;
			User.coins = 0;
			const tree = renderer
				.create(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: [
								{title: "answer1", id: 0},
								{title: "answer2", id: 1}
							]
						}}
						onAnswer={() => {}}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render some non answered buttons", () => {
			User.id = 10;
			User.coins = 1;
			const tree = renderer
				.create(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: [
								{title: "answer1", id: 0},
								{title: "answer2", id: 1}
							]
						}}
						onAnswer={() => {}}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render a description showing the user's answer", () => {
			User.id = 10;
			User.coins = 1;
			const tree = renderer
				.create(
					<AnswerButtonsComponent
						bet={{
							id: 15,
							name: "test",
							answers: [
								{title: "answer1", id: 0},
								{title: "answer2", id: 1}
							]
						}}
						onAnswer={() => {}}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		it("Should test the onPress event", () => {
			User.id = 10;
			User.coins = 1;
			const onPressEvent = jest.fn();
			const savefn = AnswerButtonsComponent.prototype._answerToBet;
			AnswerButtonsComponent.prototype._answerToBet = onPressEvent;
			const wrapper = shallow(
				<AnswerButtonsComponent
					bet={{
						id: 0,
						name: "test",
						answers: [
							{title: "answer1", id: 0},
							{title: "answer2", id: 1}
						]
					}}
					onAnswer={() => {}}
				/>
			);
			wrapper.find(TouchableOpacity).first().props().onPress();
			expect(onPressEvent.mock.calls.length).to.be.equal(0);
			AnswerButtonsComponent.prototype._answerToBet = savefn;
		});

		describe("_answerToBet", () => {
			it("Should failed if the User is not connected", () => {
				User.id = undefined;
				const wrapper = shallow(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: [
								{title: "answer1", id: 0},
								{title: "answer2", id: 1}
							]
						}}
						onAnswer={() => {}}
					/>
				);
				expect(wrapper.instance()._answerToBet()).to.be.rejectedWith("You are not connected.");
			});

			it("Should succeed if the User is connected", () => {
				User.id = 10;
				User.coins = 1;
				const wrapper = shallow(
					<AnswerButtonsComponent
						bet={{
							id: 0,
							name: "test",
							answers: [
								{title: "answer1", id: 0},
								{title: "answer2", id: 1}
							]
						}}
						onAnswer={() => {}}
						navigation={{}}
					/>
				);
				wrapper._addResponseToUser = jest.fn().mockReturnValue(new Promise(async (resolve) => {
					resolve();
				}));
				return expect(wrapper.instance()._answerToBet({id: 8}, "30")).to.be.fulfilled;
			});
		});
	});
});
