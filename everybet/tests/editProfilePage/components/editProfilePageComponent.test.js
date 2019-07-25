import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";
import UsersService from "../../../services/UsersService";
import UsersServiceMock from "../../../services/__mocks__/UsersService";

import EditProfilePageComponent, {
	email,
	password,
	phone
} from "../../../src/editProfilePage/components/editProfilePageComponent.js";

describe("EditProfilePageComponent", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<EditProfilePageComponent/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		it("Should check the email", () => {
			expect(email("test@test.fr")).to.be.equal("test@test.fr");
		});

		it("Should check the password", () => {
			expect(password("testtest")).to.be.equal("testtest");
		});

		it("Should check the phone", () => {
			expect(phone("0612121212")).to.be.equal("0612121212");
		});

		describe("validation steps", () => {
			let wrapper;
			let instance;

			beforeEach(() => {
				wrapper = shallow(<EditProfilePageComponent/>);
				instance = wrapper.instance();
				UsersService.getUserByEmail = UsersServiceMock.getUserByEmail;
			});

			it("Should check if the email is already used", (done) => {
				const spy = sinon.spy(instance, "_updateUser");
				expect(spy).to.be.not.called;
				instance._checkMailUsage({email: "antoine.dury@epitech.eu"});
				setTimeout(() => {
					expect(spy).to.be.not.called;
					done();
				}, 200);
			});

			it("Should check if the email isn't used", (done) => {
				UsersService.getUserByEmail = jest.fn().mockReturnValue(new Promise(async (resolve) => {
					let res = [];
					resolve(res);
				}));
				const spy = sinon.spy(instance, "_updateUser");
				expect(spy).to.be.not.called;
				instance._checkMailUsage({email: "antoine.dury@epitech.eu"});
				setTimeout(() => {
					expect(spy).to.be.calledOnce;
					done();
				}, 200);
			});
		});
	});
});
