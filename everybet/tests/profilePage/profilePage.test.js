import React from "react";
import {NavigationEvents} from "react-navigation";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";

import ProfilePage from "../../src/profilePage/profilePage.js";
import User from "../../src/classes/user";
import LoginComponent from "../../src/profilePage/components/loginComponent";
import ProfileComponent from "../../src/profilePage/components/profileComponent";

describe("ProfilePage", () => {
	describe("rendering", () => {
		it("Should render correctly with LoginComponent", () => {
			User.id = undefined;
			const tree = renderer
				.create(<ProfilePage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly with ProfileComponent", () => {
			User.id = 42;
			const tree = renderer
				.create(<ProfilePage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		let wrapper;

		beforeEach(() => {
			User.id = undefined;
			wrapper = shallow(<ProfilePage />);
		});

		it("Should call the _onWillFocus callback", () => {
			const spy = sinon.spy(wrapper.instance(), "_onWillFocus");
			wrapper.find(NavigationEvents).first().props().onWillFocus();
			expect(spy).to.be.calledOnce;
		});

		it("Should change the child component if there's a defined user id", () => {
			expect(wrapper.find(LoginComponent).exists()).to.equal(true);
			expect(wrapper.find(ProfileComponent).exists()).to.equal(false);
			User.id = 42;
			wrapper.instance()._onWillFocus();
			expect(wrapper.find(LoginComponent).exists()).to.equal(false);
			expect(wrapper.find(ProfileComponent).exists()).to.equal(true);
		});
	});
});
