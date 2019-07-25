import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";
import UsersService from "../../../services/UsersService";

import LoginFormComponent, {login, password} from "../../../src/profilePage/components/loginFormComponent.js";
import User from "../../../src/classes/user";
import AlertMessage from "../../../src/common/components/alertMessage";
import Button from "../../../src/common/components/button";

const sha = require('hash.js/lib/hash/sha/512');

class MockNavigation{
	navigate = jest.fn();
}

class MockedForm{
	constructor(value) {
		this.value = value;
	}

	getValue () {
		return this.value;
	}
}

class MockedProps{
	navigation = new MockNavigation();
}

class MockNotification{
	checkToken = jest.fn();
}

describe("LoginFormComponent", () => {
	User.notificationCenter = new MockNotification();

	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<LoginFormComponent/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		let component;
		let wrapper;
		let cb = sinon.spy();

		beforeEach(() => {
			component = new LoginFormComponent();
			wrapper = shallow(<LoginFormComponent callback={cb} />);
		});

		it("Should instantiate the class", () => {
			expect(component).to.be.an.instanceOf(LoginFormComponent);
		});

		it("Should check the login", () => {
			expect(login("test")).to.be.equal("test");
		});

		it("Should check the password", () => {
			expect(password("testtest")).to.be.equal("testtest");
		});

		it("Should check the login message", () => {
			expect(login.getValidationErrorMessage()).to.be.equal('Veuillez entrer votre identifiant');
			LoginFormComponent.nonexistentLogin = false;
			expect(login.getValidationErrorMessage()).to.be.equal('This user does not exist');
		});

		it("Should check the password message", () => {
			expect(password.getValidationErrorMessage()).to.be.equal('Veuillez entrer votre mot de passe');
			LoginFormComponent.wrongPassword = false;
			expect(password.getValidationErrorMessage()).to.be.equal('The password is incorrect');
		});

		it("Should check the user password error", () => {
			expect(cb).to.be.not.called;

			let value = {password: "test"};
			let result = {password: "test"};

			component._wrongPassword = sinon.spy();
			expect(component._wrongPassword).to.be.not.called;
			component._userExists(result, value);
			expect(component._wrongPassword).to.be.calledOnce;
		});

		it("Should check if the user password is correct", () => {
			expect(cb).to.be.not.called;

			let value = {password: "test"};
			let result = {password: sha().update("test").digest('hex')};

			component._login = sinon.spy();
			expect(component._login).to.be.not.called;
			component._userExists(result, value);
			expect(component._login).to.be.calledOnce;
		});

		describe("validation steps", () => {
			it("Should check _login", () => {
				let userInfos =
					{
						id: 0,
						login: "pseudo",
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

				AlertMessage.success = jest.fn();

				component.form = new MockedForm({rememberMe: true});
				component.props = new MockedProps();
				component._login(userInfos);
				expect(User.email).to.be.equal("email");

				component.form = new MockedForm({rememberMe: false});
				component._login(userInfos);
				expect(User.email).to.be.equal("email");
			});

			it("Should check _userDoesNotExist", () => {
				component.form = new MockedForm("null");
				expect(LoginFormComponent.nonexistentLogin).to.be.equal(false);
				component._userDoesNotExist();
				expect(LoginFormComponent.nonexistentLogin).to.be.equal(true);
			});

			it("Should check _wrongPassword", () => {
				component.form = new MockedForm("null");
				expect(LoginFormComponent.nonexistentLogin).to.be.equal(true);
				component._wrongPassword();
				expect(LoginFormComponent.nonexistentLogin).to.be.equal(true);
			});

			describe("onPress", () => {
				let wrapper;
				let instance;

				beforeEach(() => {
					wrapper = shallow(<LoginFormComponent callback={cb}/>);
					expect(cb).to.be.not.called;
					instance = wrapper.instance();
					instance.form = new MockedForm({login: "balek"});
				});

				it("Should check _userExists", (done) => {
					UsersService.getUsersByLogin = jest.fn().mockReturnValue(new Promise(async (resolve) => {
						let res = [
							{
								"test": "test",
							},
						];
						resolve(res);
					}));

					instance._userExists = sinon.spy();
					expect(instance._userExists).to.be.not.called;
					wrapper.find(Button).props().onPress();
					setTimeout(() => {
						expect(instance._userExists).to.be.calledOnce;
						done();
					}, 100);
				});

				it("Should check error in _userExists", (done) => {
					UsersService.getUsersByLogin = jest.fn().mockReturnValue(new Promise(async (resolve) => {
						let res = [
							{
								"test": "test",
							},
						];
						resolve(res);
					}));

					instance.form = new MockedForm();
					instance._userExists = sinon.spy();
					expect(instance._userExists).to.be.not.called;
					wrapper.find(Button).props().onPress();
					setTimeout(() => {
						expect(instance._userExists).to.be.not.called;
						done();
					}, 100);
				});

				it("Should check _userDoesNotExist", (done) => {
					UsersService.getUsersByLogin = jest.fn().mockReturnValue(new Promise(async (resolve) => {
						let res = [
						];
						resolve(res);
					}));

					instance._userDoesNotExist = sinon.spy();
					expect(instance._userDoesNotExist).to.be.not.called;
					wrapper.find(Button).props().onPress();
					setTimeout(() => {
						expect(instance._userDoesNotExist).to.be.calledOnce;
						done();
					}, 100);
				});

				it("Should check if server errors are catched", (done) => {
					UsersService.getUsersByLogin = jest.fn().mockReturnValue(new Promise(async (resolve) => {
						let res = {'error' : 'Error: Test'};
						resolve(res);
					}));

					AlertMessage.error = sinon.spy();
					expect(AlertMessage.error).to.be.not.called;
					wrapper.find(Button).props().onPress();
					setTimeout(() => {
						done();
					}, 100);
				});
			});
		});
	});
});
