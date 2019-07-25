import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";
import UsersService from '../../../services/UsersService';

import RegisterComponent, {
	login,
	email,
	password,
	passwordConfirm,
	terms
} from "../../../src/registerPage/components/registerComponent.js";

describe("RegisterComponent", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			let registerCallbackSpy = sinon.spy();
			const tree = renderer
				.create(<RegisterComponent callback={registerCallbackSpy}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		let component;
		let cb = sinon.spy();

		beforeEach(() => {
			component = new RegisterComponent();
		});

		it("Should instantiate the class", () => {
			expect(component).to.be.an.instanceOf(RegisterComponent);
		});

		it("Should check the login", () => {
			expect(login("test")).to.be.equal("test");
		});

		it("Should check the email", () => {
			expect(email("test@test.fr")).to.be.equal("test@test.fr");
		});

		it("Should check the password", () => {
			expect(password("testtest")).to.be.equal("testtest");
		});

		it("Should check the password Confirm", () => {
			expect(passwordConfirm("testtest")).to.be.equal("testtest");
		});

		it("Should check the terms", () => {
			expect(terms(true)).to.be.equal(true);
		});

		describe("validation steps", () => {
			let wrapper;
			let instance;

			beforeEach(() => {
				wrapper = shallow(<RegisterComponent callback={cb}/>);
				expect(cb).to.be.not.called;
				instance = wrapper.instance();
			});

			it("Should check if the login already exists", (done) => {
				UsersService.getUsersByLogin = jest.fn().mockReturnValue(new Promise(async (resolve) => {
					let res = [{
						"test": "test",
					}];
					resolve(res);
				}));
				const spy = sinon.spy(instance, "_loginExists");

				expect(spy).to.be.not.called;
				instance._checkLogin("this_user_never_exist");
				setTimeout(() => {
					expect(spy).to.be.calledOnce;
					done();
				}, 200);
			});

			it("Should check if the login doesn't exist", (done) => {
				UsersService.getUsersByLogin = jest.fn().mockReturnValue(new Promise(async (resolve) => {
					let res = [];
					resolve(res);
				}));
				const spy = sinon.spy(instance, "_loginDoesNotExist");

				expect(spy).to.be.not.called;
				instance._checkLogin("this_user_never_exist");
				setTimeout(() => {
					expect(spy).to.be.calledOnce;
					done();
				}, 200);
			});
		});
	});
});
